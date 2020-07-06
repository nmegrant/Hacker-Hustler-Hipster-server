const { Router } = require("express");
const Favourite = require("../models").favourite;
const authMiddleware = require("../auth/middleware");

const router = new Router();

router.post("/favourites", authMiddleware, async (request, response, next) => {
  const { favouriteId } = request.body;
  try {
    await Favourite.create({
      userId: request.user.userId,
      favouriteId: favouriteId,
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
