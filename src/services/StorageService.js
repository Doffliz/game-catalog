// Ключ для збереження обраних ігор у localStorage
const KEY = "favorites_games";

// Зчитування списку обраних ігор
function read() {
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}

// Запис списку обраних ігор
function write(items) {
  localStorage.setItem(KEY, JSON.stringify(items));
}

// Сервіс для роботи з обраними іграми
const StorageService = {
  // Отримати всі обрані ігри
  getFavorites() {
    return read();
  },

  // Перевірка, чи гра є в обраних
  isFavorite(gameId) {
    return read().some((g) => g.id === gameId);
  },

  // Додати гру до обраних
  addFavorite(game) {
    const list = read();
    if (!list.some((g) => g.id === game.id)) {
      write([game, ...list]);
    }
  },

  // Видалити гру з обрних
  removeFavorite(gameId) {
    const list = read().filter((g) => g.id !== gameId);
    write(list);
  },
};

export default StorageService;
