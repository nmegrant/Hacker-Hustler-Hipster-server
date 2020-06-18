const { Router, query } = require("express");
const Homepage = require("../models").homepage;
const User = require("../models").user;
const Tag = require("../models").tag;
const Website = require("../models").website;

const router = new Router();

router.get("/homepages", async (request, response, next) => {
  try {
    const homepages = await Homepage.findAll({
      include: [{ model: User, include: [Tag] }],
    });

    if (request.query.skills) {
      // const filteredHomepages = await Tag.findAll({
      //   where: {
      //     skill: {
      //       $in: request.query.skills,
      //     },
      //   },
      // });
      const filteredHomepages = homepages.filter(
        (homepage) =>
          homepage.user.tags.filter((tag) =>
            request.query.skills.includes(tag.skill)
          ).length > 0
      );
      return response.status(200).send(filteredHomepages);
    } else {
      return response.status(200).send(homepages);
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
