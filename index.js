const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const homepages = require("./routers/homepages");
const user = require("./routers/user");

const bodyParserMiddleWare = express.json();
app.use(bodyParserMiddleWare);

const corsMiddleWare = require("cors");
app.use(corsMiddleWare());

app.use(homepages);
app.use(user);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

module.exports = app;