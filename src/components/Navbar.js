//styles
import "./Navbar.css";
import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "./hooks/useTheme";
import { useLogout } from "./hooks/useLogout";
import { useAuthContext } from "./hooks/useAuthContext";
// import { useContext } from "react";
// components
import Searchbar from "./Searchbar";
// import { ThemeContext } from "../context/ThemeContext";

export default function Navbar() {
  const { logout } = useLogout();
  const { color } = useTheme();
  const { user } = useAuthContext();

  return (
    <div className="navbar" style={{ background: color }}>
      <nav>
        <Link to="/" className="brand">
          <h1>Фонди </h1>
        </Link>
        <Searchbar />
        {!user && (
          <>
            <Link to="/login" className="login">
              Вхід
            </Link>
            {/* <Link to="/signup" className="logout">
              Реєстрація
            </Link> */}
          </>
        )}

        {user && (
          <div className="logout_section">
            <li>Привіт, {user.displayName}!</li>
            <li>
              <button className="btn" onClick={logout}>
                Вийти
              </button>
            </li>
          </div>
        )}
        <Link to="/create">Додати новий предмет</Link>
      </nav>
    </div>
  );
}
