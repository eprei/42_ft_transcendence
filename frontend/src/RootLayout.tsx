import { Outlet } from 'react-router-dom'
import Navbar from './components/navigation/Navbar'
import { authActions } from './store/auth'
import { useAppDispatch } from './store/types'
import { useLoaderData } from 'react-router-dom'

interface dataStatus {
    status: string
}

const RootLayout = () => {
    async function checkStatus(data: dataStatus) {
        if (data.status === 'isLogged') {
            dispatch(authActions.login())
        } else if (data.status === 'need2fa') {
            dispatch(authActions.setNeed2fa())
        } else {
            dispatch(authActions.logout())
        }
    }
    const dispatch = useAppDispatch()
    const data = useLoaderData() as dataStatus
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
