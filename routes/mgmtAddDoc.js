/**
 * Route to add doc to selected user from managment oage
 * routes directly to injectDoc.ejs 
 *  @creator Erik Sundblad 8/5/2022
 */
var express = require('express');
var router = express.Router();
const {isAuthenticated, mgmtCheck} = require("../public/javascripts/utils")

// required GET is routed to inject doc necissary for file picker Onedrive tool!
router.get('/', isAuthenticated, function(req, res, next) {
    res.render('injectDoc', {clientID: process.env.CLIENT_ID, mgmt: false});
  });


// POST request comes from manager.ejs and passes in selected user
router.post('/',isAuthenticated, mgmtCheck, async function(req, res, next){
  let user = req.body.employee.toLowerCase();
  // pass in client id for OneDrive tool, user variable and mgmt check is true
  res.render('injectDoc', {clientID: process.env.CLIENT_ID, user: user, mgmt: true})
});

module.exports = router;
