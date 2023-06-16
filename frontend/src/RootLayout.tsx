import { Outlet } from 'react-router-dom'
import Navbar from './components/navigation/Navbar'

const RootLayout = () => {
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
