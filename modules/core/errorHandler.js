export default function errorHandler(app) {
  app.use(apiNotFound);
  function apiNotFound(req, res) {
    res.status(404).send('API not found');
  }
}
