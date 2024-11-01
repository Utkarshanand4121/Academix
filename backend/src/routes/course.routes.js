import { Router } from "express";
import {
  addClass,
  addCourseStudent,
  addCourseTeacher,
  canStudentEnroll,
  enrolledCourseStd,
  enrolledCourseTeacher,
  getCourse,
  getCourseTeacher,
  studentEnrolledCourseClasses,
  teacherEnrolledCourseClasses,
} from "../controllers/course.controller.js";
import { verifyJWTTeacher } from "./../middlewares/teacher.middlewares";
import { verifyJWTStudent } from "./../middlewares/student.middlewares";

const router = Router();

router.route("/all").get(getCourse);

router.route("/:coursename").get(getCourseTeacher);

router.route("/:courseId/create/:id").get(verifyJWTTeacher, addCourseTeacher);

router
  .route("/:coursename/:courseId/add/student/:id")
  .post(verifyJWTStudent, addCourseStudent);

router
  .route("/:coursename/:courseId/verify/student/:id")
  .post(verifyJWTStudent, canStudentEnroll);

router.route("/student/:id/enrolled").get(verifyJWTStudent, enrolledCourseStd);

router
  .route("/teacher/:id/enrolled")
  .get(verifyJWTTeacher, enrolledCourseTeacher);

router
  .route("/:courseId/teacher/:teacherId/add-class")
  .post(verifyJWTTeacher, addClass);

router
  .route("/classes/student/:studentId")
  .post(verifyJWTStudent, studentEnrolledCourseClasses);

router
  .route("/classes/teacher/:teacherId")
  .post(verifyJWTTeacher, teacherEnrolledCourseClasses);

export default router;
