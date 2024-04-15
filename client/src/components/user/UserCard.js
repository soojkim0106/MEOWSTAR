import {useEffect} from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import toast, {Toaster} from 'react-hot-toast'



const UserCard = () => {

  const {updateCurrentUser} = useOutletContext()
  const navigate = useNavigate()


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
    <div>UserCard</div>
  )
}

export default UserCard