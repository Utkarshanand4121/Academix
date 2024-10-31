import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isApproved: {
      type: Boolean,
      required: true,
    },
    liveClasses: [
      {
        title: String,
        timing: Number,
        date: Date,
        link: String,
        status: {
          type: String,
          enum: ["completed", "upcoming", "in-progress"],
          default: "completed",
        },
      },
    ],
    enrolledTeacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    enrolledStudent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    schedule: [
      {
        day: {
          type: Number,
          enum: [0, 1, 2, 3, 4, 5, 6],
        },
        startTime: {
          type: Number,
          min: 0,
          max: 24 * 60,
        },
        endTime: {
          type: Number,
          min: 0,
          max: 24 * 60,
        },
      },
    ],
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

export { Course };
