import { useState, useEffect } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import toast, {Toaster} from 'react-hot-toast'
import { number, object } from 'yup'
import { useFormik } from 'formik';
import * as Yup from "yup";

// const adoptFosterSchema = object({
//   adoption_fee: number()
// });

const FosterAdoptForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {updateCurrentUser} = useOutletContext()
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      adopt: false,
      foster: false,
      adoption_fee: 0,
    },
    validationSchema: Yup.object({
      adopt: Yup.boolean(),
      foster: Yup.boolean(),
      adoption_fee: Yup.number().test(
        "conditional-validation",
        "Adoption fee is required if adopting",
        function (value) {
          const { adopt, foster } = this.parent;
          if (adopt || foster) {
            return value !== undefined && value !== null && value !== "";
          }
          return true; // No validation when neither adopt nor foster is true
        }
      ),
    }),
    onSubmit: (formData) => {
      setIsSubmitting(true);
      fetch("/adopt_fosters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((resp) => {
          if (resp.ok) {
            navigate(`/`);
          } else {
            return resp.json().then((error) => {
              toast.error(error.message);
            });
          }
        })
        .catch((error) => {
          toast.error("An error occurred. Please try again.");
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    },
  });


    useEffect(() => {
    fetch("/me")
    .then(resp => {
      if (resp.ok) {
        resp.json().then(updateCurrentUser)
        
      } else {
        toast.error("Please log in")
        navigate('/')
      }
    })
  }, []);

  // onSubmit/handleSubmit should include <Link to={`/users/${userId}`} />


  return (
    <div>
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
        {formik.values.adopt && (
          <div>
            <label htmlFor='adoption_fee'>Adoption Fee</label>
            <input
              type="number"
              id="adoption_fee"
              name="adoption_fee"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.adoption_fee}
            />
            {formik.touched.adoption_fee && formik.errors.adoption_fee ? (
              <div>{formik.errors.adoption_fee}</div>
            ) : null}
          </div>
        )}
        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default FosterAdoptForm