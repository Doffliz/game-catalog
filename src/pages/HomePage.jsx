import React from "react";
import useGames from "../hooks/useGames";
import GameCard from "../components/GameCard";

// головна сторінка (список ігор)
const HomePage = ({ searchQuery, genreId }) => {
  // Отримуємо дані з кастомного хука (завантаження, помилка, список ігор)
  const { games, loading, error } = useGames(searchQuery, genreId);

  return (
    <div className="app-container">
      {/* Стан завантаження */}
      {loading && <div className="loading">Завантаження ігор...</div>}

      {/* Стан помилки */}
      {error && <div style={{ color: "red", textAlign: "center" }}>{error}</div>}

      {/* Відображення списку ігор (коли немає loading/error */}
      {!loading && !error && (
        <div className="games-grid">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}

          {/* Якщо API повернуло порожній список */}
          {games.length === 0 && (
            <div style={{ textAlign: "center", gridColumn: "1/-1" }}>
              Нічого не знайдено
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
