import React from "react";
import { NavLink } from "react-router-dom";

// компонент верхньої панелі (хедера)
const Header = ({
  onSearch,          // обробник пошуку
  genres = [],       // список жанрів
  selectedGenre,     // обраний жанр
  onGenreChange,     // обробник зміни жанру
}) => {
  return (
    <header className="header">
      {/* ліва частина: логотип і навігація */}
      <div className="header-left">
        <NavLink to="/" className="logo">
          <img src="/logo.jpg" alt="PlayCore" className="logo-img" />
        </NavLink>

        <nav className="nav">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Головна
          </NavLink>

          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Обране
          </NavLink>
        </nav>
      </div>

      {/* права частина: фільтр і пошук */}
      <div className="header-right">
        {/* вибір жанру */}
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

        {/* поле з пошуком */}
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
