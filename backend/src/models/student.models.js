import mongoose, { mongo } from "mongoose";

const studentSchema = new mongoose.Schema(
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
      unique: true,
      lowercase: true,
      trim: true,
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
      enum: ["approved", "pending", "rejected", "reupload"],
      default: "pending",
    },

    remarks: {
      type: String,
    },

    studentDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "studentdocs",
    },

    forgetPasswordToken: String,

    forgetPasswordExpiry: Date,
  },
  { timestamps: true }
);

const student = mongoose.model("Student", studentSchema);

export { student };
