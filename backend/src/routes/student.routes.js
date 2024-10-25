import { Router } from "express";
import { signupController } from "../controllers/student.controller.js";

const router = Router();

router.route("/signup").post(signupController);

export default router;