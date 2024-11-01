import { Course } from "../models/course.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Teacher } from "../models/teacher.models.js";

const getCourse = asyncHandler(async (req, res) => {
  const courses = await Course.findOne({ isApproved: true });

  return res.status(200).json(new ApiResponse(200, courses, "All courses"));
});

const getCourseTeacher = asyncHandler(async (req, res) => {
  const courseName = req.params.coursename;

  if (!courseName) {
    throw new ApiError(200, "Chhose a course");
  }

  const courseTeacher = await Course.find({
    courseName,
    isApproved: true,
  }).populate("enrolledTeacher");

  if (!courseTeacher || courseTeacher === "") {
    throw new ApiError(200, "No teacher found for the course");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, courseTeacher, "Information Fetched"));
});

const addCourseTeacher = asyncHandler(async (req, res) => {
  const loggedTeacher = req.teacher;

  const teacherParams = req.params.id;

  if (!teacherParams) {
    throw new ApiError(400, "Not vaild teacher");
  }

  if (loggedTeacher._id != teacherParams) {
    throw new ApiError(400, "Not authorized");
  }

  const { courseName, description, schedule } = req.body;

  if (!schedule) {
    throw new ApiError(400, "Schedule of the course is required");
  }

  if ([courseName, description].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const schedules = await Course.aggregate([
    {
      $match: {
        enrolledteacher: loggedTeacher._id,
      },
    },
    {
      $unwind: "$schedule",
    },
    {
      $project: {
        schedule: 1,
        _id: 0,
      },
    },
  ]);

  let isconflict = false;
  for (let i = 0; i < schedule.length; i++) {
    for (const sch of schedules) {
      if (sch.schedule.day === schedule[i].day) {
        if (
          (schedule[i].startTime >= sch.schedule.startTime &&
            schedule[i].startTime < sch.schedule.endTime) ||
          (schedule[i].endTime > sch.schedule.startTime &&
            schedule[i].endTime <= sch.schedule.endTime) ||
          (schedule[i].startTime <= sch.schedule.startTime &&
            schedule[i].endTime >= sch.schedule.endTime)
        ) {
          isconflict = true;
        }
      }
    }
  }

  if (isconflict) {
    throw new ApiError(400, "Enrolled in the courses at the same timing.");
  }

  const newCourse = await Course.create({
    courseName,
    description,
    schedule,
    enrolledTeacher: loggedTeacher._id,
  });

  if (!newCourse) {
    throw new ApiError(400, "Not created courses");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { newCourse, loggedTeacher },
        "Courses created successfully"
      )
    );
});

const addCourseStudent = asyncHandler(async (req, res) => {
  const loggedStudent = req.Student;
  const studentParams = req.params.id;

  if (!studentParams) {
    throw new ApiError(400, "Student params not found");
  }

  if (loggedStudent._id != studentParams) {
    throw new ApiError(400, "not authorized");
  }

  const courseId = req.params.courseId;

  if (!courseId) {
    throw new ApiError(400, "Not selected a course");
  }

  const selectedCourse = await Course.findOne(courseId);

  const courseSchedule = selectedCourse.schedule;

  // aggregate function
  const schedules = await Course.aggregate([
    {
      $match: {
        enrolledStudent: loggedStudent._id,
      },
    },
    {
      $unwind: "$schedule",
    },
    {
      $project: {
        schedule: 1,
        _id: 0,
      },
    },
  ]);

  let isconflict = false;
  for (let i = 0; i < courseSchedule.length; i++) {
    for (const schedule of schedules) {
      if (schedule.schedule.day === courseSchedule[i].day) {
        if (
          (courseSchedule[i].startTime >= schedule.schedule.startTime &&
            courseSchedule[i].startTime < schedule.schedule.endTime) ||
          (courseSchedule[i].endTime > schedule.schedule.startTime &&
            courseSchedule[i].endTime <= schedule.schedule.endTime) ||
          (courseSchedule[i].startTime <= schedule.schedule.startTime &&
            courseSchedule[i].endTime >= schedule.schedule.endTime)
        ) {
          isconflict = true;
        }
      }
    }
  }

  if (isconflict) {
    throw new ApiError(
      400,
      "All ready enrolled in the course with same timing"
    );
  }

  const alreadyEnrolled = await Course.findOne({
    _id: courseId,
    enrolledStudent: loggedStudent._id,
  });

  if (alreadyEnrolled) {
    throw new ApiError(400, "Allready enrolled in the courses");
  }

  const selectedStudent = await Course.findByIdAndUpdate(
    courseId,
    {
      $push: {
        enrolledStudent: loggedStudent._id,
      },
    },
    {
      new: true,
    }
  );

  if (!selectedCourse) {
    throw new ApiError(400, "Failed to add Student in the course schema");
  }

  const teacherId = selectedStudent.enrolledTeacher;
  const teacher = await Teacher.findByIdAndUpdate(
    teacherId,
    {
      $push: {
        enrolledStudent: loggedStudent._id,
      },
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { teacher, selectedCourse, loggedStudent },
        "Successfully opted in course"
      )
    );
});

const enrolledCourseStd = asyncHandler(async (req, res) => {
  const stdID = req.params.id;

  if (!stdID) {
    throw new ApiError(400, "Authorization failed");
  }

  if (req.student._id != stdID) {
    throw new ApiError("400", "Params and logged student id does not match");
  }

  const Student = await Course.find({ enrolledStudent: stdID }).select(
    "-enrolledStudent -liveClasses -enrolledTeacher"
  );

  if (!Student) {
    throw new ApiError(400, "Student not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, Student, "Student enrolled in courses"));
});

const enrolledCourseTeacher = asyncHandler(async (req, res) => {
  const teacherId = req.params.id;

  if (!teacherId) {
    throw new ApiError(400, "Authorization failed");
  }

  if (req.teacher._id != teacherId) {
    throw new ApiError(400, "Params and logged teacher id does not match");
  }

  const Teacher = await Course.find({ enrolledTeacher: teacherId }).select(
    "-enrolledStudent -liveClasses -enrolledTeacher"
  );

  if (!Teacher) {
    throw new ApiError(400, "Teacher not found");
  }

  return res
    .status(200)
    .json(new ApiError(200, Teacher, "Teacher enrolled in courses"));
});

const addClass = asyncHandler(async (req, res) => {
  const { title, date, link, timing, status } = req.body;

  if (!title || !date) {
    throw new ApiError(400, "All fields are required");
  }

  if ([title, link, status].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const { courseId, teacherId } = req.params;

  const dateObject = new Date(date);
  const enrolledTeacher = await Course.findOne({
    _id: courseId,
    enrolledTeacher: teacherId,
    isApproved: true,
  });

  if (!enrolledTeacher) {
    throw new ApiError(400, "Not authorized");
  }

  const conflictClass = await Course.aggregate([
    {
      $match: {
        enrolledteacher: loggedTeacher._id,
      },
    },
    {
      $unwind: "$liveClasses",
    },
    {
      $match: {
        "liveClasses.date": dateObject,
        "liveClasses.timing": {
          $gte: cst,
          $lte: cet,
        },
      },
    },
    {
      $project: {
        _id: 0,
        courseName: "$courseName",
        liveClasses: 1,
      },
    },
  ]);

  if (conflictClass.length > 0) {
    throw new ApiError(400, "Another classes at this time");
  }

  const enrolledCourse = await Course.findByIdAndUpdate(
    { _id: courseId },
    { $push: { liveClasses: { title, date, timing, link, status } } },
    { new: true }
  );

  if (!enrolledCourse) {
    throw new ApiError(400, "Error occur while adding the class");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { enrolledCourse, loggedTeacher },
        "Class added successfully"
      )
    );
});

const studentEnrolledCourseClasses = asyncHandler(async (req, res) => {
  const Student = req.student;

  const classes = await Course.aggregate([
    {
      $match: {
        enrolledStudent: Student._id,
      },
    },
    {
      $unwind: "$liveClasses",
    },
    {
      $sort: {
        "liveClasses.date": 1,
        "liveClasses.timing": 1,
      },
    },
    {
      $group: {
        _id: "classes",
        liveClasses: {
          $push: {
            courseName: "$courseName",
            title: "$liveClasses.title",
            timing: "$liveClasses.timing",
            link: "$liveClasses.link",
            status: "$liveClasses.status",
            date: "$liveClasses.date",
          },
        },
      },
    },
  ]);

  if (!classes) {
    throw new ApiError(400, "Couldn't fetch the classes");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, { Student, classes }, "Fetched classes successfully")
    );
});

const teacherEnrolledCourseClasses = asyncHandler(async (req, res) => {
  const teacher = req.teacher;

  const classes = await Course.aggregate([
    {
      $match: {
        enrolledteacher: teacher._id,
      },
    },
    {
      $unwind: "$liveClasses",
    },
    {
      $sort: {
        "liveClasses.date": 1,
        "liveClasses.timing": 1,
      },
    },
    {
      $group: {
        _id: "classes",
        liveClasses: {
          $push: {
            courseName: "$courseName",
            title: "$liveClasses.title",
            timing: "$liveClasses.timing",
            link: "$liveClasses.link",
            status: "$liveClasses.status",
            date: "$liveClasses.date",
          },
        },
      },
    },
  ]);

  if (!classes) {
    throw new ApiError(400, "Fetched Unsuccessfull");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { teacher, classes }, "Fetched Successfull"));
});

const canStudentEnroll = asyncHandler(async (req, res) => {
  const loggedStudent = req.student;

  const stdParams = req.params.id;

  if (!stdParams) {
    throw new ApiError(400, "No params found");
  }

  if (!loggedStudent._id != stdParams) {
    throw new ApiError(400, "Not authorized");
  }

  const courseId = req.params.couseId;

  if (!courseId) {
    throw new ApiError(400, "Select a course");
  }

  const thecourse = await Course.findById(courseID); //

  const EC = thecourse.schedule;

  const schedules = await Course.aggregate([
    {
      $match: {
        enrolledStudent: loggedStudent._id,
      },
    },
    {
      $unwind: "$schedule",
    },
    {
      $project: {
        schedule: 1,
        _id: 0,
      },
    },
  ]);

  let isconflict = false;
  for (let i = 0; i < EC.length; i++) {
    for (const schedule of schedules) {
      if (schedule.schedule.day === EC[i].day) {
        if (
          (EC[i].startTime >= schedule.schedule.startTime &&
            EC[i].startTime < schedule.schedule.endTime) ||
          (EC[i].endTime > schedule.schedule.starttime &&
            EC[i].endTime <= schedule.schedule.endTime) ||
          (EC[i].startTime <= schedule.schedule.startTime &&
            EC[i].endTime >= schedule.schedule.endTime)
        ) {
          isconflict = true;
        }
      }
    }
  }

  if (isconflict) {
    throw new ApiError(
      400,
      "Already enrolled in a course with the same timing."
    );
  }

  const alreadyEnrolled = await Course.findOne({
    _id: courseId,
    enrolledStudent: loggedStudent._id,
  });

  if (alreadyEnrolled) {
    throw new ApiError(400, "Already enrolled in the course");
  }

  return res.status(200).json(new ApiResponse(200, {}, "Student can enroll"));
});

export {
  getCourse,
  getCourseTeacher,
  addCourseTeacher,
  addCourseStudent,
  enrolledCourseStd,
  enrolledCourseTeacher,
  addClass,
  studentEnrolledCourseClasses,
  teacherEnrolledCourseClasses,
  canStudentEnroll,
};
