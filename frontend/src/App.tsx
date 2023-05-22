import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Welcome from './pages/Wecome'
import SignIn from './pages/SignIn'
import Profile from './pages/Profile'
import MatchHistory from './pages/MatchHistory'
import GameLauncher from './pages/GameLauncher'
import Game from './pages/Game'
import Chat from './pages/Chat'

const router = createBrowserRouter([
    { path: '/', element: <Welcome /> },
    { path: '/signin', element: <SignIn /> },
    { path: '/profile', element: <Profile /> },
    { path: '/history', element: <MatchHistory /> },
    { path: '/launcher', element: <GameLauncher /> },
    { path: '/game', element: <Game /> },
    { path: '/chat', element: <Chat /> },
])

function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default App
