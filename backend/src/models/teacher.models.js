import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },

    refreshToken: {
      type: String,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    isApproved: {
      type: String,
      req: ["pending", "approved", "rejected", "reupload"],
    },

    remarks: {
      type: String,
    },

    forgetPasswordToken: String,

    forgetPasswordExpiry: Date,

    teacherDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacherdocs",
    },

    enrolledStudent: [
      {
        studentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "student",
        },
        isNewEnroll: {
          type: Boolean,
          default: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const teacher = mongoose.model("Teacher", teacherSchema);

export { teacher };
