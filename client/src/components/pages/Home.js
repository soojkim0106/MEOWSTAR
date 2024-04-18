// import styled from 'styled-components'
import CatContainer from "../cat/CatContainer";
import "./Home.css";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useOutletContext } from "react-router-dom";


function Home() {
  const { updateCurrentUser } = useOutletContext();

  useEffect(() => {
    fetch("/me").then((resp) => {
      if (resp.ok) {
        resp.json().then(updateCurrentUser);
      } else {
        toast.error("Please log in!");
      }
    });
  }, [updateCurrentUser]);

  return (
    <div>
      <>
        <h1 className="title">
          Welcome to Meowstar!
        </h1>
        <CatContainer />
      </>
    </div>
  );
}

export default Home;
