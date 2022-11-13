module.exports = (sequelize, Sequelize) => {
  const Articles = sequelize.define("articles", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    image: {
      type: Sequelize.STRING,
    },
    published: {
      type: Sequelize.BOOLEAN
    },
  });

  return Articles;
};
