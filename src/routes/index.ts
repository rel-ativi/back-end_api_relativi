import { Express } from "express";
import { activityRoutes } from "./activity.routes";
import { addressRoutes } from "./address.routes";

import { bankInfoRoutes } from "./bankInfo.routes";
import { paymentInfoRoutes } from "./paymentInfo.routes";
import { profileRoutes } from "./profile.routes";
import { sessionRoutes } from "./session.routes";
import { userRoutes } from "./user.routes";

export const appRoutes = (app: Express) => {
  app.use("/login", sessionRoutes());
  app.use("/users", userRoutes());
  app.use("/profile", profileRoutes());
  app.use("/bank_info", bankInfoRoutes());
  app.use("/payment_info", paymentInfoRoutes());
  app.use("/activities", activityRoutes());
  app.use("/addresses", addressRoutes());
};
