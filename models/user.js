"use strict";
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      darkMode: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {}
  );
  user.associate = function (models) {
    user.hasOne(models.homepage);
    user.hasMany(models.idea);
    user.belongsToMany(models.tag, {
      through: "userTags",
      foreignKey: "userId",
    });
  };
  return user;
};
