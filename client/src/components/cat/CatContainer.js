import { useState, useEffect } from 'react'
import CatCard from './CatCard'
import { useOutletContext } from 'react-router-dom'


const CatContainer = () => {
    // const [cats, setCats] = useState([])
    const { cats } = useOutletContext()

    // useEffect(() => {
    //     fetch('/cats')
    //         .then((resp) => resp.json())
    //         .then((data) => setCats(data))
    //         .catch((error) => console.log("Error fetching cats", error))
    // }, []);

  return (
    <div>
        <p>Cat Container: </p>
        {cats.map((cat => (<CatCard key={cat.id} cat={cat}/>)))}
    </div>
  )
}

export default CatContainer