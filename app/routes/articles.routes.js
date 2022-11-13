const { authJwt } = require("../middleware");
const controller = require("../controllers/articles.controller");
const upload = require("../middleware/upload");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/articles",
    [authJwt.verifyToken],
    controller.findAll
  );

  app.get(
    "/api/articles/published",
    [authJwt.verifyToken],
    controller.findAllPublished
  );

  app.get(
    "/api/articles/:id",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.findOne
  );

  app.post(
    "/api/articles",
    [authJwt.verifyToken, authJwt.isModerator], upload.single("file"),
    controller.create
  );

  app.put(
    "/api/articles/:id",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.update
  );

  app.delete(
    "/api/articles/:id",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.delete
  );
};