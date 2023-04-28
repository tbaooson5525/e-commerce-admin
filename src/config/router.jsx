import { createBrowserRouter, Link } from "react-router-dom";
import RootLayout from "../modules/common/layouts/RootLayout";
import Dashboard from "../modules/dashboard/pages/Dashboard";
import ProductListing from "../modules/product/pages/ProductListing";
import ProductDetail from "../modules/product/pages/ProductDetail";
import ProductAdd from "../modules/product/pages/ProductAdd";
import ErrorPage from "../modules/product/pages/ErrorPage";
import Login from "../auth/pages/Login";
import AuthProvider from "../auth/context/AuthProvider";
import UserListing from "../modules/user/pages/UserListing";

const router = createBrowserRouter([
  {
    element: <AuthProvider/>,
    children: [
      {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage/>,
        children: [{
          index: true, // path: ""
          element: <Dashboard />
        },
        {
          path: "products",
          element: <ProductListing />
        },
        {
          path: "products/:productId",
          element: <ProductDetail/>
        },
        {
          path: "products/new",
          element: <ProductAdd/>
        },
        {
          path: "/users",
          element: <UserListing/>
        }
      ]
      },
      {
        path: "/login",
        element: <Login/>
      }
    ]
  },
]);

export default router;
