import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import  { Toaster } from 'react-hot-toast';
import {  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { restoreAuth, selectAuthStatus} from "./store/authSlice";

function App() {
  const authStatus = useSelector(selectAuthStatus);

   const dispatch = useDispatch();
  useEffect(() => {
    dispatch(restoreAuth());
  }, [dispatch]);

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
