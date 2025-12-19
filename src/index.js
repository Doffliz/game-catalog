import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./App.css";

// Точка входу клієнтського застосунку
const root = ReactDOM.createRoot(
  document.getElementById("root")
);

// Рендер головного компонента з підтримкою маршрутизації
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);