import React from 'react'
import {Link} from 'react-router-dom'

const CatCard = ({cat}) => {
  const {id, name, image} = cat
  console.log(cat)
  return (
    <div>
        <p>CatCard: </p>
        <button>
        <Link to={`/cats/${id}`} state={{cat}}>
            <h3>{name}</h3>
            <img src={image} alt={name}/>
        </Link>
        </button>
    </div>
    
  )
}

export default CatCard