import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchGameDetails, fetchGameScreenshots } from "../services/api";
import StorageService from "../services/StorageService";

function stripHtml(html = "") {
  return html.replace(/<[^>]+>/g, "").trim();
}

const GameDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [game, setGame] = useState(null);
  const [shots, setShots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fav, setFav] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setLoading(true);
        setError("");

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
    return () => {
      mounted = false;
    };
  }, [id]);

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

  const heroImage =
    game?.background_image_additional || game?.background_image || "";

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

  if (loading) {
    return (
      <div className="page details-page">
        <div className="details-wrap">
          <div className="details-loading">Loading…</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page details-page">
        <div className="details-wrap">
          <button className="btn-back" onClick={() => navigate(-1)}>
            ← Назад
          </button>
          <div className="details-error">{error}</div>
        </div>
      </div>
    );
  }

  if (!game) return null;

  return (
    <div className="page details-page">
      <div className="details-wrap">
        <div className="details-topbar">
          <button className="btn-back" onClick={() => navigate(-1)}>
            ← Назад
          </button>
        </div>

        <div className="details-hero">
          <div className="details-heroMedia">
            {heroImage ? (
              <img
                src={heroImage}
                alt={game.name}
                className="details-heroImg"
                loading="lazy"
              />
            ) : (
              <div className="details-heroPlaceholder">No image</div>
            )}
          </div>

          <div className="details-heroInfo">
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
                  title="Open full size"
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
  );
};

export default GameDetailsPage;
