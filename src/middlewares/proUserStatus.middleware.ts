import { NextFunction, Request, Response } from "express";

export const proUserStatusMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user.is_pro_user) {
    return res.status(403).json({
      message: "User isn't a Professional user",
    });
  }

  next();
};
