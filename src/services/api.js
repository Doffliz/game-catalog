// src/services/api.js
import axios from "axios";
import Logger from "./LoggerService";

const apiKey = process.env.REACT_APP_RAWG_KEY;

const client = axios.create({
  baseURL: "https://api.rawg.io/api",
  timeout: 15000,
});

function withKey(params = {}) {
  if (!apiKey) {
    Logger.warn("RAWG key is missing. Add REACT_APP_RAWG_KEY to .env");
  }
  return { key: apiKey, ...params };
}

export async function fetchGames({ search = "", page = 1, pageSize = 20 } = {}) {
  try {
    const res = await client.get("/games", {
      params: withKey({
        search,
        page,
        page_size: pageSize,
        ordering: "-rating",
      }),
    });
    return res.data;
  } catch (err) {
    Logger.error("fetchGames failed", { message: err?.message });
    throw err;
  }
}

export async function fetchGameById(id) {
  try {
    const res = await client.get(`/games/${id}`, {
      params: withKey(),
    });
    return res.data;
  } catch (err) {
    Logger.error("fetchGameById failed", { id, message: err?.message });
    throw err;
  }
}
