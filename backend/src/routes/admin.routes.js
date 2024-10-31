
import { Router } from 'express';
import { loginController, logoutController, signupController } from '../controllers/admin.controller';

const router = Router();

router.route("/signup").post(signupController);
router.route("/login").post(loginController);
router.route("/logout").post(logoutController);

export default router;