import React from "react";
import { useNavigate } from "react-router-dom";

// компонент картки гри
const GameCard = ({ game }) => {
  const navigate = useNavigate();

  return (
    // клік по картці відкриває сторінку з деталями гри
    <div
      className="game-card"
      onClick={() => navigate(`/games/${game.id}`)}
    >
      {/* обкладинка гри */}
      <img
        src={game.background_image}
        alt={game.name}
        loading="lazy"
      />

      {/* основна інформація */}
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
