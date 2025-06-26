import mongoose from "mongoose";

export interface IProduct extends Document {
  name: string;
  sku:string
  description:string
  quantity:number
  reorderLevel:number
  createdAt:Date
}

const productSchema = new mongoose.Schema<IProduct>({
  name: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  quantity: { type: Number, min: 0 },
  reorderLevel: { type: Number, default: 10, min: 0 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Product',productSchema)