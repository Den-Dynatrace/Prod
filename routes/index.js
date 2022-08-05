/**
 * index.ejs router only takes get requests
 * @creator Erik Sundblad 8/5/2022
 */
var express = require('express');
var router = express.Router();

// Router renders app homepage, no authentication required 
router.get('/', function(req, res, next) {
  res.render("index");
  
});


module.exports = router;
