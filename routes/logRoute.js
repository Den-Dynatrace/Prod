/**
 * Split router for login/logout functionality off inded.ejs
 *  @creator Erik Sundblad 8/5/2022
 */

var express = require('express');
var router = express.Router();

/* GET login page */
router.get('/', function(req, res, next) {
    //if logged in log out else login
    if(req.session.isAuthenticated){
        res.redirect("/auth/signout")
    }
    else{
        res.redirect("/auth/signin")
    }
});

module.exports = router;
