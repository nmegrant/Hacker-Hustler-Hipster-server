const { Router } = require("express");
const Homepage = require("../models").homepage;
const User = require("../models").user;
const Tag = require("../models").tag;
const Website = require("../models").website;
const authMiddleware = require("../auth/middleware");

const router = new Router();

router.patch("/mypage", authMiddleware, async (request, response, next) => {
  try {
    const { bio, experience, byline, location, idea } = request.body;
    const homepage = await Homepage.findOne({
      where: { userId: request.user.id },
    });
    if (!homepage) {
      return response.status(404).send("Homeage not found");
    }
    const newHomepage = await homepage.update({
      bio,
      experience,
      byline,
      location,
      idea,
    });
    return response.status(200).send({ ...newHomepage.dataValues });
  } catch (error) {
    next(error);
  }
});

router.get("/mypage", authMiddleware, async (request, response, next) => {
  try {
    const homepage = await Homepage.findOne({
      where: { userId: request.user.id },
      include: [{ model: User, include: [Tag] }, { model: Website }],
    });
    if (!homepage) {
      return response.status(404).send("Homepage not found");
    }
    delete homepage.user.dataValues["password"];
    response.status(200).send(homepage);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
