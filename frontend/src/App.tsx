import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Welcome from './pages/Welcome'
import SignIn from './pages/SignIn'
import Profile from './pages/Profile'
import MatchHistory from './pages/MatchHistory'
import GameLauncher from './pages/GameLauncher'
import Game from './pages/Game'
import Chat from './pages/Chat'
import RootLayout from './RootLayout'

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            { index: true, element: <Welcome /> },
            { path: '/signin', element: <SignIn /> },
            { path: '/profile', element: <Profile /> },
            { path: '/history', element: <MatchHistory /> },
            { path: '/launcher', element: <GameLauncher /> },
            { path: '/game', element: <Game /> },
            { path: '/chat', element: <Chat /> },
        ],
    },
])

function App() {
    return (
        <div>
            <RouterProvider router={router} />
        </div>
    )
}

export default App
