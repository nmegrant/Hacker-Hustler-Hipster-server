const { Router } = require("express");
const Homepage = require("../models").homepage;
const User = require("../models").user;
const Tag = require("../models").tag;
const Website = require("../models").website;
const Idea = require("../models").idea;
const authMiddleware = require("../auth/middleware");

const router = new Router();

// router.patch("/homepages/:id", async (request, response, next) => {
//   try {
//     const homepage = await Homepage.findByPk(request.params.id);
//     if (!homepage) {
//       return response.status(404).send("Homepage does not exist");
//     }
//     await homepage.update({});
//     response.status(200).send(homepage);
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
