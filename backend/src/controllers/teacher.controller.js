import { Student } from "../models/student.models.js";
import { Teacher } from "../models/teacher.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const signupController = asyncHandler(async (req, res) => {
  const { email, password, username } = req.body;

  if ([email, password, username].some((field) => field?.trim === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existingEmail = await Teacher.findOne({ email: req.body.email });
  if (existingEmail) {
    throw new ApiError(400, "Teacher allready exists");
  }

  const checkStudent = await Student.findOne({ email: req.body.email });
  if (checkStudent) {
    throw new ApiError(400, "User is a Student");
  }

  const newTeacher = await Teacher.create({
    email,
    username,
    password,
    teacherDetails: null,
  });
  const createdTeacher = await Teacher.findById(newTeacher._id).select(
    "-password"
  );

  if (!createdTeacher) {
    throw new ApiError(501, "Teacher registration failed");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createdTeacher, "SignUp Completed"));
});

export { signupController };
