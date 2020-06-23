const { Router } = require("express");
const Skill = require("../models").tag;
const UserSkill = require("../models").userTag;
const authMiddleware = require("../auth/middleware");

const router = new Router();

router.get("/skills", async (request, response, next) => {
  try {
    const skills = await Skill.findAll();
    response.status(200).send(skills);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
});

router.post("/skills/user", authMiddleware, async (request, response, next) => {
  try {
    const { skills } = request.body;
    skills.map(async (skill) => {
      const tag = await Skill.findOne({
        where: { skill: skill },
      });
      await UserSkill.create({
        userId: request.user.id,
        tagId: tag.dataValues.id,
      });
    });
    response.status(201).send({ message: "Skills added" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
