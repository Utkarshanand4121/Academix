import { Router } from "express";
import { loginController, signupController } from "../controllers/student.controller.js";
import { verifyJWTStudent } from './../middlewares/student.middlewares';

const router = Router();

router.route("/signup").post(signupController);

router.route("/login").post(loginController)

export default router;