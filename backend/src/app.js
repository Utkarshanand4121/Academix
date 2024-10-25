import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limits: "15kb" }));
app.use(express.urlencoded({ extended: true, limits: "15kb" }));

app.use(express.static("public"));

export { app };
