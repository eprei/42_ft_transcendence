import { Navigate } from "react-router-dom";
import { useAppSelector } from './store/types'


const ProtectedRoute = ({children }: JSX.Element ) => {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)

    if (!isLoggedIn) {
      return <Navigate to="/" replace />;
    }
  
    return children;
  };

  export default ProtectedRoute;