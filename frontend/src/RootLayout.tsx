import { Outlet } from 'react-router-dom'
import Navbar from './components/navigation/Navbar'
import { authActions } from './store/auth'
import { useAppDispatch } from './store/types'
import { UserData } from './types/UserData'
import { useLoaderData } from 'react-router-dom'




async function getUserData() {
    const response = await fetch(`http://localhost:8080/api/user/me`, {
        method: 'GET',
        credentials: 'include',
    })

    if (response.status !== 200) {
        throw new Response(
            JSON.stringify({ message: 'Error fetching user data' })
        )
    }

    const data = (await response.json()) as UserData
    return data
}


const RootLayout = () => {
    const dispatch = useAppDispatch()
    const data = useLoaderData()
    console.log('data received: ', data)
    if (data.status === 'isLogged') {
        const userData = await getUserData()
        dispatch(authActions.login())
    } else if (data.status === 'need2fa') {
        dispatch(authActions.setNeed2fa())
    } else {
        dispatch(authActions.logout())
    }

    return (
        <>
            <Navbar></Navbar>
            <main>
                <Outlet></Outlet>
            </main>
        </>
    )
}

export default RootLayout

export async function loader() {
    const response = await fetch(
        'http://localhost:8080/api/auth/loginStatus',
        { credentials: 'include' }
    )
    if (response.status !== 200) {
        throw new Response(
            JSON.stringify({ message: 'Error fetching data' })
        )
    }
    const data = await response.json()
    return data
}
