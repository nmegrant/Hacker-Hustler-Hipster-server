const User = require("../models").user;
const { toData } = require("./jwt");
const { response } = require("express");

async function auth(request, response, next) {
  const auth =
    request.headers.authorization && request.headers.authorization.split(" ");
  if (auth && auth[0] === "Bearer" && auth[1]) {
    try {
      const data = toData(auth[1]);
      const user = await User.findByPk(data.userId);
      if (!user) {
        return response.status(404).send({ message: "No user found" });
      }
      console.log(user);
      request.user = user;
      return next();
    } catch (error) {
      response.status(400).send({ message: "Invalid JWT token" });
    }
  } else {
    return response
      .status(401)
      .send({ message: "Please supply valid credentials" });
  }
}

module.exports = auth;
