import React from "react";
import useGames from "../hooks/useGames";
import GameCard from "../components/GameCard";

const HomePage = ({ searchQuery, genreId }) => {
  const { games, loading, error } = useGames(searchQuery, genreId);

  return (
    <div className="app-container">
      {loading && <div className="loading">Завантаження ігор...</div>}
      {error && <div style={{ color: "red", textAlign: "center" }}>{error}</div>}

      {!loading && !error && (
        <div className="games-grid">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
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
