module.exports = (app) => {
  app.get("/api/current_user", (req, res) => {
    if (!req.session.user) {
      res.send(null);
    } else {
      res.send(req.session.user);
    }
  });
};
