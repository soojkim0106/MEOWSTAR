import { useState, useEffect } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { number, object } from "yup";
import { useFormik } from "formik";
import * as Yup from "yup";
import './FosterAdoptForm.css'

const FosterAdoptForm = () => {

  const { currentUser, updateCurrentUser } = useOutletContext();

  const navigate = useNavigate();
  const { catId } = useParams();

  const formik = useFormik({
    initialValues: {
      adopt: false,
      foster: false,
    },
    validationSchema: Yup.object({
      adopt: Yup.boolean(),
      foster: Yup.boolean(),
    }),
    onSubmit: (formData) => {
      submitForm(formData);
    },
  });

  const submitForm = (formData) => {
    const { id } = currentUser;
    fetch("/adopt_fosters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        user_id: id,
        cat_id: Number.parseInt(catId),
      }),
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Failed to submit form");
        }
      })
      .then((data) => {
        navigate(`/users/${id}`);
      })
      .catch((error) => {
        toast.error("An error occurred. Please try again.");
        console.error(error);
      });
  };



  useEffect(() => {
    fetch("/me").then((resp) => {
      if (resp.ok) {
        resp.json().then(updateCurrentUser);
      } else {
        toast.error("Please log in");
        navigate("/");
      }
    });
  }, []);

  return (
    <div className="foster-adopt-form">
      <h1>Interested in Adopting or Fostering?</h1>
      <form onSubmit={formik.handleSubmit}>
        <label>
          Adopt
          <input
            type="checkbox"
            name="adopt"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            checked={formik.values.adopt}
          />
        </label>
        <label>
          Foster
          <input
            type="checkbox"
            name="foster"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            checked={formik.values.foster}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FosterAdoptForm

