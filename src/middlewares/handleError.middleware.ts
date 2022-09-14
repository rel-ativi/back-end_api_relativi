import e, { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

const handleErrorMiddleware = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  console.log(`ERRO AQUI: ${error}`);
  return res.status(500).json({
    message: error.message,
  });
};

export { handleErrorMiddleware };
