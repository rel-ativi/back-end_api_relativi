import { NextFunction, Request, Response } from "express";

export const admStatusMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user.is_adm) {
    return res.status(403).json({
      message: "User isn't an Admin user",
    });
  }

  next();
};
