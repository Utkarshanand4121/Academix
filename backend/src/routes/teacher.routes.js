import { Router } from "express";
import { loginController, logoutController, signupController } from "../controllers/teacher.controller.js";
import { verifyJWTTeacher } from './../middlewares/teacher.middlewares';

const router = Router();

router.route("/signup").post(signupController);

router.route("/login").post(loginController);

// secured routes
router.route("/logout").post(verifyJWTTeacher, logoutController);

export default router;