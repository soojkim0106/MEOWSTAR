import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import './CatCard.css'


const CatCard = ({ cat }) => {
  const { id, name, image } = cat;
  // let src = useRef(null);
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

  return (
    <div className="cat-card">
      <button>
        <Link to={`/cats/${id}`} state={{ cat }}>
          <h3>{name}</h3>
          {imageLoaded && imageUrl && <img src={imageUrl} alt={name} />}
        </Link>
      </button>
    </div>
  );
};

export default CatCard;
