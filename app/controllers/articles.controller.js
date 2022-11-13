const db = require("../models");
const Articles = db.articless;
const Op = db.Sequelize.Op;

// Create and Save a new Articles
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Articles
  const articles = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save Articles in the database
  Articles.create(articles)
    .then(data => {
      if (req.file == undefined) {
        return res.send(`You must select a file.`);
      }
      data.image = req.file.filename;
      data.save();
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Articles."
      });
    });
};

// Retrieve all Articless from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Articles.findAll({ where: condition })
    .then(data => {
      Object.values(data).forEach(data => {
        fileName = data.image;
        data.image = `${req.protocol}://${req.get("host")}/static/images/${fileName}`;
      });
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving articless."
      });
    });
};

// Find a single Articles with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Articles.findByPk(id)
    .then(data => {
      if (data) {
        fileName = data.image;
        data.image = `${req.protocol}://${req.get("host")}/static/images/${fileName}`;
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Articles with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Articles with id=" + id
      });
    });
};

// Update a Articles by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Articles.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Articles was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Articles with id=${id}. Maybe Articles was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Articles with id=" + id
      });
    });
};

// Delete a Articles with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Articles.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Articles was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Articles with id=${id}. Maybe Articles was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Articles with id=" + id
      });
    });
};

// Delete all Articless from the database.
exports.deleteAll = (req, res) => {
  Articles.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Articless were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all articless."
      });
    });
};

// find all published Articles
exports.findAllPublished = (req, res) => {
  Articles.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving articless."
      });
    });
};
