import { Router } from "express";
import { signupController } from "../controllers/teacher.controller.js";

const router = Router();

router.route("/signup").post(signupController);

export default router;