const { Router } = require("express");
const Homepage = require("../models").homepage;

const router = new Router();

router.get("/homepages", async (request, response, next) => {
  try {
    const homepages = await Homepage.findAll();
    response.status(200).send(homepages);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
