import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./CatCard.css";

const CatCard = ({ cat }) => {
  const { id, name, image } = cat;
  let src = useRef(null);

  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    fetch(`/images/${image}`)
      .then((data) => {
        return data.blob();
      })
      .then((blob) => {
        src.current = URL.createObjectURL(blob);
        setImageLoaded(true);
      })
      .catch((error) => console.error("Error:", error));
  }, [image]);

  return (
    <div className="cat-card">
      <p>CatCard: </p>
      <button>
        <Link to={`/cats/${id}`} state={{ cat }}>
          <h3>{name}</h3>
          {imageLoaded ? <img src={src.current} alt={name} /> : null}
        </Link>
      </button>
    </div>
  );
};

export default CatCard;
