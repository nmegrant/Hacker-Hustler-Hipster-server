"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      "userTags",
      [
        {
          userId: 1,
          tagId: 29,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          tagId: 33,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          tagId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          tagId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          tagId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          tagId: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          tagId: 9,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          tagId: 11,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          tagId: 27,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          tagId: 30,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("userTags", null, {});
  },
};
