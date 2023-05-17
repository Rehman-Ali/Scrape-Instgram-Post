const express = require("express");
const router = express.Router();
const { IgApiClient } = require('instagram-private-api');
const ig = new IgApiClient();
const puppeteer = require("puppeteer");
const $ = require('jquery');
  // Replace with your access token
//   ig.state.generateDevice('rehmanali_17');

// let { igApi, getCookie } = require("insta-fetcher");
router.get("/", (req, res) => res.send("Welcome to the browser"));



// router.post("/getInsta", async(req, res) => {
//   //  try{
//         const session_id = await getCookie("realdev0510", "realdev1121");
//         let ig = new igApi(session_id);
//        console.log(req.body.username, "==============")
    
//       // User data
//         let user ;
//         await  ig.fetchUser(req.body.username).then((res) => {
//           console.log(res)
//           user =  res;
//         })
        
//         // Fetch stories
//         let stories ;
//         await  ig.fetchStories(req.body.username).then((res) => {
//           console.log(res);
//           stories = res
//         }).catch(err => 
//           {stories = {}
//           console.log("stories are not available")
//         }) ;

//         let post ;
        
//         await  ig.fetchUserPostsV2(req.body.username).then((res) => {
//            post =  res;
//         }).catch(err =>
//           {post = {}
//           console.log("post are not available")
//         }
//           ) ;
//       res.status(200).json({
//           UserInfo: user,
//           Posts: post,
//           Stories : stories
//        }) 
//   //  }catch(err){
//   //    res.status(400).json({
//   //       message: err,
//   //       success: 0
//   //    })
//   //  }
  
// })


router.post("/getInsta", async(req, res) => {
  //  try{
  
      ig.state.generateDevice("realdev0510");
      const loggedInUser = await ig.account.login('realdev0510', 'realdev1121');
      
       // Replace with the username of the user you want to scrape data from
      const user = await ig.user.searchExact(req.body.username);
    
      // Get the user's posts
      const posts = await ig.feed.user(user.pk).items();
     
      // // Get the user's followers  
      // const followersFeed = await ig.feed.accountFollowers(user.pk);
      // let followers = [];
      // do{
      //   let items = await followersFeed.items();
      //   followers.push(items);
      // }while(followersFeed.isMoreAvailable())

      // // Get the user's following
      // const followingFeed = await ig.feed.accountFollowing(user.pk).items();
     
    
      const storyFeed = await ig.feed.userStory(user.pk).items();

      const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    
      // Open a new page
      const page = await browser.newPage();
    
      // On this new page:
      // - open the "http://quotes.toscrape.com/" website
      // - wait until the dom content is loaded (HTML is ready)
      await page.goto("https://insta-stories-viewer.com/kyliejenner/", {
        waitUntil: "networkidle2",
      });
    
      // Get page data
      const quotes = await page.evaluate(() => {
        // Fetch the first element with class "quote"
        const post = document.querySelector(".profile__stats-posts").innerText;
        const follower = document.querySelector(".profile__stats-followers").innerText;
        const following = document.querySelector(".profile__stats-follows").innerText;
    
        
        return {post, follower, following};
      });
    
      // Display the quotes
      console.log(quotes);
    
      // Close the browser
      await browser.close()
        
          
      res.status(200).json({
          UserInfo: user,
          UserPost: posts,
          TotalPost: quotes.post,
          TotalFollowers: quotes.follower,
          TotalFollowing: quotes.following,
          UserStory: storyFeed,
       }) 
  //  }catch(err){
  //    res.status(400).json({
  //       message: "Invalid Username or private account",
  //       success: 0
  //    })
  //  }
  
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
