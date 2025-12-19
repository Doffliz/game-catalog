const { createProxyMiddleware } = require("http-proxy-middleware");

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
