var axios = require('axios').default;
const {mgmtList} = require('../../db_queries')


function isAuthenticated(req, res, next) {
    if (!req.session.isAuthenticated) {
        return res.redirect('/'); // redirect to sign-in route
    }
    next();  
};

async function mgmtCheck(req, res, next){
    tokenClaims = req.session.account.idTokenClaims;
    //console.log(tokenClaims.preferred_username)
    managerEmail = tokenClaims.preferred_username.toLowerCase();
    mgmt = await mgmtList();
    for(var mgrs in mgmt){
        if(managerEmail == mgmt[mgrs]["_id"] ){
            return next();
        }
    }
    return res.redirect('/')   
}


async function isMGMT(req, res, next,) {
    tokenClaims = req.session.account.idTokenClaims;
    //console.log(tokenClaims.preferred_username)
    managerEmail = tokenClaims.preferred_username.toLowerCase();
    mgmt = await mgmtList();
    for(var mgrs in mgmt){
        if(managerEmail == mgmt[mgrs]["_id"] ){
            return res.redirect("manager");
            
            //req.session.managment = true;
        }
        //console.log(result[mgmt]["_id"])
      }
    
    next();
    }

module.exports = {isAuthenticated, isMGMT, mgmtCheck};