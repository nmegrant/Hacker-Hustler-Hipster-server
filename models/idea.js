"use strict";
module.exports = (sequelize, DataTypes) => {
  const idea = sequelize.define(
    "idea",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: DataTypes.TEXT,
      hacker: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      hipster: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      hustler: {
        type: DataTypes.BOOLEAN,
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
