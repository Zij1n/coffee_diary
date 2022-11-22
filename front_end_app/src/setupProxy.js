const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/recipes", {
      target: "http://localhost:5000",
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/create", {
      target: "http://localhost:5000",
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware("/appendRecord", {
      target: "http://localhost:5000",
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware("/records", {
      target: "http://localhost:5000",
      changeOrigin: true,
    })
  );
};
