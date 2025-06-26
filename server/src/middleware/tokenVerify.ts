import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

interface customRequest extends Request{
    user?:any
}

const tokenVerify = (req: customRequest, res: Response, next: NextFunction):void => {
// console.log("tokenVerify:", req.method, req.originalUrl, req.cookies);
  // console.log('hee')
  try {
    const token = req.cookies.access_token;
    if (!token) return void res.status(401).json({ message: "access denied" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    
    // console.log(decoded)
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "invalid token" });
  }
};

export default tokenVerify