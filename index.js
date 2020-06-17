const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const homepages = require("./routers/homepages");
const auth = require("./routers/auth");
const mypage = require("./routers/mypage");
const websites = require("./routers/websites");
const ideas = require("./routers/ideas");

const bodyParserMiddleWare = express.json();
app.use(bodyParserMiddleWare);

const corsMiddleWare = require("cors");
app.use(corsMiddleWare());

app.use(homepages);
app.use(auth);
app.use(mypage);
app.use(websites);
app.use(ideas);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

module.exports = app;
