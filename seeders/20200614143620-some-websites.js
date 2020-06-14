"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      "websites",
      [
        {
          url: "https://stackoverflow.com/",
          homepageId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          url: "https://github.com/",
          homepageId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          url: "https://www.linkedin.com/",
          homepageId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("websites", null, {});
  },
};
