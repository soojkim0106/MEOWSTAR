
import { useState, useEffect } from 'react'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import toast, {Toaster} from 'react-hot-toast'
import { number, object } from 'yup'
import { useFormik } from 'formik';
import * as Yup from "yup";

const FosterAdoptForm = () => {
  // const [isSubmitting, setIsSubmitting] = useState(false);
  // const [showAdoptionPopup, setShowAdoptionPopup] = useState(false);
  const {updateCurrentUser} = useOutletContext();
  let { catId, userid } = useParams();
  const navigate = useNavigate();
  
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
    fetch("/adopt_fosters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Failed to submit form");
        }
      })
      .then((data) => {
        const { cat_id } = data;
        navigate(`/users/${userid}?catId=${cat_id}`);
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

  // const handleAdoptionConfirmation = () => {
  //   setShowAdoptionPopup(false); // Hide the adoption confirmation popup
  //   submitForm(formik.values); // Submit the form after confirmation
  // };

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
        <button type="submit">
          Submit
        </button>
      </form>
      {/* {showAdoptionPopup && (
        <div className="adoption-popup">
          <p>Are you sure you want to adopt this cat?</p>
          <p>An adoption fee of $80 will be applied.</p>
          <button onClick={handleAdoptionConfirmation}>Yes, I'm sure</button>
          <button onClick={() => setShowAdoptionPopup(false)}>Cancel</button>
        </div>
      )} */}
    </div>
  );


    // validationSchema: Yup.object({
    //   adopt: Yup.boolean(),
    //   foster: Yup.boolean(),
    //   adoption_fee: Yup.number().test(
    //     "conditional-validation",
    //     "Adoption fee is required if adopting",
    //     function (value) {
    //       const { adopt, foster } = this.parent;
    //       if (adopt || foster) {
    //         return value !== undefined && value !== null && value !== "";
    //       }
    //       return true; // No validation when neither adopt nor foster is true
    //     }
    //   ),
    // }),


//       <Formik
//           initialValues={{catName: '', adoptionFee: ''}}
//           validationSchema={fosterAdoptSchema}
//           onSubmit={(values) => {
//             fetch("/adoptfoster", {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json"
//               },
//               body: JSON.stringify({ ...values})
//             })
//             .then(resp => {
//               if (resp.status === 201) {
//                 resp.json().then(createdForm => {
//                   addAdoptFosterForm(createdForm)
//                   return createdForm
//                 }).then(createdForm => navigate(`/adoptfoster/${createdForm.id}`))
//               } else {
//                 return resp.json().then(errorObj => toast.error(errorObj.message))
//               }
//             })
//           }}
//         >
//           {({
//             values,
//             errors,
//             touched,
//             handleChange,
//             handleBlur,
//             handleSubmit,
//             isSubmitting,
//           }) => (
//             <form onSubmit={handleSubmit}>
//               <label>Cat Name </label>
//               <input type='text' name='catName' onChange={handleChange} onBlur={handleBlur} value={values.catName}/>
//               {errors.title && touched.title && <div className='error-message show'>{errors.title}</div>}

//               <label> Adoption Fee</label>
//               <input type='text' name='adoptionFee' onChange={handleChange} onBlur={handleBlur} value={values.AdoptionFee}/>
//               {errors.genre && touched.genre && <div className='error-message show'>{errors.genre}</div>}

//               <input type='submit' disabled={isSubmitting} />
//             </form>
//           )}
//         </Formik> 
//     </div>
//   )
}

export default FosterAdoptForm