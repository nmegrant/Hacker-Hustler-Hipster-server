"use strict";
module.exports = (sequelize, DataTypes) => {
  const homepage = sequelize.define(
    "homepage",
    {
      byline: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      location: DataTypes.STRING,
      experience: DataTypes.TEXT,
      bio: DataTypes.TEXT,
      idea: { type: DataTypes.BOOLEAN, allowNull: false },
    },
    {}
  );
  homepage.associate = function (models) {
    homepage.belongsTo(models.user);
    homepage.hasMany(models.website);
  };
  return homepage;
};
