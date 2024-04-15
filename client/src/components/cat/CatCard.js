import React from 'react'
import {Link} from 'react-router-dom'

const CatCard = ({cat}) => {
  const {id, name, image} = cat
  console.log(cat)
  return (
    <div>
        <button>
        <Link to={`/cats/${id}`}>
            <h3>{name}</h3>
            <img src={image} alt={name}/>
        </Link>
        </button>
    </div>
    
  )
}

export default CatCard