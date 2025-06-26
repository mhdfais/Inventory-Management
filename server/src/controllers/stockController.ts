import { Request, Response } from "express";
import Product, { IProduct } from "../models/Product";
import StockHistory, { IPopulatedStockHistory } from "../models/StockHistory";

export const changeStock = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { action, remarks, quantity } = req.body;
    await Product.findByIdAndUpdate(id, { quantity });
    const newStockHistory = new StockHistory({
      productId: id,
      quantity,
      remarks,
      type: action,
    });
    await newStockHistory.save();
    res.status(201).json({ success: true, message: "stock updated" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error, please try again",
    });
  }
};

export const getStockHistory = async (req: Request, res: Response) => {
  try {
    const history = await StockHistory.find()
      .populate<{ productId: IProduct }>("productId")
      .lean<IPopulatedStockHistory[]>();

    const formattedHistory = history.map((h) => ({
      name: h.productId.name,
      id: h._id,
      date: h.date,
      action: h.type,
      quantity: h.quantity,
      remarks: h.remarks,
    }));
    // console.log(formattedHistory)
    res.status(200).json({ success: true, history: formattedHistory });
  } catch (error) {
    console.error("Error fetching stock history:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
