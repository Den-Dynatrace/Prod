var express = require('express');
var router = express.Router();
const {isAuthenticated, isMGMT} = require('../public/javascripts/utils.js')
const fetch = require('../public/javascripts/fetch.js')
const {mgmtList, newUser, employeeListUpdate} = require('../db_queries');
const { raw } = require('express');

const GRAPH_ME_ENDPOINT = process.env.GRAPH_API_ENDPOINT + "v1.0/me";


/* GET login page */
router.get('/', isAuthenticated, isMGMT, async function(req, res, next) {
    mList = []
    const raw = await mgmtList()
    for(var item in raw){
        mList.push(raw[item]["_id"])
    }
    //console.log(mList)
    const userInfo = await fetch(GRAPH_ME_ENDPOINT, req.session.accessToken);
    res.render('newUser', {name:  userInfo.givenName + ' ' + userInfo.surname,
                           email: userInfo.mail,
                           position: userInfo.jobTitle,
                           location: userInfo.officeLocation,
                           mgmtList: mList });
  });
  
  router.post('/', async function(req,res, next){
    mgmtMail = req.body.managers
    const userInfo = await fetch(GRAPH_ME_ENDPOINT, req.session.accessToken);
    id = userInfo.mail.split("@")
    console.log(id[0])
    if( await employeeListUpdate(mgmtMail, id[0])){
        if(await newUser(userInfo, mgmtMail)){
            res.redirect("profile")
            }
        }
  })
  
  module.exports = router;
  