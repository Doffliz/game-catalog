import React, { useState } from 'react';
import { useGames } from '../hooks/useGames';
import Header from '../components/Header';
import GameCard from '../components/GameCard';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { games, loading, error } = useGames(searchQuery);

  return (
    <div className="app-container">
      <Header onSearch={setSearchQuery} />
      {loading && <div className="loading">Loading games...</div>}
      {error && <div style={{color: 'red', textAlign: 'center'}}>{error}</div>}
      {!loading && !error && (
        <div className="games-grid">
          {games.map(game => <GameCard key={game.id} game={game} />)}
          {games.length === 0 && <div style={{textAlign: 'center', gridColumn: '1/-1'}}>No games found</div>}
        </div>
      )}
    </div>
  );
};

export default HomePage;