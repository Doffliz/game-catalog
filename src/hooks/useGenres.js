import { useEffect, useState } from "react";
import { fetchGenres } from "../services/api";

export default function useGenres() {
  const [genres, setGenres] = useState([]);
  const [loadingGenres, setLoadingGenres] = useState(false);

  useEffect(() => {
    let mounted = true;

    (async () => {
      setLoadingGenres(true);
      const data = await fetchGenres();
      if (mounted) setGenres(data);
      setLoadingGenres(false);
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return { genres, loadingGenres };
}
