import {useEffect} from 'react'
import { useParams, useNavigate, useOutletContext } from 'react-router-dom'
import toast, {Toaster} from 'react-hot-toast'



const UserCard = () => {

  const {currentUser, updateCurrentUser, setCurrentUser } = useOutletContext()
  const navigate = useNavigate()
  const { userId } = useParams()

  console.log(currentUser)

  useEffect(() => {
  if(!currentUser){
    fetch("/me")
      .then(resp => {
        if (resp.ok) {
          resp.json().then(user => {
            updateCurrentUser(user)
            return user
          })
        .then((user) => {
          if(user.id !== userId){
          navigate(`/users/${user.id}`)
  }})
        } else {
          toast.error("Please log in")
          navigate('/registration')
          // navigate('/')
        }
      })
    }}, [userId, currentUser, navigate, updateCurrentUser]);
  
  
  if(!currentUser){
    return <p>You must log in first</p>
  }
  const {username, email} = currentUser


  // const handleDeleteUser = () => {
  //   fetch(`/users/${currentUser.id}`, {method: "DELETE"})
  //   .then(toast.success("Delete completed"))
  //   // localStorage.clear()
  //   // sessionStorage.clear()
  // }

  // const handleSubmitForm = ()=> {

  // }

  return (
    <>
    <div>
      <h1>Profile:</h1>
      <h3>Username: {username}</h3>
      <h3>Email: {email}</h3>
    </div>
    <br></br><br></br>
    <div>
        <h3>Update your profile:</h3>
        <form onSubmit={handleSubmitForm}>
          <input></input>
          <button>Submit</button>
        </form>
    </div>
    <br></br>
    <div>
        <h3>Delete your profile:</h3>
        <button onClick={handleDeleteUser}>Delete</button>
    </div>
    </>
  )
}

export default UserCard