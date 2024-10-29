import { Router } from "express";
import { loginController, signupController } from "../controllers/teacher.controller.js";
import { verifyJWTTeacher } from './../middlewares/teacher.middlewares';

const router = Router();

router.route("/signup").post(signupController);

router.route("/login").post(loginController)

export default router;