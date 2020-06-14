"use strict";
module.exports = (sequelize, DataTypes) => {
  const idea = sequelize.define(
    "idea",
    {
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: DataTypes.TEXT,
      hacker: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      hipster: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      hustler: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    },
    {}
  );
  idea.associate = function (models) {
    idea.belongsTo(models.user);
  };
  return idea;
};
