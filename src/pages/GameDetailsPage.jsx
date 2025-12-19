import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchGameDetails, fetchGameScreenshots } from "../services/api";
import StorageService from "../services/StorageService";

/**
 * Допоміжна функція для видалення HTML-тегів з опису гри
 */
function stripHtml(html = "") {
  return html.replace(/<[^>]+>/g, "").trim();
}

const GameDetailsPage = () => {
  // Отримання id гри з URL та навігація
  const { id } = useParams();
  const navigate = useNavigate();

  // Стани компонента
  const [game, setGame] = useState(null);      // дані гри
  const [shots, setShots] = useState([]);      // скріншоти
  const [loading, setLoading] = useState(true); // стан завантаження
  const [fav, setFav] = useState(false);       // чи додано в обране
  const [error, setError] = useState("");      // повідомлення про помилку

  /**
   * Завантаження деталей гри та скріншотів
   */
  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setLoading(true);
        setError("");

        // Паралельні HTTP-запити до API
        const [details, screenshots] = await Promise.all([
          fetchGameDetails(id),
          fetchGameScreenshots(id),
        ]);

        if (!mounted) return;

        setGame(details);
        setShots(Array.isArray(screenshots) ? screenshots : []);
        setFav(StorageService.isFavorite?.(details?.id) ?? false);
      } catch (e) {
        if (!mounted) return;
        setError(e?.message || "Failed to load game details");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();

    // Захист від оновлення стану після демонтажу компонента
    return () => {
      mounted = false;
    };
  }, [id]);

  /**
   * Обчислювані значення для відображення
   */
  const description = useMemo(() => {
    if (!game) return "";
    const raw = game.description_raw || stripHtml(game.description || "");
    return raw || "Опис відсутній.";
  }, [game]);

  const genres = useMemo(() => {
    if (!game?.genres?.length) return "—";
    return game.genres.map((g) => g.name).join(", ");
  }, [game]);

  const platforms = useMemo(() => {
    if (!game?.platforms?.length) return "—";
    return game.platforms
      .map((p) => p.platform?.name)
      .filter(Boolean)
      .join(", ");
  }, [game]);

  const rating = useMemo(() => {
    if (typeof game?.rating !== "number") return "—";
    return game.rating.toFixed(2);
  }, [game]);

  const released = useMemo(() => {
    return game?.released || "—";
  }, [game]);

  // фото гри
  const heroImage =
    game?.background_image_additional || game?.background_image || "";

  /**
   * Додавання або видалення гри з обраного
   */
  const toggleFav = () => {
    if (!game?.id) return;

    if (fav) {
      StorageService.removeFavorite?.(game.id);
      setFav(false);
    } else {
      StorageService.addFavorite?.(game);
      setFav(true);
    }
  };

  // Відображення стану завантаження
  if (loading) {
    return (
      <div className="page details-page">
        <div className="details-container">
          <div className="details-card">
            <div className="details-loading">Loading…</div>
          </div>
        </div>
      </div>
    );
  }

  // Відображення помилки
  if (error) {
    return (
      <div className="page details-page">
        <div className="details-container">
          <button className="btn-back" onClick={() => navigate(-1)}>
            ← Назад
          </button>
          <div className="details-card">
            <div className="details-error">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  if (!game) return null;

  // Основний інтерфейс сторінки гри
  return (
    <div className="page details-page">
      <div className="details-container">
        <button className="btn-back" onClick={() => navigate(-1)}>
          ← Назад
        </button>

        <div className="details-card">
          <div className="details-header">
            <div className="details-coverWrap">
              {heroImage ? (
                <img
                  className="details-cover"
                  src={heroImage}
                  alt={game.name}
                  loading="lazy"
                />
              ) : (
                <div className="details-coverPlaceholder">No image</div>
              )}
            </div>

            <div className="details-main">
              <h1 className="details-title">{game.name}</h1>

              <div className="details-meta">
                <span className="details-pill">⭐ {rating}</span>
                <span className="details-pill">📅 {released}</span>
                <span className="details-pill">🎮 {genres}</span>
              </div>

              <button
                className={`btn-fav ${fav ? "is-on" : ""}`}
                onClick={toggleFav}
              >
                {fav ? "★ В обраному" : "☆ Додати в обране"}
              </button>

              <div className="details-desc">
                <h3>Опис</h3>
                <p>{description}</p>
              </div>

              <div className="details-infoGrid">
                <div className="details-infoItem">
                  <div className="details-infoLabel">Жанри</div>
                  <div className="details-infoValue">{genres}</div>
                </div>
                <div className="details-infoItem">
                  <div className="details-infoLabel">Платформи</div>
                  <div className="details-infoValue">{platforms}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Блок зі скріншотами */}
          <div className="details-section">
            <h2 className="details-sectionTitle">Скріншоти</h2>

            {shots.length === 0 ? (
              <div className="details-empty">Немає скріншотів.</div>
            ) : (
              <div className="shots-grid">
                {shots.map((s) => (
                  <a
                    key={s.id}
                    href={s.image}
                    target="_blank"
                    rel="noreferrer"
                    className="shot-card"
                  >
                    <img
                      src={s.image}
                      alt="Screenshot"
                      className="shot-img"
                      loading="lazy"
                    />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetailsPage;
