/**
 * router for deleteDoc.ejs render form page for document selection
 * post gets selection find document then deletes from db and onedrve
 * @creator Erik Sundblad 8/5/2022
 */
var express = require('express');
var router = express.Router();
const {isAuthenticated, delDoc} = require('../public/javascripts/utils.js')
const {listAllDocs, getDoc, deleteDocument} = require('../db_queries.js');
var apiString = process.env.GRAPH_API_ENDPOINT + "v1.0/drives/" + process.env.DRIVE_ID + "/items/";

// GET form page pass in string augmented list of all documents of given user
router.get('/', isAuthenticated, async function(req, res, next) {
    tokenClaims = req.session.account.idTokenClaims;
    var user = tokenClaims.preferred_username.split("@")[0].toLowerCase();
    var docs = await listAllDocs(user);
    shortDocs = []
    for(e in docs){
        //String modification is for utilization inside of ejs (all variables are passed as strings)
        shortDocs.push(docs[e]["metric"] + '|' + docs[e]["_id"]);
    }
                //Render page with string mod docs, mgmt check false, and pass user
    res.render("deleteDoc", {docs: shortDocs, mgmt:false, user:user});
    
});

//POST router for employee delete doc page pulls doc id and deletes
router.post('/', isAuthenticated, async function(req, res, next){
    id = req.body.document;
    var user = tokenClaims.preferred_username.split("@")[0].toLowerCase()
    documentToDel = await getDoc(user, id); //get specific document
    if(documentToDel != ""){
        //check if doc is tied to file in onedrive and delete 
        delString = apiString + documentToDel.DriveID;
        token = req.session.accessToken;
        try{        //If fail dont crash
            await delDoc(delString, token);
            }
            catch{
            console.log("delete file failed")
            }
    }
    //remove document from database reroute to updated profile
    await deleteDocument(user, id);
    res.redirect('profile');
})

//Manager POST router gets user from passses in variable then mirrors user post code
router.post('/mgmt', isAuthenticated, async function(req, res, next){
    id = req.body.document;
    user = req.body.user;
    documentToDel = await getDoc(user, id);
    if(documentToDel != ""){
        //check if doc is tied to file in onedrive and delete
        delString = apiString + documentToDel.DriveID;
        token = req.session.accessToken;
        try{        //If fail dont crash
            await delDoc(delString, token);
            }
            catch{
                console.log("delete file failed")
            }
    }
    await deleteDocument(user, id);
    res.redirect('/manager');
})


module.exports = router;