const { Router } = require("express");
const Homepage = require("../models").homepage;
const Website = require("../models").website;
const authMiddleware = require("../auth/middleware");

const router = new Router();

router.post("/websites", authMiddleware, async (request, response, next) => {
  try {
    const { urls } = request.body;
    const homepage = await Homepage.findOne({
      where: { userId: request.user.id },
    });
    if (!homepage) {
      return response.status(404).send("Homeage not found");
    }
    urls.forEach(async (url) => {
      if (url.length !== 0) {
        await Website.create({ homepageId: homepage.id, url });
      }
    });
    response.status(201).send("New websites added");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
