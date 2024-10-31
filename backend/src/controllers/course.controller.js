import { Course } from "../models/course.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const getCourse = asyncHandler(async (req, res) => {
  const courses = await Course.findOne({ isApproved: true });

  return res.status(200).json(new ApiResponse(200, courses, "All courses"));
});

const getCourseTeacher = asyncHandler(async (req, res) => {
    const courseName = req.params.coursename;

    if(!courseName) {
        throw new ApiError(200, "Chhose a course");
    }

    const courseTeacher = await Course.find({courseName, isApproved: true}).populate("enrolledTeacher");

    if (!courseTeacher || courseTeacher === "") {
        throw new ApiError(200, "No teacher found for the course");
    }

    return res.status(200).json(new ApiResponse(200, courseTeacher, "Information Fetched"));
})

export { getCourse, getCourseTeacher };
