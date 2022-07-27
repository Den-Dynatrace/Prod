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
  let results = []
  let total = 0;
  let contenLabTot = 0;
  let prodFeedTot = 0;
  let evangelTot = 0;
  let recogTot = 0;
  let user = req.body.employee.toLowerCase();
  //console.log(user)
  try{
    id = await empID(user)
    for (let query in queries) {
      //console.log(queries[query])
      val = await numberQuery(queries[query], user)
      total += val[0]

      if(query < 11) {contenLabTot += val[0];}
      else if(query < 22  ) {prodFeedTot += val[0];}
      else if(query < 30 ) {evangelTot += val[0];}
      else {recogTot += val[0];}
      //console.log(val)
      results.push(val)
    }
    res.render('profile', { i0: id[0].name,
                            i1: id[0].Position,
                            i2: id[0].Location,
                            a0: results[0][0], //# of sessions
                            a1: results[1][0], //# of videos
                            a2: results[2][0], //# of DU Content
                            a3: results[3][0], //# of treainings del.
                            a4: results[4][0], //CSAT score
                            a5: results[5][0], //# of meetings participated in
                            a6: results[6][0], //# of best practice guides
                            a7: results[7][0], //# of topics dev.
                            a8: results[8][0], //# of labe enviros
                            a9: results[9][0], //# of others using labs
                            a10: results[10][0], //# of others participating in lab dev
                            a11: results[11][0], //# of topics reviewed
                            a12: results[12][0], //# of trends identified
                            a13: results[13][0], //# of recommendations provided
                            a14: results[14][0], //# of Answer bots developed
                            a15: results[15][0], //# of TKB's created/edited
                            a16: results[16][0], //# of aritlces written
                            a17: results[17][0], //#/% inc./ of self help
                            a18: results[18][0], //#/% dec. in chats
                            a19: results[19][0], //# of product enhancements requested/released
                            a20: results[20][0], //#/% increase of self-help
                            a21: results[21][0], //#/% decresse in chats
                            a22: results[22][0], //# of meetings attended
                            a23: results[23][0], //# of groups represented in 
                            a24: results[24][0], //# of articles published
                            a25: results[25][0], //# reads per article
                            a26: results[26][0], //# of conferences attended
                            a27: results[27][0], //# of presentations shared
                            a28: results[28][0], //# of internal meetings where TPS is highlighted
                            a29: results[29][0], //# of meetings where TPS is presenting on a global or cross-regional basis
                            a30: results[30][0], //# of advanced certs
                            a31: results[31][0], //# of advanced training courses completed
                            a32: results[32][0], //# of customer meetings on SME topic, CSAT% 
                            a33: results[33][0], //# of hours in chat outside shift
                            a34: results[34][0], //# of escalations handled
                            a35: results[35][0], //# of new.improved processes
                            a36: results[36][0], //%time/efficiancy improvement
                            v0: total,            
                            v1: contenLabTot, 
                            v2: prodFeedTot,
                            v3: evangelTot,
                            v4: recogTot
                          });
                      }
                      catch (e){
                        //flash nothing to display
                        res.redirect("manager")
                      }  
});


module.exports = router;

