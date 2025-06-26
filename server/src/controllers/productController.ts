import { Request, Response } from "express";
import Product from "../models/Product";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error, please try again",
    });
  }
};

export const addProduct = async (req: Request, res: Response) => {
  // console.log('fdfd')
  try {
    const { name, sku, description, quantity, reorderLevel } = req.body;
    // console.log(req.body)
    const newProduct = new Product({
      name,
      sku,
      description,
      quantity,
      reorderLevel,
    });
    await newProduct.save();
    res.status(201).json({ success: true, message: "product added" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error, please try again",
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error, please try again",
    });
  }
};

export const editProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { name, sku, description, quantity, reorderLevel } = req.body;
    await Product.findByIdAndUpdate(id, {
      name,
      sku,
      description,
      quantity,
      reorderLevel,
    });
    res.status(201).json({ success: true, message: "ediited successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error, please try again",
    });
  }
};
