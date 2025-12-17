// src/services/LoggerService.js
const STORAGE_KEY = "app_logs";
const MAX_LOGS = 300;

function nowIso() {
  return new Date().toISOString();
}

function safeJson(value) {
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

function pushLog(entry) {
  try {
    const prev = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const next = [entry, ...prev].slice(0, MAX_LOGS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // якщо localStorage недоступний — просто мовчимо
  }
}

function log(level, message, meta) {
  const entry = {
    ts: nowIso(),
    level,
    message,
    meta: meta ?? null,
  };

  // у dev — ще й в консоль
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console[level === "error" ? "error" : "log"](`[${entry.ts}] ${level}: ${message}`, meta ?? "");
  }

  pushLog(entry);
}

const Logger = {
  info: (msg, meta) => log("info", msg, meta),
  warn: (msg, meta) => log("warn", msg, meta),
  error: (msg, meta) => log("error", msg, meta),
  getLogs: () => JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"),
  clear: () => localStorage.removeItem(STORAGE_KEY),
};

export default Logger;
