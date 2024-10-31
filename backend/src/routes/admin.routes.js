
import { Router } from 'express';
import { approveStudent, approveTeacher, forApproval, loginController, logoutController, signupController } from '../controllers/admin.controller';
import { verifyJWTAdmin } from './../middlewares/admin.middlewares';

const router = Router();

router.route("/signup").post(signupController);
router.route("/login").post(loginController);

router.route("/:adminId/approval").post(verifyJWTAdmin, forApproval);

router.route("/:adminId/approval/student/:studentId").post(verifyJWTAdmin, approveStudent);

router.route("/:adminId/approval/teacher/:teacherId").post(verifyJWTAdmin, approveTeacher);

router.route("/logout").post(verifyJWTAdmin, logoutController);

export default router;