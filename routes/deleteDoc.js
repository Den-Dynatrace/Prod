var express = require('express');
var router = express.Router();
const {isAuthenticated, mgmtCheck} = require('../public/javascripts/utils.js')
const {listAllDocs} = require('../db_queries.js');


/* GET users listing. */
router.get('/', isAuthenticated, async function(req, res, next) {
    tokenClaims = req.session.account.idTokenClaims;
    var user = tokenClaims.preferred_username.split("@")[0]
    var docs = await listAllDocs(user);
    shortDocs = []
    for(e in docs){
        shortDocs.push(docs[e]["metric"] + '|' + docs[e]["Proof"]);
    }

    res.render("deleteDoc", {docs: shortDocs});
    
});


router.post('/', function(req, res, next){
    pass
})


module.exports = router;