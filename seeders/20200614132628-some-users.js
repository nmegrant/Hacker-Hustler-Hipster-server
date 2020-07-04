"use strict";
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Chad Moneybags",
          email: "hustler@test.com",
          password: bcrypt.hashSync("test1234", SALT_ROUNDS),
          role: "Hustler",
          darkMode: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Sam Nerd",
          email: "coder@test.com",
          password: bcrypt.hashSync("123456", SALT_ROUNDS),
          role: "Hacker",
          darkMode: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Ashley Artist",
          email: "arty@test.com",
          password: bcrypt.hashSync("password", SALT_ROUNDS),
          role: "Hipster",
          darkMode: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("users", null, {});
  },
};
