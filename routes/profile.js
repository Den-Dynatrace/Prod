var express = require('express');
var router = express.Router();
const {numberQuery, empID} = require('../db_queries.js')
var queries = require('../individual.js')
const {isAuthenticated, isMGMT} = require('../public/javascripts/utils.js')



/* GET profile page. */
router.get('/', isAuthenticated, isMGMT, async function(req, res, next) {
  tokenClaims = req.session.account.idTokenClaims;
  var user = tokenClaims.preferred_username.split("@")
  //console.log(user[0])
  results =[]
  id = await empID(user[0])
  if(id.length > 0){
    for (let query in queries) {
      //console.log(queries[query])
      val = await numberQuery(queries[query], user[0])
      console.log(val)
      results.push(val)
    }
    res.render('profile', { i0: id[0].name,
                          i1: id[0].Position,
                          i2: id[0].Location,
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
  else{
   res.redirect("newUser")
  }    
});



module.exports = router;
