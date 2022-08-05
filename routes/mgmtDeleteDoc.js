/**
 * route from manager page to delete a document for chosen user
 * only takes a post request and routes to deleteDoc.ejs
 * * @creator Erik Sundblad 8/5/2022
 */
var express = require('express');
var router = express.Router();
const {isAuthenticated, mgmtCheck} = require("../public/javascripts/utils")
const {listAllDocs} = require('../db_queries.js');



//Must be authenticated and a manager to post
router.post('/',isAuthenticated, mgmtCheck, async function(req, res, next){
  let user = req.body.employee.toLowerCase();
  var docs = await listAllDocs(user);
  shortDocs = []
  //delet doc utilizes metric for filtering and id for selection and final deletion.  
  for(e in docs){
      shortDocs.push(docs[e]["metric"] + '|' + docs[e]["_id"]);
  }

  //Render in all docs for user in string format set mgmt check to true and pass in given user
  res.render("deleteDoc", {docs: shortDocs, mgmt:true, user:user});
});

module.exports = router;
