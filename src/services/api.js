import axios from "axios";
import LoggerService from "./LoggerService";

// API ключ з .env (REACT_APP_RAWG_API_KEY)
const apiKey = process.env.REACT_APP_RAWG_API_KEY;

const client = axios.create({
  baseURL: "/rawg/api",
  timeout: 15000,
});

// Додає key=... до параметрів, якщо ключ існує
function withKey(params = {}) {
  return apiKey ? { ...params, key: apiKey } : params;
}

// Отримання списку ігор (пошук + фільтр за жанром)
export async function fetchGames(searchQuery = "", genreId = "") {
  try {
    LoggerService.info("Fetching games (RAWG)", { searchQuery, genreId });

    const response = await client.get("/games", {
      params: withKey({
        page: 1,
        page_size: 24,
        ...(searchQuery ? { search: searchQuery } : {}),
        ...(genreId ? { genres: genreId } : {}),
      }),
    });

    const results = response?.data?.results ?? [];
    LoggerService.info("Games fetched successfully", { count: results.length });

    return results;
  } catch (error) {
    // Логуємо помилку і пробросуємо далі (щоб UI показав помилку/стан)
    LoggerService.error("Failed to fetch games", {
      message: error?.message,
      status: error?.response?.status,
    });
    throw error;
  }
}

// Отримання списку жанрів
export async function fetchGenres() {
  try {
    LoggerService.info("Fetching genres (RAWG)");

    const response = await client.get("/genres", {
      params: withKey({ page_size: 50 }),
    });

    const genres = response?.data?.results ?? [];
    LoggerService.info("Genres fetched successfully", { count: genres.length });

    return genres;
  } catch (error) {
    // Тут повертаємо [], щоб UI міг продовжити роботу навіть без жанрів
    LoggerService.error("Failed to fetch genres", {
      message: error?.message,
      status: error?.response?.status,
    });
    return [];
  }
}

// Детальна інформація про гру
export async function fetchGameDetails(id) {
  try {
    LoggerService.info("Fetching game details (RAWG)", { id });

    const response = await client.get(`/games/${id}`, {
      params: withKey(),
    });

    LoggerService.info("Game details fetched successfully", {
      id,
      name: response?.data?.name,
    });

    return response.data;
  } catch (error) {
    LoggerService.error("Failed to fetch game details", {
      id,
      message: error?.message,
      status: error?.response?.status,
    });
    throw error;
  }
}

// Скріншоти гри
export async function fetchGameScreenshots(id) {
  try {
    LoggerService.info("Fetching screenshots (RAWG)", { id });

    const response = await client.get(`/games/${id}/screenshots`, {
      params: withKey({ page: 1, page_size: 12 }),
    });

    const shots = response?.data?.results ?? [];
    LoggerService.info("Screenshots fetched successfully", { id, count: shots.length });

    return shots;
  } catch (error) {
    
    LoggerService.error("Failed to fetch screenshots", {
      id,
      message: error?.message,
      status: error?.response?.status,
    });
    return [];
  }
}
