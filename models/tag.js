"use strict";
module.exports = (sequelize, DataTypes) => {
  const tag = sequelize.define(
    "tag",
    {
      skill: DataTypes.STRING,
    },
    {}
  );
  tag.associate = function (models) {
    tag.belongsToMany(models.user, {
      through: "userTags",
      foreignKey: "tagId",
    });
  };
  return tag;
};
