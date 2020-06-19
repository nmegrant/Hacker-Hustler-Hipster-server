const { Router, query } = require("express");
const Homepage = require("../models").homepage;
const User = require("../models").user;
const Tag = require("../models").tag;
const Website = require("../models").website;
const UserTag = require("../models").userTag;

const { Op } = require("sequelize");

const router = new Router();

router.get("/homepages", async (request, response, next) => {
  try {
    const homepages = await Homepage.findAll({
      include: [{ model: User, include: [Tag] }],
    });
    return response.status(200).send(homepages);
  } catch (error) {
    next(error);
  }
});

router.get("/homepages/skills", async (request, response, next) => {
  try {
    if (request.query.skills.length) {
      const filteredTags = await Tag.findAll({
        where: {
          skill: {
            [Op.in]: request.query.skills,
          },
        },
      });
      const tagIds = await filteredTags.map((tag) => tag.dataValues.id);

      const filteredUserTags = await UserTag.findAll({
        where: {
          tagId: {
            [Op.in]: tagIds,
          },
        },
      });

      const userIds = await filteredUserTags.map(
        (userTag) => userTag.dataValues.userId
      );

      const filteredHomepages = await Homepage.findAll({
        include: [{ model: User, include: [Tag] }],
        where: {
          userId: {
            [Op.in]: userIds,
          },
        },
      });

      return response.status(200).send(filteredHomepages);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/homepages/role", async (request, response, next) => {
  try {
    if (request.query.role.length) {
      const filteredUsers = await User.findAll({
        where: {
          role: request.query.role,
        },
      });
      const userIds = await filteredUsers.map((user) => user.dataValues.id);

      const filteredHomepages = await Homepage.findAll({
        include: [{ model: User, include: [Tag] }],
        where: {
          userId: {
            [Op.in]: userIds,
          },
        },
      });
      console.log(filteredHomepages);

      return response.status(200).send(filteredHomepages);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/homepages/idea", async (request, response, next) => {
  try {
    if (request.query.idea.length) {
      const filteredHomepages = await Homepage.findAll({
        include: [{ model: User, include: [Tag] }],
        where: {
          idea: request.params.idea,
        },
      });

      return response.status(200).send(filteredHomepages);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/homepages/:id", async (request, response, next) => {
  try {
    const homepageId = request.params.id;
    const homepage = await Homepage.findByPk(homepageId, {
      include: [{ model: User, include: [Tag] }, { model: Website }],
    });
    if (!homepage) {
      return response.status(404).send("Homepage not found");
    } else {
      delete homepage.user.dataValues["password"];
      response.status(200).send(homepage);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
