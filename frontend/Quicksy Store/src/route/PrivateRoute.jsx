import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const {isAuthenticated, loading} = useSelector(state => state.auth);
    if(loading){
        return <div>Loading...</div>
    }
      if (!isAuthenticated) return <Navigate to="/login" />;

      return children;
}

export default PrivateRoute;