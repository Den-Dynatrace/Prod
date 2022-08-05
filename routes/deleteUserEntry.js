var express = require('express');
var router = express.Router();
const {mgmtList, getCollections, mgmtDelete, empID, dropEmp, removeEmp } = require('../db_queries');
const {isAuthenticated, mgmtCheck} = require('../public/javascripts/utils.js')


/* GET users listing. */
router.get('/', isAuthenticated, mgmtCheck, async function(req, res) {
  let mgmt = await mgmtList();
  let mgmtL = []
  for(manager in mgmt){
    mgmtL.push(mgmt[manager]["_id"])
  }
  let emps= await  getCollections();
  res.render("deleteUserEntry", {emps: emps, mgmt: mgmtL});
  
});

router.post('/', async function(req, res){
    userType = req.body.ManagerEmployee
    //console.log(userType)
    user = req.body.Individual
    if(userType == "Manager"){
        await mgmtDelete(user);
        res.redirect('manager');
    }else if (userType == "Employee"){
        empCard = await empID(user);
        await removeEmp(empCard[0].manager, user);
        await dropEmp(user);
        res.redirect('manager');
    }else{
     res.redirect('manager');
    }
});


module.exports = router;
