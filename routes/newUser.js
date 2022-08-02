var express = require('express');
var router = express.Router();
const {isAuthenticated, isMGMT} = require('../public/javascripts/utils.js')
const fetch = require('../public/javascripts/fetch.js')
const {mgmtList, newUser, employeeListUpdate, newManager} = require('../db_queries');

const GRAPH_ME_ENDPOINT = process.env.GRAPH_API_ENDPOINT + "v1.0/me";
var manager_id = ""

/* GET login page */
router.get('/',isAuthenticated,  async function(req, res, next) {
    console.log("here")
    const userInfo = await fetch(GRAPH_ME_ENDPOINT, req.session.accessToken);
    GRAPH_MANAGER = GRAPH_ME_ENDPOINT + "/manager";
    const manager = await fetch(GRAPH_MANAGER, req.session.accessToken);
    manager_id = manager.mail;
    
    let mgmList = []
    const raw = await mgmtList()
    for(var item in raw){
        mgmList.push(raw[item]["_id"])
    }

    if(!mgmList.includes(manager_id)){
        await newManager(manager);
    }
    
    if(userInfo.jobTitle.includes("Manager")){
        await newManager(userInfo)
        res.redirect("manager")
    }
    


    res.render('newUser', {name:  userInfo.givenName + ' ' + userInfo.surname,
                           email: userInfo.mail,
                           position: userInfo.jobTitle,
                           location: userInfo.officeLocation,
                           mgmt: manager.displayName });
    
  });
  
  router.post('/', async function(req,res, next){
    const userInfo = await fetch(GRAPH_ME_ENDPOINT, req.session.accessToken);
    id = userInfo.mail.split("@")
    console.log(id[0])
    if( await employeeListUpdate(manager_id, id[0])){
        if(await newUser(userInfo, manager_id)){
            res.redirect("profile")
            }
        }
  })
  
  module.exports = router;
  