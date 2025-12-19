import { useEffect, useState } from "react";
import { fetchGenres } from "../services/api";

// Кастомний хук для завантаження списку жанрів
export default function useGenres() {
  // сан списку жанрів
  const [genres, setGenres] = useState([]);
  // стан завантаження жанрів
  const [loadingGenres, setLoadingGenres] = useState(false);

  useEffect(() => {
    let mounted = true;

    // асинхронне отримання жанрів із API
    (async () => {
      setLoadingGenres(true);
      const data = await fetchGenres();
      if (mounted) setGenres(data);
      setLoadingGenres(false);
    })();

    // очищення ефекту при демонтажі компонента
    return () => {
      mounted = false;
    };
  }, []);

  
  return { genres, loadingGenres };
}
