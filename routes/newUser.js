/**
 * New User router takes user info from Graph API and generates
 * post only for employee user to verify info provided
 * new corresponding id in DB
 * * @creator Erik Sundblad 8/5/2022
 */
var express = require('express');
var router = express.Router();
const {isAuthenticated} = require('../public/javascripts/utils.js')
const fetch = require('../public/javascripts/fetch.js')
const {mgmtList, newUser, getCollections, newManager} = require('../db_queries');
const GRAPH_ME_ENDPOINT = process.env.GRAPH_API_ENDPOINT + "v1.0/me";
var manager_id = ""

/**
 * checks authentication 
 * get necissary graph API information
 * splits functionality based on manager or employee
 * adds new user redirects to verify page 
 */
router.get('/',isAuthenticated,  async function(req, res) {
    const curentEmpList = await getCollections();
    const userInfo = await fetch(GRAPH_ME_ENDPOINT, req.session.accessToken);
    GRAPH_MANAGER = GRAPH_ME_ENDPOINT + "/manager";
    const manager = await fetch(GRAPH_MANAGER, req.session.accessToken);
    manager_id = manager.mail.toLowerCase();
    
    let mgmList = []
    const raw = await mgmtList()
    //get listing of all current managers
    for(var item in raw){
        mgmList.push(raw[item]["_id"])
    }

    //simple manager check looks for manager name in job title haha
    if(userInfo.jobTitle.includes("Manager")){
        // Create new manager id card in managers collection db
        await newManager(userInfo)
        // get direct reports and add if not already in db. 
        const GRAPH_EMPLOYEES = GRAPH_ME_ENDPOINT + "/directReports"
        var directReportResponse = await fetch(GRAPH_EMPLOYEES, req.session.accessToken)
        var employees = directReportResponse["value"];
        var newMGMTID = userInfo.mail.toLowerCase();
        for(e in employees) {
            // add employees not in db
            if(curentEmpList.indexOf(id) < 0){
                await newUser(employees[e], newMGMTID );
            }
        }
        res.redirect("manager")
    
    }else if(!mgmList.includes(manager_id)){
            await newManager(manager);
    }

    // Render data verification to newUser.ejs 
    res.render('newUser', {name:  userInfo.givenName + ' ' + userInfo.surname,
                           email: userInfo.mail,
                           position: userInfo.jobTitle,
                           location: userInfo.officeLocation,
                           mgmt: manager.displayName });
    
  });
  
  //post from new user adds new Employee collection to db with new id card
  router.post('/', isAuthenticated, async function(req,res, next){
    const userInfo = await fetch(GRAPH_ME_ENDPOINT, req.session.accessToken);
        if(await newUser(userInfo, manager_id)){
            res.redirect("profile")
        }
        
  })
  
  module.exports = router;
  