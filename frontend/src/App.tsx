import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignIn from './pages/SignIn'
import Profile from './pages/Profile'
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

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <SignIn /> },
            {
                path: 'profile',
                element: (
                    <ProtectedRoute>
                        <Profile />
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
                path: 'TFAVerify',
                element: (
                    <ProtectedRoute>
                        <TFAVerify />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'TFATurnOn',
                element: (
                    <ProtectedRoute>
                        <TFATurnOn />
                    </ProtectedRoute>
                ),
            },
        ],
    },
])

function App() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        async function getAuthStatus() {
            try {
                const response = await fetch(
                    'http://localhost:8080/api/auth/status',
                    { credentials: 'include' }
                )
                const data = await response.json()
                console.log('data received: ', data)
                if (data.status === 'success') {
                    dispatch(authActions.login())
                } else {
                    dispatch(authActions.logout())
                }
            } catch (error) {
                console.error('Error fetching data: ', error)
            }
        }
        getAuthStatus()
    }, [dispatch])

    return (
        <div>
            <RouterProvider router={router} />
        </div>
    )
}

export default App
