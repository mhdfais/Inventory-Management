import express from "express";
import tokenVerify from "../middleware/tokenVerify";
import { changeStock, getStockHistory } from "../controllers/stockController";

const router = express.Router();

router.post("/changeStock/:id", tokenVerify, changeStock);
router.get("/getHistory", tokenVerify, getStockHistory);

export default router;
