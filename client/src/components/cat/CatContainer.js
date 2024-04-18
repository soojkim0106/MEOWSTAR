import { useState, useEffect } from 'react'
import CatCard from './CatCard'
import { useOutletContext } from 'react-router-dom'


const CatContainer = () => {
    // const [cats, setCats] = useState([])
    const { cats } = useOutletContext()

  return (
    <div>
        <p></p>
        {cats.map((cat => (<CatCard key={cat.id} cat={cat}/>)))}
    </div>
  )
}

export default CatContainer