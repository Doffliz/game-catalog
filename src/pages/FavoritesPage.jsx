import React from "react";
import { useNavigate } from "react-router-dom";
import GameCard from "../components/GameCard";
import StorageService from "../services/StorageService";

// Сторінка зі списком обраних ігор
const FavoritesPage = () => {
  // Хук для програмної навігації
  const navigate = useNavigate();

  // Отримання списку обраних ігор з localStorage
  const favorites = StorageService.getFavorites();

  return (
    <div className="page">
      <div className="page-header">
        {/* Кнопка повернення на головну сторінку */}
        <button className="btn-back" onClick={() => navigate("/")}>
          ← Назад
        </button>
        <h2>⭐ УЛЮБЛЕНІ ІГРИ</h2>
      </div>

      {/* Якщо список порожній показуємо повідомлення */}
      {favorites.length === 0 ? (
        <p className="empty-text">ПОКИ ПУСТО</p>
      ) : (
        // Відображення списку обраних ігор
        <div className="games-grid">
          {favorites.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
