// Рівні логування
const LogLevel = {
  INFO: "INFO",
  WARN: "WARN",
  ERROR: "ERROR",
};

// Сервіс логування;
class LoggerService {
  // Базовий метод логування
  log(level, message, data = null) {
    const timestamp = new Date().toISOString();

    // Формування структурованого логу
    const logEntry = {
      timestamp,
      level,
      message,
      data,
    };

    // Вивід в консоль
    if (level === LogLevel.ERROR) {
      console.error(logEntry);
    } else if (level === LogLevel.WARN) {
      console.warn(logEntry);
    } else {
      console.log(logEntry);
    }
  }

  // Інформаційні повідомлення
  info(message, data) {
    this.log(LogLevel.INFO, message, data);
  }

  // Попередження
  warn(message, data) {
    this.log(LogLevel.WARN, message, data);
  }

  // помилки
  error(message, data) {
    this.log(LogLevel.ERROR, message, data);
  }
}

// Експорт єдиного екземпляра логера
export default new LoggerService();
