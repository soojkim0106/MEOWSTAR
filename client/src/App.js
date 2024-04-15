import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import toast ,{Toaster} from 'react-hot-toast'
import Home from "./components/pages/Home";
import Header from "./components/navigation/Header";
function App() {
  const [cats, setCats] = useState([])
  const [currentUser, setCurrentUser] = useState(null)

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

  const updateCurrentUser = (user) => setCurrentUser(user)

  // useEffect(() => {
  //   fetch("/me")
  //   .then(resp => {
  //     if (resp.ok) {
  //       resp.json().then(updateCurrentUser)
        
  //     } else {
  //       toast.error("Please log in")
  //     }
  //   })
  // }, []);

  return(
    <>
      <Header />
      <div><Toaster /></div>
      <Outlet context ={{cats, currentUser, updateCurrentUser}}/>
    </>
  );
}

export default App;
