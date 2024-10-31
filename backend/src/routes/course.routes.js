
import { Router } from 'express';
import { getCourse, getCourseTeacher } from '../controllers/course.controller.js';

const router = Router();

router.route("/all").get(getCourse);

router.route("/:coursename").get(getCourseTeacher);

export default router 