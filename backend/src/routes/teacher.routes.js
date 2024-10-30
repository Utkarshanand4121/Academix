import { Router } from "express";
import {
  addTeacherDetails,
  getTeacher,
  loginController,
  logoutController,
  signupController,
} from "../controllers/teacher.controller.js";
import { verifyJWTTeacher } from "./../middlewares/teacher.middlewares.js";
import { upload } from "./../middlewares/multer.middlewares.js";

const router = Router();

router.route("/signup").post(signupController);

router.route("/login").post(loginController);

// secured routes
router.route("/logout").post(verifyJWTTeacher, logoutController);
router.route("/teacher/:id").get(verifyJWTTeacher, getTeacher);

router.route("/verification/:id").post(
  verifyJWTTeacher,
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
    {
      name: "UG",
      maxCount: 1,
    },
    {
      name: "PG",
      maxCount: 1,
    },
  ]),
  addTeacherDetails
);

export default router;
