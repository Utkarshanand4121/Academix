import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import About from "./components/Home/About/About";
import Contact from "./components/Home/Contact/Contact";
import Courses from "./components/Home/Courses/Courses";
import Landing from "./components/Home/Landing/Landing";
import Footer from "./components/Footer/Footer";
import StudentLayout from "./components/StudentDashboard/StudentLayout";
import StudentDashboard from "./components/StudentDashboard/StudentDashboard";
import SearchTeacher from "./components/StudentDashboard/SearchTeacher";
import StudentClasses from "./components/StudentDashboard/StudentClasses";
import StudentCourses from "./components/StudentDashboard/StudentCourses";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student/Dashboard/:id" element={<StudentLayout />}>
          <Route
            path="/student/Dashboard/:id/Search"
            element={<SearchTeacher />}
          />
          <Route
            path="/student/Dashboard/:id/Classes"
            element={<StudentClasses />}
          />
          <Route
            path="/student/Dashboard/:id/Courses"
            element={<StudentCourses />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
