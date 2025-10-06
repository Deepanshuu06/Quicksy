import React, { useEffect } from "react";
import { Outlet } from "react-router";

import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { checkAuth } from "./store/authSlice";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <div>
      <Outlet />
      <Toaster />
    </div>
  );
};

export default App;
