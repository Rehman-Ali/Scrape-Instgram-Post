const cors = require("cors");
const express = require("express");
const puppeteer = require('puppeteer');

const app = express();

app.use(cors());








app.use("/", require("./routes/index"));


app.listen(3000, () => {
  console.log(`App is listening at  3000`);
});
