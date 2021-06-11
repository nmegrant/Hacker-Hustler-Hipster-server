"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      "ideas",
      [
        {
          title: "Idea to send people to space",
          description: "Blast off to the final frontier! Make it happen nerds!",
          hacker: false,
          hipster: false,
          hustler: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("ideas", null, {});
  },
};
