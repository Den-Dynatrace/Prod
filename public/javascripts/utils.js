/**
 * Collection of session verification function 
 * additional delete API function modified "fetch"
 * @creator Erik Sundblad
 */
var axios = require('axios').default;
const {mgmtList} = require('../../db_queries')

/**
 * checks if session has authentication and routes accordingly
 * @returns signin route if not authenticated
 */
function isAuthenticated(req, res, next) {
    if (!req.session.isAuthenticated) {
        return res.redirect('/'); // redirect to index route
    }
    next();  
};


/**
 * checks if user is a manager if not reroute user to index
 * @returns route based on verification
 */
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

/**
 * checks if user is manager and routes away from user route to mgmt route
 * @returns coresponding router
 */
async function isMGMT(req, res, next,) {
    tokenClaims = req.session.account.idTokenClaims;
    //console.log(tokenClaims.preferred_username)
    managerEmail = tokenClaims.preferred_username.toLowerCase();
    mgmt = await mgmtList();
    for(var mgrs in mgmt){
        if(managerEmail == mgmt[mgrs]["_id"] ){
            return res.redirect("manager");
        }
      }
    next();
    }


/**
 * Attaches a given access token to a MS Graph API call
 * @param endpoint: REST API endpoint to call
 * @param accessToken: raw access token string
 */
 async function delDoc(endpoint, accessToken) {
    const options = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    };

    console.log(`request made to ${endpoint} at: ` + new Date().toString());

    try {
        const response = await axios.delete(endpoint, options);
        return await response.data;
    } catch (error) {
        throw new Error(error);
    }
}
module.exports = {isAuthenticated, isMGMT, mgmtCheck, delDoc};