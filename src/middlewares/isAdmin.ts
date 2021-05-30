import { Response, NextFunction } from "express";

export const isAdmin = async (req: any, res: Response, next: NextFunction) => {
  if (req.user.Adminid) {
    next();
  } else {
    res.json({ msg: "Sorry, you are not Admin" });
  }
};
