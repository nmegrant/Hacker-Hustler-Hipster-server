const { Router } = require("express");
const Favourite = require("../models").favourite;
const authMiddleware = require("../auth/middleware");

const router = new Router();

// router.get("/favourites", authMiddleware, async (request, repsonse, next) => {
//   try {
//     const favouriteList = await Favourite.findAll({
//       where: { userId: request.user.id },
//     });
//     if (!favouriteList) {
//       return response.status(404).send({ message: "No favourites yet." });
//     }
//     return response.status(200).send(favouriteList);
//   } catch (error) {
//     next(error);
//   }
// });

router.post("/favourites", authMiddleware, async (request, response, next) => {
  const { id } = request.body;
  try {
    if (id === request.user.id) {
      return response.status(400).send({ message: "You can't like yourself!" });
    }
    const favouriteList = await Favourite.create({
      userId: request.user.id,
      favouriteId: id,
    });
    return response.status(201).send(favouriteList);
  } catch (error) {
    next(error);
  }
});

router.delete(
  "/favourites",
  authMiddleware,
  async (request, response, next) => {
    const { id } = request.body;
    try {
      const favourite = await Favourite.findOne({
        where: { userId: request.user.id, favouriteId: id },
      });
      await favourite.destroy();
      const favouriteList = await Favourite.findAll({
        where: { userId: request.user.id },
      });
      return response.status(200).send(favouriteList);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
