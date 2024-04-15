import {useEffect, useState} from 'react'
import {useParams, useNavigate } from 'react-router-dom'
import toast from "react-hot-toast";

const CatDetail = () => {
  const [cat, setCat] = useState()

  const {catId} = useParams()

  useEffect(() => {
    fetch(`/cats/${catId}`)
    .then(resp => {
        if (resp.ok){
            return resp.json().then(setCat)
        }
        return resp.json().then(errorObj => toast.error(errorObj.message))
    })
    .catch(error => console.log(error))
  }, [catId])

  const {
    name,
    age,
    gender,
    breed,
    temperament,
    image,
    availability,
    fixed,
    good_with_children,
    good_with_animal,
    id
  } = cat;

  return (
    <div className="cat-detail-container">
      <h2>{name}</h2>
        <img className="cat-image" src={image} alt={name}/>
        <div className="details">
          <p>Age: {age}</p>
          <p>Gender: {gender}</p>
          <p>Breed: {breed}</p>
          <p>Temperament: {temperament}</p>
          <p>Availability: {availability ? "Yes" : "No"}</p>
          <p>Fixed: {fixed ? "Yes" : "No"}</p>
          <p>Good with Children: {good_with_children ? "Yes" : "No"}</p>
          <p>Good with Animals: {good_with_animal ? "Yes" : "No"}</p>
        </ div>
    </ div>
  );
}


export default CatDetail