import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import toast from "react-hot-toast";
import { object, string } from "yup";
import { useFormik, Formik } from "formik";
import "./Registration.css";

const signupSchema = object({
  username: string()
    .max(20, "Username must be max of 20 characters")
    .required("Username is required"),
  email: string().email().required("Email is required"),
  password: string()
    .min(5, "Password must be at least 5 characters long")
    .matches(
      /[a-zA-Z0-9]/,
      "Passwords can only contain latin numbers and letters"
    )
    .required("Password is required"),
});

const signinSchema = object({
  username: string().max(20, "Username must be max of 20 characters"),
  password: string()
    .min(5, "Password must be at least 5 characters long")
    .matches(
      /[a-zA-Z0-9]/,
      "Passwords can only contain latin numbers and letters"
    )
    .required("Password is required"),
});

const initialValues = {
  username: "",
  email: "",
  password: "",
};

const Registration = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const { updateCurrentUser } = useOutletContext();
  const requestedUrl = isLogin ? "/login" : "/signup";

  const formik = useFormik({
    initialValues,
    validationSchemas: isLogin ? signinSchema : signupSchema,
    onSubmit: (formData) => {
      fetch(requestedUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          username: formData.username,
          password_hash: formData.password,
        }),
      }).then((resp) => {
        if (resp.ok) {
          resp
            .json()
            .then(updateCurrentUser)
            .then(() => {
              navigate("/");
              toast("Meowster", {
                icon: "🐱",
              });
            });
        } else {
          return resp.json().then((errorObj) => toast.error(errorObj.message));
        }
      });
    },
  });

  return (
    <div className='form-body'>
      <div className="registration-form">
        <h2>Log in or Sign up for Meowstar!</h2>
        <form id="registrationForm" onSubmit={formik.handleSubmit}>
          {!isLogin && (
            <>
              <label>Email: </label>
              <input
                type="text"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="registration-input"
              />
              {formik.errors.email && formik.touched.email && (
                <div className="error-message show">{formik.errors.email}</div>
              )}
            </>
          )}
          <label>Username: </label>
          <input
            type="text"
            name="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            className="registration-input"
          />
          {formik.errors.username && formik.touched.username && (
            <div className="error-message show">{formik.errors.username}</div>
          )}
          <label>Password: </label>
          <input
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="registration-input"
          />
          {formik.errors.password && formik.touched.password && (
            <div className="error-message show">{formik.errors.password}</div>
          )}

          <input type="submit" className="button-55-1" value={isLogin ? "Login!" : "Signup!"} />
        </form>
        <div className='swap'>
        <h3>{isLogin ? "Not a member of Meowstar?" : "Meowstar!"}</h3>
        <button
          className="button-55"
          onClick={() => setIsLogin((currentState) => !currentState)}
        >
          {isLogin ? "Be part of Meowstar family" : "Login"}
        </button>
        </div>
    </div>
  </div>
  );
};

export default Registration;
