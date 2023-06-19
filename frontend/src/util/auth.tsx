import { json } from '../../node_modules/react-router-dom/dist/index'
import { useAppSelector } from '../store/types'

const checkAuthLoader = () => {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
    console.log(isLoggedIn)
    if (!isLoggedIn) {
        throw json(
            { message: 'You are not authorized to visit this page' },
            { status: 401 }
        )
    }
    return null
}

export default checkAuthLoader
