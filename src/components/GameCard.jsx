import React from "react";
import { useNavigate } from "react-router-dom";

const GameCard = ({ game }) => {
  const navigate = useNavigate();

  return (
    <div className="game-card" onClick={() => navigate(`/games/${game.id}`)}>
      <img
        src={game.background_image}
        alt={game.name}
        loading="lazy"
      />

      <div className="game-card-content">
        <h3 className="game-card-title">{game.name}</h3>
        <div className="game-card-meta">
          ⭐ {game.rating} · {game.released}
        </div>
      </div>
    </div>
  );
};

export default GameCard;
