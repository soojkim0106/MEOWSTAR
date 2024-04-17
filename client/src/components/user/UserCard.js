
import { useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
  useOutletContext,
  useLocation,
} from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { object, string } from "yup";
import { useFormik, Formik } from "formik";
import CatCard from "../cat/CatCard";

const UserCard = () => {
  const { currentUser, updateCurrentUser, handleLogout, handleEditUser } =
    useOutletContext();
  const navigate = useNavigate();
  const { userId } = useParams();
  const [showForm, setShowForm] = useState(false);
  const [adoptedCatList, setAdoptedCatList] = useState([]);
  const location = useLocation();

  const updateProfileSchema = object({
    username: string().max(20, "Username must be max of 20 characters"),
    email: string().email(),
  });

  useEffect(() => {
    if (!currentUser) {
      fetch("/me").then((resp) => {
        if (resp.ok) {
          resp
            .json()
            .then((user) => {
              updateCurrentUser(user);
              return user;
            })
            .then((user) => {
              if (user.id !== userId) {
                navigate(`/users/${user.id}`);
              }
            });
        } else {
          toast.error("Please log in");
          navigate("/registration");
        }
      });
    }
  }, [userId, currentUser, navigate, updateCurrentUser]);
  
    useEffect(() => {
    if (currentUser) {
      fetch(`/users/${currentUser.id}`)
        .then((resp) => {
          if (resp.ok) {
            return resp.json();
          } else {
            throw new Error("Failed to fetch user data");
          }
        })
        .then((userData) => {
          if (userData.adopt_fosters && Array.isArray(userData.adopt_fosters)) {
            const adoptedCatIds = userData.adopt_fosters.map((adoptedCat) => {
              return adoptedCat.id;
            });
            Promise.all(
              adoptedCatIds.map((catId) =>
                fetch(`/cats/${catId}`).then((resp) => resp.json())
              )
            )
              .then((catsData) => {
                // Update adoptedCatList with cat data
                console.log(catsData);
                setAdoptedCatList(catsData);
              })
              .catch((error) => {
                console.error(error);
              });
          } else {
            console.error(
              "userData.adopt_fosters is not an array or is undefined"
            );
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [currentUser]);


    const initialValues = {
      email: "",
      username: "",
    }
  
    const formik = useFormik({
      initialValues,
      validationSchema: updateProfileSchema,
      onSubmit: 
      (formData) => { 
          handleEditUser(formData)
      },
    });

  if(!currentUser){
    return <p>You must log in first</p>
  }
  const { username, email } = currentUser;

  const handleDeleteUser = () => {
    fetch(`/users/${currentUser.id}`, { method: "DELETE" })
      // .then(toast.success("Come back soon!"))
      .then(handleLogout);
    // localStorage.clear()
    // sessionStorage.clear()
  };

  const handleDoubleCheck = () => {
    if (window.confirm("Are you sure you want to leave Meowstar for good?")) {
      handleDeleteUser();
    } else {
      navigate(`/users/${currentUser.id}`);
    }
  };

  const toggleForm = () => {
    setShowForm((prevForm) => !prevForm);
  };

  const buttonStyle = {
    backgroundColor: "red",
  };

  return (
    <>
      <div className="user-information">
        <h1>{username}'s profile:</h1>
        <h3>Registered Email: {email}</h3>
      </div>
      <br></br>
      <br></br>
      <div>
        <h3>Adopted/Fostered Cat:</h3>
        {adoptedCatList.map((adoptedCat) => (
          <CatCard cat={adoptedCat}></CatCard>
        ))}
      </div>
      <br></br>
      <br></br>
      <div className="edit-profile-form">
        <h3>Update your profile:</h3>
        <button onClick={toggleForm}>{showForm}Show Form</button>
        {showForm && (
          <form onSubmit={formik.handleSubmit}>
            <label>Email</label>
            <input
              type="text"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.errors.email && formik.touched.email && (
              <div className="error-message show">{formik.errors.email}</div>
            )}
            <label>Username</label>
            <input
              type="text"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.errors.username && formik.touched.username && (
              <div className="error-message show">{formik.errors.username}</div>
            )}
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
      <br></br>
      <div className="delete-user">
        <h3>Delete your profile:</h3>
        <button style={buttonStyle} onClick={handleDoubleCheck}>
          {" "}
          Delete ⚠️
        </button>
      </div>
    </>
  );
};

export default UserCard;
