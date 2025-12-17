// src/services/StorageService.js
const KEY = "favorites_games";

function read() {
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}

function write(items) {
  localStorage.setItem(KEY, JSON.stringify(items));
}

const StorageService = {
  getFavorites() {
    return read();
  },

  isFavorite(gameId) {
    return read().some((g) => g.id === gameId);
  },

  addFavorite(game) {
    const list = read();
    if (!list.some((g) => g.id === game.id)) {
      write([game, ...list]);
    }
  },

  removeFavorite(gameId) {
    const list = read().filter((g) => g.id !== gameId);
    write(list);
  },
};

export default StorageService;
