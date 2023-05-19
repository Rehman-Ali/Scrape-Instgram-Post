const cors = require("cors");
const express = require("express");
const puppeteer = require('puppeteer');
const bodyParser = require("body-parser");
const app = express();

app.use(cors());


// configure the app to use bodyParser()
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);




app.use(bodyParser.json());

app.use("/", require("./routes/index"));


app.listen(8080, () => {
  console.log(`App is listening at  8080`);
});
