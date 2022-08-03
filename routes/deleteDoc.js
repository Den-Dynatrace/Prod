var express = require('express');
var router = express.Router();
const {isAuthenticated} = require('../public/javascripts/utils.js')
const {listAllDocs, deleteDocument} = require('../db_queries.js');


/* GET users listing. */
router.get('/', isAuthenticated, async function(req, res, next) {
    tokenClaims = req.session.account.idTokenClaims;
    var user = tokenClaims.preferred_username.split("@")[0].toLowerCase();
    var docs = await listAllDocs(user);
    shortDocs = []
    for(e in docs){
        shortDocs.push(docs[e]["metric"] + '|' + docs[e]["_id"]);
    }

    res.render("deleteDoc", {docs: shortDocs, mgmt:false, user:user});
    
});


router.post('/', isAuthenticated, async function(req, res, next){
    id = req.body.document;
    console.log(id);
    var user = tokenClaims.preferred_username.split("@")[0].toLowerCase()
    await deleteDocument(user, id);
    res.redirect('profile');
})


router.post('/mgmt', isAuthenticated, async function(req, res, next){
    id = req.body.document;
    user = req.body.user;
    //console.log(id);
    await deleteDocument(user, id);
    res.redirect('/manager');
})


module.exports = router;