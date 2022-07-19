var express = require('express');
var router = express.Router();

/* GET login page */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/', function(req,res, next){
    res.render('index', {title: "SME Tracker"});
})

module.exports = router;
