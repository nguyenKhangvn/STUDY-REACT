import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreateStockDialog from "../stock/create-stock/create-stock";
import "./Header.css";

const Header = ({ toggleSidebar }) => {
  const [user, setUser] = useState(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };
  return (
    <div className="header-container">
      <div className="header-content">
        <nav className="nav-bar">
          <ul className="sidebar-toggle">
            <li>
              <button onClick={toggleSidebar}>
                <i className="material-icons">menu</i>
              </button>
            </li>
          </ul>

          <ul>
            <h1>Welcome to Stock Market</h1>
          </ul>

          <ul className="nav-links">
            <li>
              <Link to="/stock-list">Stock List</Link>
            </li>
            {user && user.role === 1 && (
              <>
                <li>
                  <button
                    className="nav-button"
                    onClick={() => setShowCreateDialog(true)}
                  >
                    Create Stock
                  </button>
                </li>
              </>
            )}
            {!user && (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
            {user && (
              <li>
                <button className="nav-button" onClick={handleLogout}>
                  Logout ({user.username})
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>

      {showCreateDialog && (
        <CreateStockDialog onClose={() => setShowCreateDialog(false)} />
      )}
    </div>
  );
};

export default Header;
