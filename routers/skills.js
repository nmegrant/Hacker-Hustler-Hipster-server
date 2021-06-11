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
    const newUserSkills = await Promise.all(
      skills.map(async (skill) => {
        const tag = await Skill.findOne({
          where: { skill: skill },
        });
        await UserSkill.create({
          userId: request.user.id,
          tagId: tag.dataValues.id,
        });
        return tag;
      })
    );
    response.status(201).send(newUserSkills);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
