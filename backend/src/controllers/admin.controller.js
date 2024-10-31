import { Admin } from "../models/admin.models.js";
import { Student } from "../models/student.models.js";
import { Teacher } from "../models/teacher.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const generateAccessAndRefreshToken = async (adminID) => {
  try {
    const admin = await Admin.findById(adminID);
    const accessToken = await admin.generateAccessToken();
    const refreshToken = await admin.generateRefreshToken();

    admin.refreshToken = refreshToken;
    await admin.save({ validateBeforeSave: true });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Error while generating access and refresh token");
  }
};
const signupController = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if ([username, email, password].some((fields) => fields?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await Admin.findOne({ email });

  if (user) {
    throw new ApiError(400, "Admin already exists");
  }

  const newAdmin = await Admin.create({
    email,
    password,
  });

  const createdAdmin = await Admin.findById(newAdmin._id).select("-password");

  if (createdAdmin) {
    throw new ApiError(400, "Admin not register");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createdAdmin, "Admin register Successfully"));
});

const loginController = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username) {
    throw new ApiError(400, "All fields are required");
  }

  const admin = await Admin.findOne({ username });

  if (!admin) {
    throw new ApiError(400, "Admin does not exits");
  }

  const isPasswordValid = await admin.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid student credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    admin._id
  );

  const loggedInAdmin = await admin
    .findById(admin._id)
    .select("-password -refreshToken");

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
          user: loggedInAdmin,
          accessToken,
          refreshToken,
        },
        "Admin logged in Successfully"
      )
    );
});

const logoutController = asyncHandler(async (req, res) => {
  await Admin.findByIdAndUpdate(
    req.admin._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "Admin logout"));
});

const forApproval = asyncHandler(async (req, res) => {
  const adminId = req.params.adminId;

  if (!adminId) {
    throw new ApiError(400, "Invalid authorization");
  }

  const loggedAdmin = await Admin.findById(adminId);
  if (!loggedAdmin) {
    throw new ApiError(400, "Admin not logged in");
  }

  const studentApproval = await Student.find({
    isVerified: true,
  });

  const teacherApproval = await Teacher.find({
    isVerified: true,
  });

  if (!(studentApproval && teacherApproval)) {
    return res
      .status(200)
      .json(new ApiResponse(200, loggedAdmin, "No pending teacher or student"));
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { admin: loggedAdmin, studentApproval, teacherApproval },
        "fetched Successfully"
      )
    );
});

const approveStudent = asyncHandler(async (req, res) => {
  const adminId = req.params.adminId;
  if (!adminId) {
    throw new ApiError(400, "Admin is not register");
  }

  const loggedAdmin = await Admin.findById(adminId);
  if (!loggedAdmin) {
    throw new ApiError(400, "logged Unsuccessfully");
  }

  const studentId = req.params.studentId;
  if (!studentId) {
    throw new ApiError(400, "Student is not register");
  }

  const toApprove = req.body.isApproved;
  const remarks = req.body.remarks || null;

  if (
    !toApprove ||
    (toApprove != "pending" &&
      toApprove != "rejected" &&
      toApprove != "reupload")
  ) {
    throw new ApiError(400, "Please choose anything");
  }

  const studentApprove = await Student.findOneAndUpdate(
    { _id: studentId },
    {
      $set: {
        isApproved: toApprove,
        remarks: remarks,
      },
    },
    { new: true }
  );

  if (!studentApprove) {
    throw new ApiError(400, "Failed to approve");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, studentApprove, "Student approved successfully")
    );
});

const approveTeacher = asyncHandler(async (req, res) => {
  const adminId = req.params.adminId;
  if (!adminId) {
    throw new ApiError(400, "admin is not authorized");
  }

  const loggedAdmin = await Admin.findById({ adminId });
  if (!loggedAdmin) {
    throw new ApiError(400, "Not logged in admin");
  }

  const teacherId = req.params.teacherIdl;
  if (!teacherId) {
    throw new ApiError(400, "Teacher id is not authorized");
  }

  const toApprove = await Teacher.body.isApproved;
  const remarks = await Teacher.body.remarks;

  if (
    !toApprove ||
    (toApprove != "approved" &&
      toApprove != "rejected" &&
      toApprove != "reupload")
  ) {
    throw new ApiError(400, "Please choose anything");
  }

  const teacherApproved = await Teacher.findOneAndUpdate(
    { _id: teacherId },
    {
      $set: {
        isApproved: toApprove,
        remarks: remarks,
      },
    },
    {
      new: true,
    }
  );

  if (!teacherApproved) {
    throw new ApiError(400, "Failed to approve");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, teacherApproved, "Teacher approved"));
});


export {
  signupController,
  loginController,
  logoutController,
  forApproval,
  approveStudent,
  approveTeacher,
};
