import express from "express";
import {
  addProduct,
  deleteProduct,
  editProduct,
  getProducts,
} from "../controllers/productController";
import tokenVerify from "../middleware/tokenVerify";

const router = express.Router();

// console.log('fee')
router.get("/getProducts", tokenVerify, getProducts);
router.post("/addProduct", tokenVerify, addProduct);
router.delete("/deleteProduct/:id", tokenVerify, deleteProduct);
router.put("/editProduct/:id", tokenVerify, editProduct);

export default router;
