const express = require("express");
const router = express.Router();
const { IgApiClient } = require('instagram-private-api');
const ig = new IgApiClient();
const puppeteer = require("puppeteer");
const https = require('https');
const $ = require('jquery');
const axios = require('axios') 


router.get("/", (req, res) => res.send("Welcome to the browser"));




router.post("/getInsta", async(req, res) => {
  const  url = `https://www.instagram.com/${req.body.username}`;
   await  axios.get(`https://api.crawlbase.com/?token=UW6GgBzjINbtxsDFB6y3WQ&url=${url}&autoparse=true`)
   .then(async(ress) => {
    await res.status(200).json({
     data: ress.data  
     }) 
   })
   .catch(err => {
     res.status(200).json({
      err: err.response }) 
    })
})


module.exports = router;
