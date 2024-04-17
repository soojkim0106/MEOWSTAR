import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import toast ,{Toaster} from 'react-hot-toast'
import Home from "./components/pages/Home";
import Header from "./components/navigation/Header";
function App() {
  const [cats, setCats] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
  fetch("/me")
  .then(resp => {
    if (resp.ok) {
      resp.json().then(updateCurrentUser)
    } else {
      toast.error("Please log in!")
    }
  })
}, []);

  useEffect(() => {
    fetch('/cats')
        .then(resp => {
          if (resp.ok) {
            return resp.json().then(setCats)
          }
          return resp.json().then(errorObj => toast.error(errorObj.message))
        })
        .catch(err => console.log(err))
}, []);

const handleLogout = () => {
  fetch('/logout', {method:'DELETE'})
  .then(() => {
    updateCurrentUser(null)
    toast("Come back soon!", {
      icon:"👋"
    })
    navigate("/")
  })
  .catch(err => console.log(err))
}

  const updateCurrentUser = (user) => setCurrentUser(user)

  const handleEditUser = (formData) => {
    try { 
      fetch(`/users/${currentUser.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }).then((resp) => {
        if (resp.ok) {
          resp.json().then((user) => {
            updateCurrentUser(user);
          });
        } else {
          return resp
            .json()
            .then((errorObj) => toast.error(errorObj.message));
        }
      });
    } catch (err) {
      throw err;
    }
  }

  return(
    <>
      <Header currentUser={currentUser} updateCurrentUser={updateCurrentUser} handleLogout={handleLogout}/>
      <div><Toaster /></div>
      <Outlet context ={{cats, currentUser, updateCurrentUser, setCurrentUser, handleLogout, handleEditUser }}/>
    </>
  );
}

export default App;