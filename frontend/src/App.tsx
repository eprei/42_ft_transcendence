import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Welcome from './pages/Welcome'
import SignIn from './pages/SignIn'
import Profile from './pages/Profile'
import MatchHistory from './pages/MatchHistory'
import GameLauncher from './pages/GameLauncher'
import Game from './pages/Game'
import Chat from './pages/Chat'
import RootLayout from './RootLayout'
import TempLogin from './pages/TempLogin'
import ErrorPage from './components/error/Error'
import checkAuthLoader from './util/auth'

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Welcome /> },
            { path: 'signin', element: <SignIn /> },
            { path: 'profile', element: <Profile />, loader: checkAuthLoader },
            {
                path: 'history',
                element: <MatchHistory />,
                loader: checkAuthLoader,
            },
            {
                path: 'launcher',
                element: <GameLauncher />,
                loader: checkAuthLoader,
            },
            { path: 'game', element: <Game />, loader: checkAuthLoader },
            { path: 'chat', element: <Chat />, loader: checkAuthLoader },
            { path: 'tmp', element: <TempLogin /> },
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
