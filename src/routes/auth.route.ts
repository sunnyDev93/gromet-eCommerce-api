import { Router } from "express";
import { Request, Response } from "express";

import { verifyToken } from "../middlewares/auth.middleware";
import authController from "../controllers/auth.controller";
import { validatePayload } from "../middlewares/payloadvalidator.middleware";
import { signinSchema } from "../validators/signin.schema";
import { verifyItemByIdSchema } from "../validators/verifyuserbyid.schema";

const authRoute: Router = Router();

authRoute.post("/login", validatePayload(signinSchema), authController.login);
authRoute.post("/signup", validatePayload(signinSchema), authController.signup);
authRoute.post(
  "/verifyuserbyid/:id",
  validatePayload(verifyItemByIdSchema),
  authController.verifyUserById
);
authRoute.post("/forgot-password", authController.forgotPassword);
authRoute.get("/me", verifyToken, async (req: Request, res: Response) => {
  await authController.fetchMe(req, res);
});

export default authRoute;
