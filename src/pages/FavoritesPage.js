import React, { useState, useEffect } from 'react';
import { StorageService } from '../services/StorageService';
import GameCard from '../components/GameCard';

const FavoritesPage = ({ onBack }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(StorageService.getFavorites());
  }, []);

  return (
    <div className="app-container">
       <header className="header" style={{display: 'flex', gap: '20px'}}>
        <button onClick={onBack} style={{padding: '5px 15px', cursor: 'pointer'}}>← Back</button>
        <h1>★ My Favorite Games</h1>
      </header>
      {favorites.length === 0 ? (
        <div style={{textAlign: 'center', marginTop: '50px', color: '#888'}}>Empty list.</div>
      ) : (
        <div className="games-grid">
          {favorites.map(game => <GameCard key={game.id} game={game} />)}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;