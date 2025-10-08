import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import  { Toaster } from 'react-hot-toast';
import {  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { restoreAuth, selectAuthStatus, selectIsAuthenticated} from "./store/authSlice";

function App() {
  const authStatus = useSelector(selectAuthStatus);
  const isAuthenticated = useSelector(selectIsAuthenticated)

   const dispatch = useDispatch();
  useEffect(() => {
    dispatch(restoreAuth());
  }, [dispatch , isAuthenticated]);
  
   if (authStatus === "loading" || authStatus === "idle") {
    return <div>Loading app...</div>; // Optional loading screen
  }

  return (
    <div className="App">
      <Navbar />
      <Outlet />
      <Toaster />
    </div>
     
  );
}

export default App;
