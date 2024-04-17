import {useEffect, useState} from 'react'
import {Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import toast from "react-hot-toast";
import './CatDetail.css'

const CatDetail = () => {
  // const [cat, setCat] = useState(null)
  const location = useLocation();
  const { cat } = location.state;

  const [imageUrl, setImageUrl] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (!imageUrl)
      fetch(`/images/${image}`)
        .then((data) => {
          return data.blob();
        })
        .then((blob) => {
          // src.current = URL.createObjectURL(blob);
          const url = URL.createObjectURL(blob);
          setImageUrl(url);
          setImageLoaded(true);
        })
        .catch((error) => console.error("Error:", error));
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, []);


  // useEffect(() => {
  //   fetch(`/cats/${catId}`)
  //   .then(resp => {
  //       if (resp.ok){
  //           return resp.json().then(setCat)
  //       }
  //       return resp.json().then(errorObj => toast.error(errorObj.message))
  //   })
  //   .catch(error => console.log(error))
  // }, [catId])

  if(!cat){
    return <h2>Loading...</h2>
  }

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
    adoption_fee,
    id
  } = cat;

  return (
    <div className="cat-detail-container">
      <h2>{name}</h2>
      {imageLoaded && imageUrl && <img src={imageUrl} alt={name} />}
      <div className="details">
        <p>Age: {age}</p>
        <p>Gender: {gender}</p>
        <p>Breed: {breed}</p>
        <p>Temperament: {temperament}</p>
        <p>Availability: {availability ? "Yes" : "No"}</p>
        <p>Fixed: {fixed ? "Yes" : "No"}</p>
        <p>Good with Children: {good_with_children ? "Yes" : "No"}</p>
        <p>Good with Animals: {good_with_animal ? "Yes" : "No"}</p>
        <p>Adoption Fee: {adoption_fee} </p>
      </div>
      <div>
          <h3> Would you like to adopt or foster this cat? Let us know <Link to={`/fosteradopt/${id}`}>here!</Link></h3>
        </div>
    </div>
  );
}


export default CatDetail