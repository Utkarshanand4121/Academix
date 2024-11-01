import { Router } from "express";
import {
  approveCourses,
  approveStudent,
  approveTeacher,
  forApproval,
  loginController,
  logoutController,
  signupController,
  toApprove,
} from "../controllers/admin.controller.js";
import { verifyJWTAdmin } from "./../middlewares/admin.middlewares.js";

const router = Router();

router.route("/signup").post(signupController);
router.route("/login").post(loginController);

router.route("/:adminId/approval").post(verifyJWTAdmin, forApproval);

router
  .route("/:adminId/approval/student/:studentId")
  .post(verifyJWTAdmin, approveStudent);

router
  .route("/:adminId/approval/teacher/:teacherId")
  .post(verifyJWTAdmin, approveTeacher);

router.route("/logout").post(verifyJWTAdmin, logoutController);

router.route("/:adminId/approve/course").get(verifyJWTAdmin, toApprove);

router.route("/:adminId/approve/course/:courseId").post(verifyJWTAdmin, approveCourses);

export default router;
