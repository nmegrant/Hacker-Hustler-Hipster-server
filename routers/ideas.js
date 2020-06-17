const { Router } = require("express");
const Idea = require("../models").idea;
const authMiddleware = require("../auth/middleware");

const router = new Router();

router.get("/ideas", authMiddleware, async (request, response, next) => {
  try {
    const ideas = await Idea.findAll({
      where: { userId: request.user.id },
    });
    if (!ideas) {
      return response.status(404).send("Homepage not found");
    }
    response.status(200).send(ideas);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
