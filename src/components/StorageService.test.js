import StorageService from "./StorageService";

beforeEach(() => {
  localStorage.clear();
});

test("adds and removes favorites", () => {
  StorageService.addFavorite({ id: 10, name: "Test Game" });
  expect(StorageService.getFavorites().length).toBe(1);

  StorageService.removeFavorite(10);
  expect(StorageService.getFavorites().length).toBe(0);
});
