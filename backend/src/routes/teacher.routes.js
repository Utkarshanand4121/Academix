import { Router } from "express";
import { getTeacher, loginController, logoutController, signupController } from "../controllers/teacher.controller.js";
import { verifyJWTTeacher } from './../middlewares/teacher.middlewares';

const router = Router();

router.route("/signup").post(signupController);

router.route("/login").post(loginController);

// secured routes
router.route("/logout").post(verifyJWTTeacher, logoutController);
router.route("/teacher/:id").get(verifyJWTTeacher, getTeacher);

export default router;