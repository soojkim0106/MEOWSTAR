import {useEffect, useState} from 'react'
import {Link, useLocation, useOutletContext } from 'react-router-dom'
import toast from "react-hot-toast";
import './CatDetail.css'

const CatDetail = () => {
  const location = useLocation();
  const { cat } = location.state;

  const [imageUrl, setImageUrl] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const { updateCurrentUser } = useOutletContext();

  useEffect(() => {
    fetch("/me").then((resp) => {
      if (resp.ok) {
        resp.json().then(updateCurrentUser);
      } else {
        // toast.error("Please log in!");
      }
    });
  }, [updateCurrentUser]);

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
        <p>
          <strong>Age:</strong> {age}
        </p>
        <p>
          <strong>Gender:</strong> {gender}
        </p>
        <p>
          <strong>Breed:</strong> {breed}
        </p>
        <p>
          <strong>Temperment:</strong> {temperament}
        </p>
        <p>
          <strong>Availability:</strong> {availability ? "Yes" : "No"}
        </p>
        <p>
          <strong>Fixed:</strong> {fixed ? "Yes" : "No"}
        </p>
        <p>
          <strong>Good with Children:</strong>{" "}
          {good_with_children ? "Yes" : "No"}
        </p>
        <p>
          <strong>Good with Animals:</strong> {good_with_animal ? "Yes" : "No"}
        </p>
        <p>
          <strong>Adoption Fee:</strong> {adoption_fee}{" "}
        </p>
      </div>
      <div>
        <h3>
          {" "}
          Would you like to adopt or foster this cat? Let us know{" "}
          <Link to={`/fosteradopt/${id}`}>here!</Link>
        </h3>
      </div>
    </div>
  );
}


export default CatDetail