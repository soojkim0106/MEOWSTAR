import toast, { Toaster } from 'react-hot-toast'
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react"

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
            <Link to={`/users/${currentUser.id}`}>
              Profile
            </Link> <br></br>
            <p onClick={handleLogout}>Logout</p>
          </div> 
        ) : (
          <Link to={"/registration"}>
            Login
          </Link>
        )}
      </>
      <NavLink to='/fosteradopt/new'>Adopt/Foster</NavLink><br></br>
    </nav>
    </>
  )
}

export default Header