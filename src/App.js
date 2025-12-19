// Імпорт базових хуків Reactt
import React, { useState } from "react";

// імпорт компонентів маршрутизації з react-router-dom
import { Routes, Route } from "react-router-dom";

// Імпорт власних компонентів інтерфейсу
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import GameDetailsPage from "./pages/GameDetailsPage";

// імпорт кастомного React-хука для отримання жанрів
import useGenres from "./hooks/useGenres";


function App() {
  // Стан для пошукового запиту
  const [searchQuery, setSearchQuery] = useState("");

  // Стан для обраного жанру
  const [selectedGenre, setSelectedGenre] = useState("");

  // отримання списку жанрів через кастомний хук
  const { genres } = useGenres();

  return (
    <div className="app">
      {/* 
        Header — глобальний компонент навігації.
        Передаємо:
        - функцію для пошуку;
        - список жанрів;
        - обраний жанр;
        - функцію зміни жанру.
      */}
      <Header
        onSearch={setSearchQuery}
        genres={genres}
        selectedGenre={selectedGenre}
        onGenreChange={setSelectedGenre}
      />

      {/* 
        Налаштування маршрутів застосунку.
        Використовується архітектура Single Page Application (SPA).
      */}
      <Routes>
        {/* Головна сторінка з каталогом ігор */}
        <Route
          path="/"
          element={
            <HomePage
              searchQuery={searchQuery}
              genreId={selectedGenre}
            />
          }
        />

        {/* Сторінка обраних ігор */}
        <Route
          path="/favorites"
          element={<FavoritesPage />}
        />

        {/* Сторінка детальної інформації про гру */}
        <Route
          path="/games/:id"
          element={<GameDetailsPage />}
        />

        {/* 
          Обробка неіснуючих маршрутів (404).
          Відображається, якщо користувач переходить на невірний URL.
        */}
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

// Експорт головного компонента
export default App;
