import { Outlet } from 'react-router-dom'
import Navbar from './components/navigation/Navbar'
import { authActions } from './store/auth'
import { userActions } from './store/user'
import { useAppDispatch } from './store/types'
import { UserData } from './types/UserData'
import { useLoaderData } from 'react-router-dom'

interface dataStatus {
    status: string
}

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
    async function checkStatus(data: dataStatus) {
        if (data.status === 'isLogged') {
            const user = await getUserData()
            dispatch(userActions.update({ user: user }))
            dispatch(authActions.login())
        } else if (data.status === 'need2fa') {
            dispatch(authActions.setNeed2fa())
        } else {
            dispatch(authActions.logout())
        }
    }
    const dispatch = useAppDispatch()
    const data = useLoaderData() as dataStatus
    console.log('data received: ', data)
    checkStatus(data)

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
    const response = await fetch('http://localhost:8080/api/auth/loginStatus', {
        credentials: 'include',
    })
    if (response.status !== 200) {
        throw new Response(JSON.stringify({ message: 'Error fetching data' }))
    }
    const data = await response.json()
    return data
}
