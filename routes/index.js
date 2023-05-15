const express = require("express");
const router = express.Router();
const { IgApiClient } = require('instagram-private-api');
const { sample } = require('lodash');
const ig = new IgApiClient();
  // Replace with your access token
//   ig.state.generateDevice('rehmanali_17');
router.get("/", (req, res) => res.send("Welcome to the browser"));


router.post("/getInsta", async(req, res) => {
   try{
  // const ig = new IgApiClient();
  ig.state.generateDevice("rehmanali_17");
  // ig.state.proxyUrl = process.env.IG_PROXY;
  const loggedInUser = await ig.account.login('rehmanali_17', "3WordPress!2K22!");
  // const followersFeed = ig.feed.accountFollowers(auth.pk);
  // const wholeResponse = await followersFeed.request();
  // console.log(wholeResponse); // You can reach any properties in instagram response
  // const items = await followersFeed.items();
  // console.log(items); // Here you can reach items. It's array.
  // const thirdPageItems = await followersFeed.items();
  // // Feed is stateful and auto-paginated. Every subsequent request returns results from next page
  // console.log(thirdPageItems); // Here you can reach items. It's array.
  // const feedState = followersFeed.serialize(); // You can serialize feed state to have an ability to continue get next pages.
  // console.log(feedState);
  // followersFeed.deserialize(feedState);
  // const fourthPageItems = await followersFeed.items();
  // console.log(fourthPageItems);
  // // You can use RxJS stream to subscribe to all results in this feed.
  // // All the RxJS powerful is beyond this example - you should learn it by yourself.
  // followersFeed.items$.subscribe(
  //   followers => console.log(followers),
  //   error => console.error(error),
  //   () => console.log('Complete!'),
  // );

         // Replace with the username of the user you want to scrape data from
      const user = await ig.user.searchExact(req.body.username);
    
      // console.log(user);
    
      // Get the user's posts
      const posts = await ig.feed.user(user.pk).items();
      // console.log(posts);
     
      // Get the user's followers
      const followersFeed = await ig.feed.accountFollowers(user.pk).items();
      // console.log(followersFeed);
    
      // Get the user's following
      const followingFeed = await ig.feed.accountFollowing(user.pk).items();
      // console.log(followingFeed);
    
      const tagsFeed = await ig.feed.usertags(user.pk).items();
    
    //   const reelsFeed = await ig.feed.ReelsMediaFeed(user.pk).items();
    
      res.status(200).json({
          userPost: posts,
          userTagged: tagsFeed,
        //   userReels: reelsFeed,
          userFollowers: followersFeed,
          userFollowing: followingFeed,
       }) 
   }catch(err){
     res.status(400).json({
        message: "Invalid Username or private account",
        success: 0
     })
   }
  
})


// router.get("/getInsta", async(req, res) => {
   
      
      
//         await ig.simulate.preLoginFlow();
//         const loggedInUser = await ig.account.login('rehmanali_17', '3WordPress!2K22!');
      
//         // Replace with the username of the user you want to scrape data from
//         const user = await ig.user.searchExact('kyliejenner');
      
//         // console.log(user);
      
//         // Get the user's posts
//         const posts = await ig.feed.user(user.pk).items();
//         // console.log(posts);
       
//         // Get the user's followers
//         const followersFeed = await ig.feed.accountFollowers(loggedInUser.pk).items();
//         // console.log(followersFeed);
      
//         // Get the user's following
//         const followingFeed = await ig.feed.accountFollowing(loggedInUser.pk).items();
//         // console.log(followingFeed);
      

//         res.status(200).json({
//             userPost: posts,
//             userFollowers: followersFeed,
//             userFollowing: followingFeed
//         })
    
// });
module.exports = router;
