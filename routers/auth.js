const { Router } = require("express");
const { toJWT, toData } = require("../auth/jwt");
const bcrypt = require("bcrypt");
const { delete } = require("..");
const User = require("../models").user;

const router = new Router();

router.post("/login", async (request, response, next) => {
  try {
    const { email, password } = request.body;
    if (!email || !password) {
      return response
        .status(400)
        .send("Please supply a valid email and password");
    }
    const user = await User.findOne({ where: { email } });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return response
        .status(400)
        .send("No user with that email/password is incorrect.");
    }
    delete user.dataValues["password"];
    const token = toJWT({ userId: user.id });
    return res.status(200).send({ toke, ...user.dataValues });
  } catch (error) {
    console.log(`Error: ${error}`);
  }
});

module.exports = router;
