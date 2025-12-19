import { useEffect, useState } from "react";
import { fetchGames } from "../services/api";

export default function useGames(searchQuery, genreId) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        setError("");

        const data = await fetchGames(searchQuery, genreId);
        if (mounted) setGames(data);
      } catch (e) {
        if (mounted) setError(e?.message || "Failed to load games");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [searchQuery, genreId]);

  return { games, loading, error };
}
