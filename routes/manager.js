var express = require('express');
var router = express.Router();
const {employeeNames,empID,numberQuery} = require("../db_queries");
var queries = require('../individual.js');
const {isAuthenticated} = require("../public/javascripts/utils")
var mgmt = true;


/* GET manager page */
router.get('/', isAuthenticated,  async function(req, res, next) {
  tokenClaims = req.session.account.idTokenClaims;
  var manager = tokenClaims.preferred_username;
  //console.log(manager)
  var managerCard = await employeeNames(manager)
  res.render('manager', { name : managerCard["name"],
                          email : managerCard["_id"],
                          title : managerCard["Title"],
                          empList: managerCard["Employees"]})
});

router.post('/', async function(req, res, next){
  results = []
  user = req.body.employee.toLowerCase();
  //console.log(user)
  try{
    id = await empID(user)
    for (let query in queries) {
      //console.log(queries[query])
      val = await numberQuery(queries[query], user)
      //console.log(val)
      results.push(val)
    }
    res.render('profile', { mgmt: mgmt,
                          i1: id[0]._id,
                          i2: id[0].Department,
                          i3: id[0].Position,
                          i4: id[0].Languages,
                          a0: results[0], 
                          a1: results[1],
                          a2: results[2],
                          a3: results[3],
                          a4: results[4],
                          a5: results[5],
                          a6: results[6],
                          a7: results[7],
                          a8: results[8],
                          a9: results[9],
                          a10: results[10],
                          a11: results[11],
                          a12: results[12],
                          a13: results[13],
                          a14: results[14],
                          a15: results[15],
                          a16: results[16],
                          a17: results[17],
                          a18: results[18],
                          a19: results[19],
                          a20: results[20],
                          a21: results[21],
                          a22: results[22],
                          a23: results[23],
                          a24: results[24],
                          a25: results[25],
                          a26: results[26],
                          a27: results[27],
                          a28: results[28],
                          a29: results[29],
                          a30: results[30],
                          a31: results[31],
                          a32: results[32],
                          a33: results[33],
                          a34: results[34],
                          a35: results[35],
                          a36: results[36],
                          v0: 0,
                          v1: 0,
                          v2: 0,
                          v3: 0,
                          v4: 0
                        });
                      }
                      catch (e){
                        //flash nothing to display
                        res.redirect("manager")
                      }  
});


module.exports = router;

