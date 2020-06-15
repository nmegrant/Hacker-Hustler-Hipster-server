const bcrypt = require("bcrypt");
const User = require("../models").user;
const { Router } = require("express");

const router = new Router();

router.post("/signup", async (request, response) => {
  const { email, password, name, role } = request.body;
  if (!email || !name || !password || !role) {
    return response.status(400).send("Please supply all sign up information.");
  }
  try {
    const newUser = await User.create({
      email,
      password: bycrypt.hashSynch(password, 10),
      name,
      role,
    });
    delete newUser.dataValues["password"];
    //need to add JWT stuff
    response.status(201).send(newUser);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return response
        .status(400)
        .send("There is an existing account with this email");
    }
    return response.status(400).send("Something went wrong");
  }
});

module.exports = router;
