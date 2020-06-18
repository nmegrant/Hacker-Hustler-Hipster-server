const { Router } = require("express");
const Skill = require("../models").tag;

const router = new Router();

router.get("/skills", async (request, response, next) => {
  try {
    const skills = await Skill.findAll();
    response.status(200).send(skills);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
});

module.exports = router;
