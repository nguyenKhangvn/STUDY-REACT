import { createBrowserRouter, Outlet } from "react-router-dom";
import ErrorPage from "./pages/error";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import Header from "./components/header";
import Footer from "./components/footer";
import ProductPage from "./pages/products";
import Home from "./components/home";
import OrderPage from "./pages/order";
import LayoutAdmin from "./pages/admin";
import ManageUserPage from "./pages/admin/user";
import ManageProductPage from "./pages/admin/product";
import AdminOrderPage from "./pages/admin/order";
import AdminPage from "./pages/admin";

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products",
        element: <ProductPage />,
      },
      {
        path: "order",
        element: <OrderPage />,
      }
    ],
  },
  {
    path: "/admin",
    element: <LayoutAdmin />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true, 
        element:
          
            <AdminPage />
          
      },
      {
        path: "user",
        element:
          
            <ManageUserPage />
          
        ,
      },
      {
        path: "product",
        element:
          
            <ManageProductPage />
          
        ,
      },
      {
        path: "order",
        element:
          
            <AdminOrderPage />
          
        ,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

export default router;
