import { createBrowserRouter, Outlet } from "react-router-dom";
import ErrorPage from "./pages/error";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import Header from "./components/header/header";
import Footer from "./components/footer";
import Home from "./components/home";
import StockList from "./components/stock/stock-list/stock-list";

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
        path: "stock-list",
        element: <StockList />,
      }
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
