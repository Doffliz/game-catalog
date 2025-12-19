const { createProxyMiddleware } = require("http-proxy-middleware");

// Налаштування проксі для запитів до зовнішнього API
module.exports = function (app) {
  app.use(
    "/rawg",
    createProxyMiddleware({
      target: "https://api.rawg.io",
      changeOrigin: true,
      secure: true,
      pathRewrite: {
        "^/rawg": "",
      },
      logLevel: "debug",
    })
  );
};
