import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignIn from './pages/SignIn'
import MainProfile, { loader as ProfileLoader } from './pages/MainProfile'
import MatchHistory from './pages/MatchHistory'
import GameLauncher from './pages/GameLauncher'
import Game from './pages/Game'
import Chat from './pages/Chat'
import RootLayout from './RootLayout'
import ErrorPage from './components/error/Error'
import ProtectedRoute from './ProtectedRoute'
import { authActions } from './store/auth'
import { useEffect } from 'react'
import { useAppDispatch } from './store/types'
import TFAVerify from './pages/TFAAuthenticate'
import TFATurnOn from './pages/TFATurnOn'
import UserLambda from './pages/UserLambda'
import ProtectedSignIn from './ProtectedSignIn'

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: (
                    <ProtectedSignIn>
                        <SignIn />
                    </ProtectedSignIn>
                ),
            },
            {
                path: 'profile',
                loader: ProfileLoader,
                element: (
                    <ProtectedRoute>
                        <MainProfile />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'history',
                element: (
                    <ProtectedRoute>
                        <MatchHistory />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'launcher',
                element: (
                    <ProtectedRoute>
                        <GameLauncher />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'game',
                element: (
                    <ProtectedRoute>
                        <Game />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'chat',
                element: (
                    <ProtectedRoute>
                        <Chat />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'TFATurnOn',
                element: <TFATurnOn />,
            },
            {
                path: 'user/:nickname',
                element: (
                    <ProtectedRoute>
                        <UserLambda />
                    </ProtectedRoute>
                ),
            },
        ],
    },
    {
        path: 'TFAVerify',
        element: <TFAVerify />,
    },
])

function App() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        async function getAuthStatus() {
            try {
                const response = await fetch(
                    'http://localhost:8080/api/auth/loginStatus',
                    { credentials: 'include' }
                )
                const data = await response.json()
                console.log('data received: ', data)
                if (data.status === 'isLogged') {
                    console.log('app.tsx: is logged')
                    dispatch(authActions.login())
                } else if (data.status === 'need2fa') {
                    console.log('app.tsx: is need2fa')
                    dispatch(authActions.setNeed2fa())
                } else {
                    console.log('app.tsx: not logged')
                    dispatch(authActions.logout())
                }
            } catch (error) {
                console.error('Error fetching data: ', error)
            }
        }
        getAuthStatus()
    }, [dispatch])

    return <RouterProvider router={router} />
}

export default App
