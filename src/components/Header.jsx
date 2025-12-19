import React from "react";
import { NavLink } from "react-router-dom";

const Header = ({
  onSearch,
  genres = [],
  selectedGenre,
  onGenreChange,
}) => {
  return (
    <header className="header">
      <div className="header-left">
        {/* якщо ти використовуєш лого через public/logo.png */}
        <NavLink to="/" className="logo">
          <img src="/logo.jpg" alt="PlayCore" className="logo-img" />
        </NavLink>

        <nav className="nav">
          <NavLink to="/" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            Головна
          </NavLink>
          <NavLink to="/favorites" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            Обране
          </NavLink>
        </nav>
      </div>

      <div className="header-right">
        <select
          className="genre-select"
          value={selectedGenre}
          onChange={(e) => onGenreChange(e.target.value)}
        >
          <option value="">Усі жанри</option>
          {genres.map((g) => (
            <option key={g.id} value={String(g.id)}>
              {g.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Пошук ігор..."
          className="search-input"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </header>
  );
};

export default Header;
