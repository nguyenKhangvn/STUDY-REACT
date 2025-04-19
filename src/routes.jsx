import { createBrowserRouter, Outlet } from "react-router-dom";
import ErrorPage from "./pages/error";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import Header from "./components/header/header";
import Footer from "./components/footer";
import Home from "./components/home";
import StockList from "./components/stock/stock-list/stock-list";
import StockListView from "./components/stock/stock-list-view/stock-list-view";
import StockDetail from "./components/stock/stock-details/stock-details";

const Layout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);

const createRouter = ({ user, setUser }) =>
  createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Home /> },
        { path: "stock-list", element: <StockList /> },
        { path: "stock-list-view", element: <StockListView /> },
        { path: "stock-detail/:id", element: <StockDetail /> },
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
