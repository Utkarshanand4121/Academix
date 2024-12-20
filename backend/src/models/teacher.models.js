import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

teacherSchema.pre("save", async function (next) {
  if (!this.isModified("username") || this.isNew) return next();
  this.username = this.username
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.split(1).toLowerCase())
    .join(" ");
  next();
});

teacherSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

teacherSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

teacherSchema.methods.generateAccessToekn = function () {
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

teacherSchema.methods.generateRefreshToekn = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

const teacherDetailsSchema = new mongoose.Schema(
  {
    Phone: {
      type: Number,
      required: true,
      trim: true,
      unique: true,
    },
    Address: {
      type: String,
      required: true,
    },
    Experience: {
      type: Number,
      required: true,
    },
    SecondarySchool: {
      type: String,
      required: true,
    },
    HigherSchool: {
      type: String,
      required: true,
    },
    UGCollege: {
      type: String,
      required: true,
    },
    PGCollege: {
      type: String,
      required: true,
    },
    SecondaryMarks: {
      type: Number,
      required: true,
    },
    HigherMarks: {
      type: Number,
      required: true,
    },
    UGMarks: {
      type: Number,
      required: true,
    },
    PGMarks: {
      type: Number,
      required: true,
    },
    Aadhaar: {
      type: String,
      required: true,
    },
    Secondary: {
      type: String,
      required: true,
    },
    Higher: {
      type: String,
      required: true,
    },
    UG: {
      type: String,
      required: true,
    },
    PG: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Teacher = mongoose.model("Teacher", teacherSchema);
const Teacherdocs = mongoose.model("Teacherdocs", teacherDetailsSchema);

export { Teacher, Teacherdocs };
