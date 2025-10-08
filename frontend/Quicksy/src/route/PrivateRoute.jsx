import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsAuthenticated, selectAuthStatus } from "../store/authSlice";

export default function PrivateRoute({ children }) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const authStatus = useSelector(selectAuthStatus);

  console.log("PrivateRoute - isAuthenticated:", isAuthenticated);
    console.log("PrivateRoute - authStatus:", authStatus);


  if (authStatus === "loading" && authStatus === "idle") {
    return <div>Loading...</div>; // Or your spinner component
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
