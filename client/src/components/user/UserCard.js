import { useEffect, useState } from "react";
import { useParams, useNavigate, useOutletContext, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { object, string } from "yup";
import { useFormik, Formik } from "formik";

const UserCard = () => {
  const { currentUser, updateCurrentUser, handleLogout, handleEditUser } =
    useOutletContext();
  const navigate = useNavigate();
  const { userId } = useParams();
  const [showForm, setShowForm] = useState(false);
  const [adoptedCat, setAdoptedCat] = useState(null);
  // const [catList, setCatList] = useState([]);

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
      const params = new URLSearchParams(window.location.search);
      const catId = params.get("catId");
      console.log("catId:", catId);
      if (catId) {
        fetch(`/cats/${catId}`)
          .then((resp) => {
            if (resp.ok) {
              return resp.json();
            } else {
              throw new Error("Failed to fetch cat data");
            }
          })
          .then((cat) => {
            setAdoptedCat(cat);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }, [location.search]);

    // const onAddNewCat = (newCat) => {
    //   setCatList([...catList, newCat]);
    // };

  const initialValues = {
    email: '',
    username: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: updateProfileSchema,
    onSubmit: (formData) => {
      handleEditUser(formData);
    },
  });

  if (!currentUser) {
    return <p>You must log in first</p>;
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
      {adoptedCat && (
      <div>
        <h3>Adopted/Fostered Cat:</h3>
        {/* <img src={}/> */}
        <p>Name: {adoptedCat.name}</p>
      </div>
      )}
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
