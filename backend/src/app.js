import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json({ limits: "15kb" }));
app.use(express.urlencoded({ extended: true, limits: "15kb" }));

app.use(express.static("public"));

// routes import
import studentRoute from "./routes/student.routes.js";
app.use("/api/v1/student", studentRoute);

import teacherRoute from "./routes/teacher.routes.js";
app.use("/api/v1/teacher", teacherRoute);

import adminRoute from "./routes/admin.routes.js";
app.use("/api/v1/admin", adminRoute);

export { app };
