
import { Router } from 'express';
import { loginController, logoutController, signupController } from '../controllers/admin.controller';
import { verifyJWTAdmin } from './../middlewares/admin.middlewares';

const router = Router();

router.route("/signup").post(signupController);
router.route("/login").post(loginController);
router.route("/logout").post(verifyJWTAdmin, logoutController);

export default router;