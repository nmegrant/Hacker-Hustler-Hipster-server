"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      "homepages",
      [
        {
          byline: "I'm a hustler!",
          experience: "I've worked for lots of start ups!",
          location: "Amsterdam",
          bio: "I'm a super ambitious person!",
          idea: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
        },
        {
          byline: "I'm a hacker!",
          experience: "I've worked for Amazon, Facebook, and Google!",
          location: "Amsterdam",
          bio: "Code code code all the time!",
          idea: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 2,
        },
        {
          byline: "I'm a hispter!",
          experience: "I've got a great art portfolio",
          location: "Den Haag",
          bio: "I love making art!",
          idea: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 3,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("homepages", null, {});
  },
};
