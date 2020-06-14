"use strict";
module.exports = (sequelize, DataTypes) => {
  const userTag = sequelize.define(
    "userTag",
    {
      userId: DataTypes.INTEGER,
      tagId: DataTypes.INTEGER,
    },
    {}
  );
  userTag.associate = function (models) {
    userTag.belongsTo(models.tag);
    userTag.belongsTo(models.user);
  };
  return userTag;
};
