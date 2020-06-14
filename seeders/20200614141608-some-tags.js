"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      "tags",
      [
        {
          skill: "Javascript",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          skill: "Python",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          skill: "C++",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          skill: "PHP",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          skill: "Ruby",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          skill: "Go",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          skill: "Swift",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          skill: "Java",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          skill: "C#",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          skill: "C",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          skill: "CSS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          skill: "HTML",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          skill: "React.js",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          skill: "Vue",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          skill: "Redux.js",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          skill: "AngularJS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          skill: "Front End",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          skill: "Back End",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          skill: "Full Stack",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          skill: "Object Oriented Programming",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          skill: "Automated Testing",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          skill: "Jest",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          skill: "Mocha",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          skill: "Selenium",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          skill: "Protractor",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          skill: "Cypruss",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          skill: "Graphic Design",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          skill: "Music",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          skill: "Market Research",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          skill: "Digital Media",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          skill: "Social Networking",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          skill: "Financing",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          skill: "Project Management",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("tags", null, {});
  },
};
