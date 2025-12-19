import StorageService from "./StorageService";

// Перед кожним тестом очищаємо localStorage
beforeEach(() => {
  localStorage.clear();
});

// Тест додавання та видалення ігор із списку обраного
test("adds and removes favorites", () => {
  // Додаємо гру в обране
  StorageService.addFavorite({ id: 10, name: "Test Game" });
  expect(StorageService.getFavorites().length).toBe(1);

  // Видаляємо гру з обраного
  StorageService.removeFavorite(10);
  expect(StorageService.getFavorites().length).toBe(0);
});
