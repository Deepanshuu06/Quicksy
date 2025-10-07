import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import OrderManagement from "./pages/OrderManagement.jsx";
import Inventory from "./pages/Inventory.jsx";
import store from "./store/store.js";
import { Provider } from "react-redux";
import PrivateRoute from "./route/PrivateRoute.jsx";

import Home from "./pages/Home.jsx";
import OrderDetails from "./pages/OrderDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            {" "}
            <Dashboard />{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "/order-management",
        element: (
          <PrivateRoute>
            {" "}
            <OrderManagement />{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "/inventory",
        element: (
          <PrivateRoute>
            {" "}
            <Inventory />{" "}
          </PrivateRoute>
        ),
      },
      {
        path:"/order/:orderId",
        element: (
          <PrivateRoute>
            <OrderDetails />
          </PrivateRoute>
        ),
      }
    ],
  },
  
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
