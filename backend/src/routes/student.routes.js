import { Router } from "express";
import { loginController, logoutController, signupController } from "../controllers/student.controller.js";
import { verifyJWTStudent } from './../middlewares/student.middlewares';

const router = Router();

router.route("/signup").post(signupController);

router.route("/login").post(loginController)

// secured routes
router.route("/logout").post(verifyJWTStudent, logoutController);

export default router;