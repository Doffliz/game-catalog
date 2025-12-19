import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import GameDetailsPage from "./pages/GameDetailsPage";
import useGenres from "./hooks/useGenres";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  const { genres } = useGenres();

  return (
    <div className="app">
      <Header
        onSearch={setSearchQuery}
        genres={genres}
        selectedGenre={selectedGenre}
        onGenreChange={setSelectedGenre}
      />

      <Routes>
        <Route path="/" element={<HomePage searchQuery={searchQuery} genreId={selectedGenre} />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/games/:id" element={<GameDetailsPage />} />

        <Route
          path="*"
          element={
            <div style={{ padding: 40 }}>
              <h2>404 — Сторінку не знайдено</h2>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
