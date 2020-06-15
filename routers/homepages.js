const { Router } = require("express");
const Homepage = require("../models").homepage;
const User = require("../models").user;
const Tag = require("../models").tag;

const router = new Router();

router.get("/homepages", async (request, response, next) => {
  try {
    const homepages = await Homepage.findAll({
      include: [{ model: User, include: [Tag] }],
    });
    response.status(200).send(homepages);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
