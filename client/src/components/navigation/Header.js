import toast, { Toaster } from 'react-hot-toast'
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react"
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const Header = ({currentUser, updateCurrentUser}) => {

  const navigate = useNavigate()


  const handleLogout = () => {
    fetch('/logout', {method:'DELETE'})
    .then(() => {
      updateCurrentUser(null)
      toast.success("Logged out!")
      navigate("/")
    })
    .catch(err => console.log(err))
  }

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