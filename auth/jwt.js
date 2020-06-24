require("dotenv").config();
const jwt = require("jsonwebtoken");

const secret =
  process.env.JWT_SECRET || "234lj2k3je#$%DFG89rflk345F$45354fgdfgdf45%4$2kld";

function toJWT(data) {
  return jwt.sign(data, secret, { expiresIn: "2h" });
}

function toData(token) {
  return jwt.verify(token, secret);
}

module.exports = { toJWT, toData };
