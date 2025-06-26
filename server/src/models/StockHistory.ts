import mongoose, { Schema, Types } from "mongoose";
import { IProduct } from "./Product";



export interface IStockHistory extends Document {
  _id: Types.ObjectId
  productId: Types.ObjectId | IProduct;
  type: string;
  quantity: number;
  remarks: string;
  date: Date;
}


export interface IPopulatedStockHistory extends IStockHistory {
  productId: IProduct;  
}

const stockHistorySchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  type: { type: String, enum: ["add", "reduce"], required: true },
  quantity: { type: Number, required: true, min: 1 },
  remarks: { type: String, default: "" },
  date: { type: Date, default: Date.now },
});

export default mongoose.model("StockHistory", stockHistorySchema);
