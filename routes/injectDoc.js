var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const {inject} = require('../db_queries.js');
const {isAuthenticated, isMGMT} = require('../public/javascripts/utils.js')


/* GET Inject view */
router.get('/', isAuthenticated, isMGMT, function(req, res, next) {
  res.render('injectDoc', {clientID: process.env.CLIENT_ID, mgmt: false});
});

router.post('/user', async function (req, res, next) {
  tokenClaims = req.session.account.idTokenClaims;
  var user = tokenClaims.preferred_username.split("@")[0].toLowerCase();
  var id = await req.body.id;
  var overall = await req.body.subject;
  var subcat = await req.body.topic;
  var metric = await req.body.chapter;
  var tag = req.body.tags;
  var proof = await req.body.proof;
  var notes = await req.body.Comment
  doc = {
    "_id" : id,
    "Overall" : overall,
    "Sub-Cat" : subcat,
    "metric" : metric,
    "value" : req.body.val,
    "Proof" : proof,
    "Notes" : notes,
    "Tag" : tag,
    "Date" : Date()
    }
    //console.log(doc)
    inject(user, doc)
    res.redirect('/profile')
  })


  router.post('/mgmt', async function (req, res, next) {
    
    var user = await req.body.user;
    var id = await req.body.id;
    var overall = await req.body.subject;
    var subcat = await req.body.topic;
    var metric = await req.body.chapter;
    var tag = req.body.tags;
    var proof = await req.body.proof;
    console.log(proof)
    var notes = await req.body.Comment
    doc = {
      "_id" : id,
      "Overall" : overall,
      "Sub-Cat" : subcat,
      "metric" : metric,
      "value" : req.body.val,
      "Proof" : proof,
      "Notes" : notes,
      "Tag" : tag,
      "Date" : Date()
      }
      //console.log(doc)
      inject(user, doc)
      res.redirect('/profile')
    })

module.exports = router;