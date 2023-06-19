import { redirect } from '../../node_modules/react-router-dom/dist/index'
import { useAppSelector } from '../store/types'

export function checkAuthLoader() {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
    if (!isLoggedIn) {
        return redirect('/')
    }
}
