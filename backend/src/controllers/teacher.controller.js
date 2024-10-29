import { Student } from "../models/student.models.js";
import { Teacher } from "../models/teacher.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const generateAccessAndRefreshToken = async (teacherId) => {
  try {
    const teacher = await Teacher.findById(teacherId);

    const accessToken = await generateAccessToekn();
    const refreshToken = await generateRefreshToekn();

    teacher.refreshToken = refreshToken;
    await teacher.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something wrong while generating access and refresh token"
    );
  }
};

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

const loginController = asyncHandler(async (req, res) => {
  // 1.data by req.body
  // 2.username or email
  // 3.find by email
  // 4.password check
  // 5.access and refresh toekn
  // 6.send cookie

  // --------------------------------------

  const { username, email, password } = req.body;

  if (!(username || email)) {
    throw new ApiError(400, "All fields are required");
  }

  const teacher = await Teacher.findOne({
    $or: [{ username }, { email }],
  });

  if (!teacher) {
    throw new ApiError(400, "Teacher not exists");
  }

  const isValidPassword = await teacher.isPasswordCorrect(password);
  if (!isValidPassword) {
    throw new ApiError(400, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    teacher._id
  );
  const loggedInTeacher = await Teacher.findById(teacher._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInTeacher,
          accessToken,
          refreshToken,
        },
        "Teacher logged in Successfully"
      )
    );
});

export { signupController, loginController };
