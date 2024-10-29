import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Student } from "../models/student.models.js";
import { Teacher } from "../models/teacher.models.js";

const generateAccessAndRefreshToken = async (studentId) => {
  try {
    const student = await Student.findById(studentId);
    const accessToken = await student.generateAccessToken();
    const refreshToken = await student.generateRefreshToken();

    student.refreshToken = refreshToken;
    await student.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access and refresh token"
    );
  }
};

const signupController = asyncHandler(async (req, res) => {
  const { username, password, email } = req.body;

  if ([username, password, email].some((field) => field?.trim === "")) {
    throw new ApiError(400, "Some fields is missing");
  }

  const existingEmail = await Student.findOne({ email: req.body.email });

  if (existingEmail) {
    throw new ApiError(400, "Student already exist");
  }

  const checkTeacher = await Teacher.findOne({ email: req.body.email });
  if (checkTeacher) {
    throw new ApiError(400, "User is the teacher");
  }

  const newStudent = await Student.create({
    email,
    username,
    password,
    studentDetails: null,
  });

  const createdStudent = await Student.findById(newStudent._id).select(
    "-password"
  );
  if (!createdStudent) {
    throw new ApiError(501, "User not register");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createdStudent, "SignUp successfully"));
});

const loginController = asyncHandler(async (req, res) => {
  // 1. req.body --> data
  // 2. username or email
  // 3. find the Student
  // 4. passsword check
  // 5. access and refresh token
  // 6. send cookie

  // ------------------------
  const { username, email, password } = req.body;

  if (!(username || email)) { // anything required either username or email
    throw new ApiError(400, "All fields are required");
  }

  const student = await Student.findOne({
    $or: [{ username }, { email }],  // find by email or username
  });

  if (!student) {
    throw new ApiError(400, "Student does not exist");
  }

  // Password verification
  const isPasswordValid = await student.isPasswordCorrect(password); 

  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid student credentials");
  }

  // generating access token and refresh token
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    student._id
  );

  const loggedInStudent = await Student.findById(student._id).select(
    "-password -refreshToken"
  );

  // Not modified by frontend
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
          user: loggedInStudent,
          accessToken,
          refreshToken,
        },
        "Student logged In Successfully"
      )
    );
});

export { signupController, loginController };
