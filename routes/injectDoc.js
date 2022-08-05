/**
 * router for injectDoc ejs, takes in values decided in page form
 * constructs new document to be saved in database
 * save document and redirects according to user sessions
 * * @creator Erik Sundblad 8/5/2022
 */
var express = require('express');
var router = express.Router();
const {inject} = require('../db_queries.js');
const {isAuthenticated, isMGMT} = require('../public/javascripts/utils.js')


/* GET Inject view */
router.get('/', isAuthenticated, isMGMT, function(req, res, next) {
  //pass in the client ID for onedrive file picker and mgmt check is false for user route
  res.render('injectDoc', {clientID: process.env.CLIENT_ID, mgmt: false});
});


// post request pulls form selections and constructs doc to be saved in DB
//User version gets user from session id
router.post('/user', async function (req, res, next) {
  tokenClaims = req.session.account.idTokenClaims;
  var user = tokenClaims.preferred_username.split("@")[0].toLowerCase(); //user id
  var id = await req.body.id;                       //id for added sme document 
  var overall = await req.body.subject;             
  var subcat = await req.body.topic;                 
  var metric = await req.body.chapter;
  var tag = await req.body.tags;
  var id_proof = await req.body.proof.split("|"); // split proof string from onedrive return 
  var proof = id_proof[1]; //url to onedrive file selected
  var driveID = id_proof[0]; //unique driveitem id created by onedrive for given file 
  var notes = await req.body.Comment
  doc = {
    "_id" : id,           
    "Overall" : overall,
    "Sub-Cat" : subcat,
    "metric" : metric,
    "value" : req.body.val,
    "Proof" : proof,
    "DriveID": driveID,
    "Notes" : notes,
    "Tag" : tag,
    "Date" : Date()
    }
    //console.log(doc)
    inject(user, doc)
    res.redirect('/profile')
  })

  //Manager version mirrors user version gets user passed from manager route
  router.post('/mgmt', async function (req, res, next) {
    
    var user = await req.body.user;
    var id = await req.body.id;
    var overall = await req.body.subject;
    var subcat = await req.body.topic;
    var metric = await req.body.chapter;
    var tag = req.body.tags;
    var id_proof = await req.body.proof.split("|"); // split proof string from onedrive return 
    var proof = id_proof[1]; //url to onedrive file selected
    var driveID = id_proof[0]; //unique driveitem id created by onedrive for given file 
    var notes = await req.body.Comment
    doc = {
      "_id" : id,
      "Overall" : overall,
      "Sub-Cat" : subcat,
      "metric" : metric,
      "value" : req.body.val,
      "Proof" : proof,
      "DriveID": driveID,
      "Notes" : notes,
      "Tag" : tag,
      "Date" : Date()
      }
      //console.log(doc)
      inject(user, doc)
      res.redirect('/profile')
    })

module.exports = router;