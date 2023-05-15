const express = require("express");
const router = express.Router();
const { IgApiClient } = require('instagram-private-api');
const ig = new IgApiClient();
router.get("/", (req, res) => res.send("Welcome to the browser"));



router.get("/getInsta", async(req, res) => {
   
        // Replace with your access token
        ig.state.generateDevice('AQDRcEe1IM6Yfuuu97HH2e6EJBbmCHXdl7wKz0gW2F0ylS3LITF0An14eyJwG2AehDLx9N7D5k36Vit-QFyPXPeKTPhT3ZhuFBD7ittv6aDuYsKEwgtrt7XC57A7KsN_SbmwljjtC9PfhCeJF5Qh71mOxOq3YUgVZuDZgmfyW8jfzTG3ZOreJU2JFRmD1i_3TrJjOD20YeE9ahCuhFj9-9yYjEa2RikONWQmkBX69snjNQ');
      
        await ig.simulate.preLoginFlow();
        const loggedInUser = await ig.account.login('rehmanali_17', '3WordPress!2K22!');
      
        // Replace with the username of the user you want to scrape data from
        const user = await ig.user.searchExact('kyliejenner');
      
        // console.log(user);
      
        // Get the user's posts
        const posts = await ig.feed.user(user.pk).items();
        // console.log(posts);
       
        // Get the user's followers
        const followersFeed = await ig.feed.accountFollowers(loggedInUser.pk).items();
        // console.log(followersFeed);
      
        // Get the user's following
        const followingFeed = await ig.feed.accountFollowing(loggedInUser.pk).items();
        // console.log(followingFeed);
      

        res.status(200).json({
            userPost: posts,
            userFollowers: followersFeed,
            userFollowing: followingFeed
        })
    
});
module.exports = router;
