"use strict";
module.exports = (sequelize, DataTypes) => {
  const favourite = sequelize.define(
    "favourite",
    {
      userId: DataTypes.INTEGER,
      favouriteId: DataTypes.INTEGER,
    },
    {}
  );
  favourite.associate = function (models) {
    favourite.belongsTo(models.user);
  };
  return favourite;
};
