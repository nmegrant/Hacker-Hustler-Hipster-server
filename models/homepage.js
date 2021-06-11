"use strict";
module.exports = (sequelize, DataTypes) => {
  const homepage = sequelize.define(
    "homepage",
    {
      byline: DataTypes.TEXT,
      location: DataTypes.STRING,
      experience: DataTypes.TEXT,
      bio: DataTypes.TEXT,
      idea: DataTypes.TEXT,
    },
    {}
  );
  homepage.associate = function (models) {
    homepage.belongsTo(models.user);
    homepage.hasMany(models.website);
  };
  return homepage;
};
