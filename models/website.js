"use strict";
module.exports = (sequelize, DataTypes) => {
  const website = sequelize.define(
    "website",
    {
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );
  website.associate = function (models) {
    website.belongsTo(models.homepage);
  };
  return website;
};
