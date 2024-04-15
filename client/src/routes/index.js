import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../components/pages/Home'
import Error from '../components/errors/Error'
import CatForm from '../components/cat/CatForm'
import FosterAdoptForm from '../components/cat/FosterAdoptForm'
import UserCard from '../components/user/UserCard'
import CatDetail from '../components/cat/CatDetail'
import Registration from '../components/Auth/Registration'

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                path: "/",
                index: true,
                element: <Home />
            },
            {
                path: "registration",
                element: <Registration />
            },
            {
                path: "cats/new",
                element: <CatForm />
            },
            {
                path: "cats/:catId",
                element: <CatDetail />
            },
            {
                path: "fosteradopt/new",
                element: <FosterAdoptForm />
            },
            {
                path: "users/:userId",
                element: <UserCard />
            }
        ]
    }
])