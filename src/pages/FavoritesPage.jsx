import React from 'react';
import { useNavigate } from 'react-router-dom';
import GameCard from '../components/GameCard';
import StorageService from '../services/StorageService';

const FavoritesPage = () => {
  const navigate = useNavigate();
  const favorites = StorageService.getFavorites();

  return (
    <div className="page">
      <div className="page-header">
        <button className="btn-back" onClick={() => navigate('/')}>
          ← Назад
        </button>
        <h2>⭐ УЛЮБЛЕНІ ІГРИ</h2>
      </div>

      {favorites.length === 0 ? (
        <p className="empty-text">ПОКИ ПУСТО</p>
      ) : (
        <div className="games-grid">
          {favorites.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
