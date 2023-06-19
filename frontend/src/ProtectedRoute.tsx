import { Navigate } from "react-router-dom";
import { useAppSelector } from './store/types'

interface ProtectedRouteProps {
  children: JSX.Element
}

const ProtectedRoute = ({children }: ProtectedRouteProps ) => {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)

    if (!isLoggedIn) {
      return <Navigate to="/" replace />;
    }
  
    return children;
  };

  export default ProtectedRoute;