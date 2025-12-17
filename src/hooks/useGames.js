// src/hooks/useGames.js
import { useEffect, useState, useCallback } from "react";
import { fetchGames } from "../services/api";
import Logger from "../services/LoggerService";

export default function useGames() {
  const [query, setQuery] = useState("");
  const [games, setGames] = useState([]);
  const [status, setStatus] = useState("idle"); // idle|loading|success|error
  const [error, setError] = useState(null);

  const load = useCallback(async (q) => {
    setStatus("loading");
    setError(null);
    try {
      const data = await fetchGames({ search: q });
      setGames(data?.results ?? []);
      setStatus("success");
      Logger.info("Games loaded", { query: q, count: data?.results?.length ?? 0 });
    } catch (e) {
      setStatus("error");
      setError(e);
      Logger.error("Games load error", { query: q, message: e?.message });
    }
  }, []);

  // первинне завантаження
  useEffect(() => {
    load("");
  }, [load]);

  const onSearch = (q) => {
    setQuery(q);
    load(q);
  };

  return { query, games, status, error, onSearch };
}
