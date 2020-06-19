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

router.get("/homepages/filters", async (request, response, next) => {
  try {
    let userIds_Tags;
    if (request.query.skills) {
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

      userIds_Tags = await filteredUserTags.map((userTag) =>
        Number(userTag.dataValues.userId)
      );
    }

    let userIds_Role;
    if (request.query.role) {
      const filteredUsers = await User.findAll({
        where: {
          role: request.query.role,
        },
      });
      userIds_Role = await filteredUsers.map((user) =>
        Number(user.dataValues.id)
      );
    }

    const clauses = {};

    if (userIds_Role && userIds_Tags) {
      const userIds = userIds_Role.filter((role_id) =>
        userIds_Tags.includes(role_id)
      );
      clauses["userId"] = {
        [Op.in]: userIds,
      };
    } else if (userIds_Tags) {
      clauses["userId"] = {
        [Op.in]: userIds_Tags,
      };
    } else {
      clauses["userId"] = {
        [Op.in]: userIds_Role,
      };
    }

    if (request.query.idea) {
      clauses["idea"] = request.query.idea;
    }

    const filteredHomepages = await Homepage.findAll({
      include: [{ model: User, include: [Tag] }],
      where: clauses,
    });

    return response.status(200).send(filteredHomepages);
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
