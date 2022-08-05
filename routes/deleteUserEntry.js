/**
 * router for deleteUserEntry renders form page with mgmt and emp list then after selection
 * removes selected emp or mgmt from database
 * only available in manager route
 * @creator Erik Sundblad 8/5/2022
 */
var express = require('express');
var router = express.Router();
const {mgmtList, getCollections, mgmtDelete, empID, dropEmp, removeEmp } = require('../db_queries');
const {isAuthenticated, mgmtCheck} = require('../public/javascripts/utils.js')


// get route for user delete usees db queries to aggregate manager and emp list then renders them to page
router.get('/', isAuthenticated, mgmtCheck, async function(req, res) {
  let mgmt = await mgmtList();
  let mgmtL = []
  for(manager in mgmt){
    mgmtL.push(mgmt[manager]["_id"]) //mgmt list
  }
  let emps= await  getCollections(); //emp list
  res.render("deleteUserEntry", {emps: emps, mgmt: mgmtL});
  
});

//Takes post request form delete user page pulls usertype and individual selection from page 
//runs corresponding delete script
router.post('/', async function(req, res){
    userType = req.body.ManagerEmployee
    user = req.body.Individual
    if(userType == "Manager"){
        // run mgmtdel function and redirect to manager page
        await mgmtDelete(user);
        res.redirect('manager');
    }else if (userType == "Employee"){
        await dropEmp(user);
        res.redirect('manager');
    }else{
      //if all fails go back to manager page
     res.redirect('manager');
    }
});


module.exports = router;
