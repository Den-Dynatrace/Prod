var express = require('express');
var router = express.Router();
const {isAuthenticated, mgmtCheck} = require("../public/javascripts/utils")

router.get('/', isAuthenticated, function(req, res, next) {
    res.render('injectDoc', {clientID: process.env.CLIENT_ID, mgmt: false});
  });

router.post('/',isAuthenticated, mgmtCheck, async function(req, res, next){
  let user = req.body.employee.toLowerCase();
  res.render('injectDoc', {clientID: process.env.CLIENT_ID, user: user, mgmt: true})
});

module.exports = router;
