import React from "react";
import StudentDashboard from "./StudentDashboard";
import { Outlet } from "react-router-dom";

const StudentLayout = () => {
  return (
    <>
      <StudentDashboard />
      <Outlet />
    </>
  );
};

export default StudentLayout;
