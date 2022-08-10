/**
 * index.ejs router only takes get requests
 * @creator Erik Sundblad 8/5/2022
 */
var express = require('express');
var router = express.Router();
const {isAuthenticated}= require('../public/javascripts/utils.js')

// Router renders app homepage, no authentication required 
router.get('/', function(req, res, next) {
  var isloggedIn = false;
  if(req.session.isAuthenticated){
    console.log("logged in!!!!!!");
    isloggedIn=true;
  }else{
    console.log("logged out!!!!!!!!");
    isloggedIn=false;
  }
  res.render("index", {isloggedIn:isloggedIn});
  
});


module.exports = router;
