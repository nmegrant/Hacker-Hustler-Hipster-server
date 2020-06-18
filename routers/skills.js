const { Router } = require("express");
const Skill = require("../models").tag;
const userSkill = require("../models").usertag;
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
  } catch (error) {
    next(error);
  }
});

module.exports = router;
