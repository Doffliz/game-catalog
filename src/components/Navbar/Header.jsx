import React from "react";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";

// Базовий стиль для навігаційних посилань
const linkStyle = {
  textDecoration: "none",
  color: "#fff",
  fontWeight: 500,
};

// Стиль активного пункту меню
const activeLinkStyle = {
  ...linkStyle,
  borderBottom: "2px solid #61dafb",
};

export default function Header({ onSearch }) {
  const location = useLocation();

  // Перевірка активного маршруту
  const isActive = (path) => location.pathname === path;

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 24px",
        backgroundColor: "#121212",
        borderBottom: "1px solid #222",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Ліва частина: логотип і навігація */}
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <Link to="/" style={{ ...linkStyle, fontSize: 18 }}>
          <b>GameStore</b>
        </Link>

        <nav style={{ display: "flex", gap: 16 }}>
          <Link
            to="/"
            style={isActive("/") ? activeLinkStyle : linkStyle}
          >
            Головна
          </Link>
          <Link
            to="/favorites"
            style={isActive("/favorites") ? activeLinkStyle : linkStyle}
          >
            Обране
          </Link>
        </nav>
      </div>

      {/* Права частина: пошук */}
      <div style={{ minWidth: 260 }}>
        <SearchBar onSearch={onSearch} />
      </div>
    </header>
  );
}
