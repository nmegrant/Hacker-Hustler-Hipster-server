const { Router, response } = require("express");
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
    await Favourite.create({
      userId: request.user.userId,
      favouriteId: id,
    });
    return response.status(201).send();
  } catch (error) {
    next(error);
  }
});

router.delete(
  "/favourites",
  authMiddleware,
  async (request, response, next) => {
    try {
    } catch (error) {
      next(error);
    }
  }
);
