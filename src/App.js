import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = 'c542e67aec3a4340908f9de9e86038af';
const BASE_URL = 'https://api.rawg.io/api';

function App() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchGames = async (query = '') => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/games`, {
        params: {
          key: API_KEY,
          page_size: 20,
          search: query
        }
      });
      setGames(response.data.results);
    } catch (err) {
      console.error("API Error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    const timeoutId = setTimeout(() => {
      fetchGames(value);
    }, 800);

    return () => clearTimeout(timeoutId);
  };

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <h1 style={styles.logo}>🎮 GameStore</h1>
        <input
          style={styles.search}
          placeholder="Пошук ігор..."
          value={search}
          onChange={handleSearch}
        />
      </header>

      {loading ? (
        <div style={styles.loading}>Завантаження...</div>
      ) : (
        <div style={styles.grid}>
          {games.map(game => (
            <div key={game.id} style={styles.card}>
              <img
                src={game.background_image}
                alt={game.name}
                style={styles.img}
              />
              <div style={styles.info}>
                <h3 style={styles.title}>{game.name}</h3>
                <p style={styles.meta}>
                  ⭐ {game.rating} | {game.released}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  app: {
    backgroundColor: '#151515',
    minHeight: '100vh',
    padding: '20px',
    color: 'white',
    fontFamily: 'Arial, sans-serif'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    borderBottom: '1px solid #333',
    paddingBottom: '20px'
  },
  logo: {
    fontSize: '28px'
  },
  search: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '6px',
    border: 'none',
    outline: 'none'
  },
  loading: {
    textAlign: 'center',
    fontSize: '20px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '20px'
  },
  card: {
    backgroundColor: '#222',
    borderRadius: '10px',
    overflow: 'hidden'
  },
  img: {
    width: '100%',
    height: '140px',
    objectFit: 'cover'
  },
  info: {
    padding: '10px'
  },
  title: {
    margin: '0 0 5px 0'
  },
  meta: {
    fontSize: '14px',
    color: '#aaa'
  }
};

export default App;
