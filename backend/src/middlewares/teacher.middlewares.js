import { Teacher } from "../models/teacher.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken';

export const verifyJWTTeacher = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.headers("Authorization")?.replace("Bearer ", "");
        if(!token) {
            throw new ApiError(401, "Unauthorized request");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const teacher = await Teacher.findById(decodedToken?._id).select("-password -refreshToken");

        if(!teacher) {
            throw new ApiError(401, "Invalid Access Token");
        }

        req.teacher = teacher;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
})