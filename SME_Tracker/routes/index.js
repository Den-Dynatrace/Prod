var express = require('express');
var router = express.Router();
var databaseVals = require("../db_queries")


var val = await databaseVals({})
console.log(val)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: val });
});

module.exports = router;
