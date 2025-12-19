import axios from "axios";
import LoggerService from "./LoggerService";

const apiKey = process.env.REACT_APP_RAWG_API_KEY;

// через CRA proxy (setupProxy.js має проксити /rawg -> https://api.rawg.io)
const client = axios.create({
  baseURL: "/rawg/api",
  timeout: 15000,
});

function withKey(params = {}) {
  return apiKey ? { ...params, key: apiKey } : params;
}

export async function fetchGames(searchQuery = "", genreId = "") {
  try {
    LoggerService.info("Fetching games (RAWG)", { searchQuery, genreId });

    const response = await client.get("/games", {
      params: withKey({
        page: 1,
        page_size: 24,
        ...(searchQuery ? { search: searchQuery } : {}),
        ...(genreId ? { genres: genreId } : {}), // ✅ ФІЛЬТР ЖАНРУ
      }),
    });

    const results = response?.data?.results ?? [];
    LoggerService.info("Games fetched successfully", { count: results.length });

    return results;
  } catch (error) {
    LoggerService.error("Failed to fetch games", {
      message: error?.message,
      status: error?.response?.status,
    });
    throw error;
  }
}

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
    LoggerService.error("Failed to fetch genres", {
      message: error?.message,
      status: error?.response?.status,
    });
    return [];
  }
}

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
