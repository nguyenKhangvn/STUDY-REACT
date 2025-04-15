import { createBrowserRouter, Outlet } from "react-router-dom";
import ErrorPage from "./pages/error";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import Header from "./components/header/header";
import Footer from "./components/footer";
import Home from "./components/home";
import StockList from "./components/stock/stock-list/stock-list";


const Layout = ({ user, logout }) => (
  <>
    <Header user={user} logout={logout} />
    <Outlet />
    <Footer />
  </>
);

const createRouter = ({ user, setUser, logout }) =>
  createBrowserRouter([
    {
      path: "/",
      element: <Layout user={user} logout={logout} />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Home /> },
        { path: "stock-list", element: <StockList /> },
      ],
    },
    {
      path: "/login",
      element: <LoginPage setUser={setUser} />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
  ]);

export default createRouter;