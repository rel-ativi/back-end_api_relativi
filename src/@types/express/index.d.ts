import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user: {
        is_adm: boolean;
        is_active: boolean;
        is_pro_user: boolean;
        id: string;
      };
    }
  }
}
