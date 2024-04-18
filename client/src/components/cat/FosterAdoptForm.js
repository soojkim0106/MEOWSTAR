import { useEffect } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
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
      adopt: Yup.boolean().required(),
      foster: Yup.boolean(),
    }).test("at-least-one-checked", null, (values) => {
      return values.adopt || values.foster;
    }),
    onSubmit: (formData) => {
      if (!formData.adopt && !formData.foster) {
        toast.error("Please select at least one option.");
      } else {      
      submitForm(formData);
    }
  },
});

  const submitForm = (formData) => {
    const { id } = currentUser;
    console.log(`formData: ${formData}`)
    console.log(`userId: ${id}`)
    console.log(`catId: ${catId}`)
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
        // toast.error("Please log in");
        navigate("/");
      }
    });
  }, []);

  return (
    <div className="foster-adopt-form">
      <h1>Interested in Adopting or Fostering?</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit(e);
        }}
      >
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
        {formik.errors.adopt && formik.touched.adopt && (
          <div>{formik.errors.adopt}</div>
        )}
        {formik.errors.foster && formik.touched.foster && (
          <div>{formik.errors.foster}</div>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FosterAdoptForm

