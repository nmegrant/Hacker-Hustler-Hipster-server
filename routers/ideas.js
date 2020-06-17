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

router.post("/ideas", authMiddleware, async (request, response, next) => {
  const { title, description, hacker, hipster, hustler } = request.body;
  try {
    console.log(request.user.id);
    console.log(request.body);
    const newIdea = Idea.create({
      title,
      description,
      hacker,
      hustler,
      hipster,
      userId: request.user.id,
    });
    response.status(201).send(newIdea);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
