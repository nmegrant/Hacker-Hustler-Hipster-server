const { Router } = require("express");
const Homepage = require("../models").homepage;
const User = require("../models").user;
const Tag = require("../models").tag;
const Website = require("../models").website;
const Idea = require("../models").idea;
const authMiddleware = require("../auth/middleware");

const router = new Router();

router.patch("/mypage", authMiddleware, async (request, response, next) => {
  try {
    //one end point to update homepage
    //another endpoint to add websites
    //athird to add skills
  } catch (error) {
    next(error);
  }
});

module.exports = router;
