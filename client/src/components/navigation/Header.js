import { Toaster } from 'react-hot-toast'
import { NavLink, Link } from "react-router-dom";
import { useState } from "react"

const Header = () => {
  return (
    <>
    <Toaster />
    <nav className="navbar">

      <NavLink to='/'>Home</NavLink> <br></br>
      <NavLink to='/users/:userId'>Profile</NavLink> <br></br>
      <NavLink to='/registration'>Sign Up/Login</NavLink> <br></br>
      <NavLink to='/fosteradopt/new'>Adopt/Foster</NavLink>
    </nav>
    </>
  )
}

export default Header