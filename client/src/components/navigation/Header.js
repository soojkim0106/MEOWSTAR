import toast, { Toaster } from 'react-hot-toast'
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react"

const Header = ({currentUser , handleLogout}) => {

  return (
    <>
    <Toaster />
    <nav className="navbar">

      <NavLink to='/'>Home</NavLink> <br></br>
      <>
        {currentUser ? (
          <div className="container">
            <NavLink to={`/users/${currentUser.id}`}>
              Profile
            </NavLink> <br></br>
            <NavLink onClick={handleLogout}>Logout</NavLink>
          </div> 
        ) : (
          <Link to={"/registration"}>
            Login / Sign up
          </Link>
        )}
      </>
      <NavLink to='/fosteradopt/new'>Adopt/Foster</NavLink><br></br>
    </nav>
    </>
  )
}

export default Header