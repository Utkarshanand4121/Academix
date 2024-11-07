import React from 'react';
import { NavLink, useNavigate, useRoutes } from 'react-router-dom';
import { Button } from "@chakra-ui/react";
import './Header.css'

const Header = () => {

  const navigate = useNavigate();

  return (
    <>
    <nav className='w-full h-14 bg-indigo-300 flex justify-between px-4 items-center md:px-4'>
        <NavLink>
          <div className='text-2xl text-indigo-800 font-bold flex'>
            <img src="https://elearnfrontend.onrender.com/src/Pages/Images/logo.svg" alt="" className='h-8 mx-[10px]'/>
            <h1>Academix</h1>
          </div>
        </NavLink>
        <div>
          <ul className='md:flex hidden font-semibold gap-8'>
            <li><NavLink to='/' className={({isActive}) => isActive ? "active" : "deactive" }> Home </NavLink></li>
            <li><NavLink to='/courses' className={({isActive}) => isActive ? "active" : "deactive"}> Courses </NavLink></li>
            <li><NavLink to='/about' className={({isActive}) => isActive ? "active" : "deactive"}> About </NavLink></li>
            <li><NavLink to='/contact' className={({isActive}) => isActive ? "active" : "deactive"}> Contact us </NavLink></li>
          </ul>
        </div>
        <div className="flex gap-10 px-4 md:px-4">
          <Button onClick={() => {navigate('/login')}} className='bg-blue-600 w-20 text-white font-bold'>Login</Button>
          <Button onClick={() => {navigate('/signup')}} className='bg-blue-600 w-20 text-white font-bold'>Signup</Button>
        </div>
    </nav>
    </>
  )
}

export default Header