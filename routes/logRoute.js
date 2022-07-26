var express = require('express');
var router = express.Router();

/* GET login page */
router.get('/', function(req, res, next) {
    if(req.session.isAuthenticated){
        res.redirect("/auth/signout")
    }
    else{
        res.redirect("/auth/signin")
    }
});

module.exports = router;
