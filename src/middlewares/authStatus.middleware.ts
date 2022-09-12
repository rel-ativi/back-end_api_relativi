import "dotenv/config";

import jwt from "jsonwebtoken";

import { NextFunction, Request, Response } from "express";

export const authStatusMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;

  if (!token || !token.includes("Bearer")) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  token = token.split(" ")[1];

  jwt.verify(
    token,
    process.env.SECRET_KEY as string,
    (error: any, decoded: any) => {
      if (error) {
        return res.status(401).json({
          message: "Invalid token",
        });
      }

      req.user = {
        id: decoded.sub,
        is_adm: decoded.is_adm,
        is_active: decoded.is_active,
        is_pro_user: decoded.is_pro_user,
        profile_id: decoded.profile_id,
      };

      next();
    }
  );
};
