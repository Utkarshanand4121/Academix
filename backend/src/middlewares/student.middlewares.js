import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { Student } from "../models/student.models.js";

export const verifyJWTStudent = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if(!token) {
            throw new ApiError(401, "Unauthorized request");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const student = await Student.findById(decodedToken?._id).select("-password -refreshToken");

        if(!student) {
            throw new ApiError(401, "Invalid Access Token");
        }

        req.student = student;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid message")
    }
})