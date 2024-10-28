import mongoose, { mongo } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

studentSchema.pre("save", async function (next) {
  if (!this.isModified("username") || !this.isNew) return next();
  this.username = this.username
    .split(" ") // Split karna hai String ko Kyuki username me Firstname and Lastname rahega
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" "); // Join karna hai haryek part ko
  next();
});

studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

studentSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

studentSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

studentSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  )
}

const student = mongoose.model("Student", studentSchema);

export { student };
