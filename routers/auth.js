const { Router } = require("express");
const { toJWT, toData } = require("../auth/jwt");
const bcrypt = require("bcrypt");
const User = require("../models").user;
const Homepage = require("../models").homepage;
const authMiddleware = require("../auth/middleware");
const router = new Router();

router.post("/login", async (request, response, next) => {
  try {
    const { email, password } = request.body;
    if (!email || !password) {
      return response
        .status(400)
        .send({ message: "Please supply a valid email and password" });
    }
    const user = await User.findOne({ where: { email } });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return response
        .status(400)
        .send({ message: "No user with that email/password is incorrect." });
    }
    delete user.dataValues["password"];
    const token = toJWT({ userId: user.id });
    return response.status(200).send({ token, ...user.dataValues });
  } catch (error) {
    console.log(`Error: ${error}`);
    return response.status(400).send({ message: "Something went wrong" });
  }
});

router.post("/signup", async (request, response) => {
  const { email, password, name, role } = request.body;
  if (!email || !name || !password || !role) {
    return response
      .status(400)
      .send({ message: "Please supply all sign up information." });
  }
  try {
    const newUser = await User.create({
      email,
      password: bcrypt.hashSync(password, 10),
      name,
      role,
    });
    const newHomepage = await Homepage.create({
      userId: newUser.id,
      byline: "",
      location: "",
      experience: "",
      bio: "",
      idea: false,
    });
    delete newUser.dataValues["password"];
    const token = toJWT({ userId: newUser.id });
    response.status(201).send({ token, ...newUser.dataValues });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return response
        .status(500)
        .send({ message: "There is an existing account with this email" });
    }
    return response.status(500).send({ message: "Something went wrong" });
  }
});

router.get("/user", authMiddleware, async (request, response) => {
  delete request.user.dataValues["password"];
  response.status(200).send({ ...request.user.dataValues });
});

module.exports = router;
