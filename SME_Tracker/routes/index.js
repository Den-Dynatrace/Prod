var express = require('express');
var router = express.Router();
var databaseVals = require("../db_queries")


/* GET home page. */
router.get('/', async function(req, res, next) {
  val = await databaseVals({})
  res.render('index', { title: val });
});

module.exports = router;
