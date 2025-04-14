import React, { useState } from "react";
import { Link } from "react-router-dom";
import CreateStockDialog from "../stock/create-stock/create-stock";
import "./Header.css";

const Header = ({ toggleSidebar, user, logout }) => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);

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
            <li><Link to="/stock-list">Stock List</Link></li>
            {true && (
              <li><button onClick={() => setShowCreateDialog(true)}>Create Stock</button></li>
            )}
            {!user && <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>}
            {user && <li><button onClick={logout}>Logout ({user.name})</button></li>}
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
