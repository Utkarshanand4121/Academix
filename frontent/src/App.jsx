import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import About from './components/Home/About/About';
import Contact from './components/Home/Contact/Contact';
import Courses from './components/Home/Courses/Courses';
import Landing from './components/Home/Landing/Landing';
import Footer from './components/Footer/Footer';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/courses' element={<Courses/>}/>
        <Route path='/footer' element={<Footer/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
