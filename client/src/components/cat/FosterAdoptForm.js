import {object, string, number} from 'yup'
import { Formik } from 'formik'
import React, {useState, useEffect} from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import toast from 'react-hot-toast'

const FosterAdoptForm = () => {

  const {currentUser, updateCurrentUser, addAdoptFosterForm} = useOutletContext()
  const navigate = useNavigate()

  const fosterAdoptSchema = object({
    catName: string().required(),
    adoptionFee: number().min(0).max(250).required()
  })

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

  return (
    <div>
      <Formik
          initialValues={{catName: '', adoptionFee: ''}}
          validationSchema={fosterAdoptSchema}
          onSubmit={(values) => {
            fetch("/adoptfoster", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ ...values})
            })
            .then(resp => {
              if (resp.status === 201) {
                resp.json().then(createdForm => {
                  addAdoptFosterForm(createdForm)
                  return createdForm
                }).then(createdForm => navigate(`/adoptfoster/${createdForm.id}`))
              } else {
                return resp.json().then(errorObj => toast.error(errorObj.message))
              }
            })
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <label>Cat Name </label>
              <input type='text' name='catName' onChange={handleChange} onBlur={handleBlur} value={values.catName}/>
              {errors.title && touched.title && <div className='error-message show'>{errors.title}</div>}

              <label> Adoption Fee</label>
              <input type='text' name='adoptionFee' onChange={handleChange} onBlur={handleBlur} value={values.AdoptionFee}/>
              {errors.genre && touched.genre && <div className='error-message show'>{errors.genre}</div>}

              <input type='submit' disabled={isSubmitting} />
            </form>
          )}
        </Formik> 
    </div>
  )
}

export default FosterAdoptForm