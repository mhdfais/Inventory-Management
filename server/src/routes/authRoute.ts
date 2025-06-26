import express from "express";
import { login, logout, register } from "../controllers/authContoller";

const router = express.Router();

const wrap = (fn: Function) => (req: express.Request, res: express.Response) =>
  fn(req, res);

router.post("/registerUser", wrap(register));
router.post("/login", wrap(login));
router.post("/logout", wrap(logout));

export default router;
