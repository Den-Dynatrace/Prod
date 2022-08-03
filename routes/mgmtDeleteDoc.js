var express = require('express');
var router = express.Router();
const {isAuthenticated, mgmtCheck} = require("../public/javascripts/utils")
const {listAllDocs, deleteDocument} = require('../db_queries.js');

router.post('/',isAuthenticated, mgmtCheck, async function(req, res, next){
  let user = req.body.employee.toLowerCase();
  var docs = await listAllDocs(user);
  shortDocs = []
  for(e in docs){
      shortDocs.push(docs[e]["metric"] + '|' + docs[e]["_id"]);
  }

  res.render("deleteDoc", {docs: shortDocs, mgmt:true, user:user});
});

module.exports = router;
