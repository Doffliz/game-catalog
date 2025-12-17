import React from 'react';

const Header = ({ onSearch }) => {
  return (
    <header className="header">
      <h1>🎮 GameCatalog</h1>
      <input 
        type="text" 
        placeholder="Search games..." 
        className="search-input"
        onChange={(e) => onSearch(e.target.value)}
      />
    </header>
  );
};

export default Header;