import { useEffect, useState } from "react";
import { fetchGames } from "../services/api";

// кастомний хук для завантаження списку ігор
export default function useGames(searchQuery, genreId) {
  // стан списку ігор
  const [games, setGames] = useState([]);
  // стан завантаження
  const [loading, setLoading] = useState(false);
  // стан помилки
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    // асинхронне завантаження даних
    (async () => {
      try {
        setLoading(true);
        setError("");

        const data = await fetchGames(searchQuery, genreId);
        if (mounted) setGames(data);
      } catch (e) {
        if (mounted) setError(e.message || "Failed to load games");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    // очищення ефекту при зміні параметрів або демонтажі
    return () => {
      mounted = false;
    };
  }, [searchQuery, genreId]);

  // повертаємо дані для використання в компонентах
  return { games, loading, error };
}
