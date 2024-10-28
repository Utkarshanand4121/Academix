import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js";
import { student } from "../models/student.models.js";
import { teacher } from "../models/teacher.models.js";

const signupController = asyncHandler(async (req, res) => {
    const {username, password, email}  = req.body;

    if([username, password, email].some((field) => field?.trim === "")) {
        throw new ApiError(400, "Some fields is missing");
    }

    const existingEmail = await student.findOne({email: req.body.email});

    if(existingEmail) {
        throw new ApiError(400, "Student already exist");
    }

    const checkTeacher = await teacher.findOne({email: req.body.email});
    if(checkTeacher) {
        throw new ApiError(400, "User is the teacher");
    }


    const newStudent = await student.create({
        email,
        username,
        password,
        studentDetails: null
    })

    const createdStudent = await student.findById(newStudent._id).select("-password");
    if(!createdStudent) {
        throw new ApiError(501, "User not register");
    }

    return res.status(200).json(new ApiResponse(200, createdStudent, "SignUp successfully"));
})

export {signupController};