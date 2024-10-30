import { Router } from "express";
import {
  addStudentDeatils,
  getStudent,
  loginController,
  logoutController,
  signupController,
} from "../controllers/student.controller.js";
import { verifyJWTStudent } from "./../middlewares/student.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = Router();

router.route("/signup").post(signupController);

router.route("/login").post(loginController);

// secured routes
router.route("/logout").post(verifyJWTStudent, logoutController);
router.route("/verification/:id").post(
  verifyJWTStudent,
  upload.fields([
    {
      name: "Aadhaar",
      maxCount: 1,
    },
    {
      name: "Secondary",
      maxCount: 1,
    },
    {
      name: "Higher",
      maxCount: 1,
    },
  ]),
  addStudentDeatils
);
router.route("/getStudent/:id").get(verifyJWTStudent, getStudent);

export default router;
