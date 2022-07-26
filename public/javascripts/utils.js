var axios = require('axios').default;
const {mgmtList} = require('../../db_queries')


function isAuthenticated(req, res, next) {
    if (!req.session.isAuthenticated) {
        return res.redirect('/'); // redirect to sign-in route
    }

    next();
};


async function isMGMT(req, res, next) {
    tokenClaims = req.session.account.idTokenClaims;
    //console.log(tokenClaims.preferred_username)
    managerEmail = tokenClaims.preferred_username;
    mgmt = await mgmtList();
    for(var mgrs in mgmt){
        if(managerEmail == mgmt[mgrs]["_id"] ){
            res.redirect("/manager")
        }
        //console.log(result[mgmt]["_id"])
      }
      next();
}


module.exports = {isAuthenticated, isMGMT};