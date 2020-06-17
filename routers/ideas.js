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
    const newIdea = await Idea.create({
      title,
      description,
      hacker,
      hustler,
      hipster,
      userId: request.user.id,
    });
    return response.status(201).send({ ...newIdea.dataValues });
  } catch (error) {
    next(error);
  }
});

router.delete("/ideas", authMiddleware, async (request, response, next) => {
  try {
    const idea = await Idea.findByPk(request.body.id);
    await idea.destroy();
    return response.status(204).send("Idea deleted");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
