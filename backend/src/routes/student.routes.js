import { Router } from "express";
import { loginController, signupController } from "../controllers/student.controller.js";

const router = Router();

router.route("/signup").post(signupController);

router.route("/login").post(loginController)

export default router;