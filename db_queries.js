/** 
* Javascript file holding all neccissary MongoDB query drivers
* Utilizes Database connection string saved in .env
* Generally all are tied to a promise to allow the fucntions to be async
* Most require a userID, managerID or both
* userID = first.last,  managerID = first.last@dynatrace.com
* @creator Erik Sundblad
*/

require("dotenv").config();
const { MongoClient } = require('mongodb');
const uri = process.env.MONGO_URI
const client = new MongoClient(uri);


/**
 * Update the manager feild in id doc of give emplyee
 * @param {user id } user 
 * @param {manager id} manager_id 
 * @returns True on Success 
 */
async function managagerUpdate(user, manager_id){
  return new Promise(function(resolve, reject){
    const connect = client.db("SME_Tracker");
    connect.collection(user).updateOne({_id: user}, {$set:{manager: manager_id}});
    return resolve(true);
  });
}

/**
 * inject new sme document into db user collection 
 * @param {user id} user 
 * @param {Document to inject} doc 
 */
function inject(user, doc){
    client.connect(err => {
        const collection = client.db("SME_Tracker").collection(user);
        if (err) throw err;
        collection.insertOne(doc, function(err, res){
            if (err) throw err;
        });
        
    });
}

/**
 * Artifact Query replaced by MAP API call (get directReports)
 * Update employee list of manager id doc with given employee
 * @param {manager id} manager 
 * @param {user id} emp 
 * @returns true up success
 */
async function employeeListUpdate(manager, emp){
  return new Promise(function(resolve, reject){
    const connect = client.db("SME_Tracker");
    connect.collection("managers").updateOne(
      {_id: manager},
      { $addToSet: {Employees: emp}}
    );
    return resolve(true)
  });
}

/**
 * Function to return all managers currently known to database
 * @returns array list of all manager id's
 */
async function mgmtList(){
  return new Promise(function(resolve, reject){
    const connect = client.db("SME_Tracker")
    connect.collection("managers").find({}).project({_id:1}).toArray(function(err, result){
      //console.log(result)
      if(err) {
        return reject(err)
      }
      return resolve(result)
    })
  })
}


/**
 * function to get manager id doc from managers collection in db
 * @param {manager id} managerEmail 
 * @returns returns manager card saved in managers collection
 */
async function employeeNames(managerEmail){
    return new Promise(function(resolve, reject) {
      const connect = client.db("SME_Tracker")
      connect.collection("managers").find({"_id": managerEmail}).toArray(function(err, results) {   
          if(err) {
            return reject(err)
          }
          //console.log(results[0])
          return resolve(results[0])
        });
  });
}


/**
 * Unused replaced by graph API call get directReports
 * function delets given user from manager employee list on id card in db
 * @param {manager id} manager 
 * @param {employee id} emp 
 * @returns True upon success
 */
function removeEmp(manager, emp){
  return new Promise(function(resolve, reject){
    const connect = client.db("SME_Tracker")
    connect.collection("managers").updateOne(
      {_id: manager},
      {$pull:{Employees: emp}}
    );
    return resolve(true);
  })
}


/**
 * function to query documents under a specific metric in user collection
 * @param {specif JSON db query} query 
 * @param {user id} user 
 * @returns array with [0] = sum of metric values, followed by string concat of doc id + | + proof 
 * the return is later parced to be able to pop-up select ids and be linked to location on onedrive
 */
async function numberQuery(query, user){ 
//SIMPLE QUERY//
return new Promise(function(resolve, reject) {
  var sum = 0;
  var result = ""
  const connect = client.db("SME_Tracker")
  connect.collection(user).find(query).toArray( async function(err, docs) {
   if (err) {
     // Reject the Promise with an error
     return reject(err)
   }
   for(entries in docs){
    sum += Number(docs[entries]["value"]);
    result = result + "|" + docs[entries]["_id"] + "|";
    result = result + docs[entries]["Proof"];
   }
   final = [sum].concat([result])
   //console.log(result)
   return await resolve(final)
 })
})
}


/**
 * function to retriev user id card from user collection
 * @param {*} user 
 * @returns list with element 0 the JSON id car for user collection
 */
async function empID(user){
  return new Promise(function(resolve, reject) {
    const connect = client.db("SME_Tracker")
    connect.collection(user).find({"id_card": "ID Card"}).toArray( async function(err, docs){
      if (err){
        return reject(err)
      }
      //console.log(docs)
      return await resolve(docs)
    })
  })
}


/**
 * Delete employee collection entirely 
 * @param {user id} user 
 * @returns true upon success
 */
function dropEmp(user){
  return new Promise(function(resolve, reject){
  client.connect(err => {
    const collection = client.db("SME_Tracker").collection(user)
    if (err) return reject(err);
    collection.drop(function(err, res){
      if (err) return reject(err);
      //console.log("Collection Droped")
      return resolve(true);
    })
  })
  })
}


/**
 * Create a new user collection in db
 * @param {user info from graph API} userInfo 
 * @param {manager id} mgmt 
 * @returns true upon success
 */
async function newUser(userInfo, mgmt){
  id = userInfo.mail.split("@")
  //console.log(userInfo)
  id_doc = {
  "_id" : id[0],
  "id_card" : "ID Card",
  "Position" : userInfo.jobTitle,
  "Location": userInfo.officeLocation,
  "name": userInfo.givenName + " " + userInfo.surname,
  "manager": mgmt
  }
  return new Promise(function(resolve, reject){
    client.connect(err => {
      const collection = client.db("SME_Tracker").collection(id[0]);
      if (err) return reject(err) ;
      collection.insertOne(id_doc, function(err, res){
          if (err) return reject(err);
          //console.log("Inserted Docs");
          return resolve(true);
      });
  })
});
}


/**
 * Function adds new manager doc to managaers collection
 * @param {manager id info from graph API} manager 
 * @returns True upon sucess
 */
async function newManager(manager){
  id_doc = {
    "_id": manager.mail,
    "name": manager.displayName,
    "location": manager.officeLocation,
    "Title": manager.jobTitle,
  }
  return new Promise(function(resolve, reject){
    client.connect(err => {
      const collection = client.db("SME_Tracker").collection("managers")
      if (err) return reject(err);
      collection.insertOne(id_doc, function(err, res){
        if (err) return reject(err);
        //console.log("Inserted Docs")
        return resolve(true);
      })
    })
  })
}


/**
 * function to get all employee id's from db collection names omits managers collection
 * @returns list of all employee id's
 */
function getCollections(){
  return new Promise(function(resolve, reject) {
    const connect = client.db("SME_Tracker")
    emps = []
    connect.listCollections().toArray(function(err, cols){
      if (err){return reject(err)}
      for(entries in cols){
        if(cols[entries]["name"]!= "managers"){
          emps.push(cols[entries]["name"])
        }
      }
      return resolve(emps)
      });
  });
}


/**
 * function to delete manager doc from managers collection
 * @param {manager id} manager 
 * @returns true upon success
 */
function mgmtDelete(manager) {
  return new Promise(function(resolve, reject){
    const connect = client.db("SME_Tracker")
    connect.collection("managers").deleteOne({_id: manager}, function(err){
      if(err) {return reject(err)}
      return resolve(true);
    })
  })
}


/**
 * Funtion to return all documents in given user collection
 * @param {user id} user 
 * @returns array of JSON docs omitting id doc
 */
function listAllDocs(user) {
  return new Promise(function(resolve, reject){
    const connect = client.db("SME_Tracker")
    connect.collection(user).find({}).toArray(function(err, docs){
      if (err) return reject(err);
      return resolve(docs.slice(1));
    })
  })
}


/**
 * delets a given document in given user collection
 * @param {user id} user 
 * @param {id of document to delete} id 
 * @returns True upon success
 */
function deleteDocument(user, id) {
  return new Promise(function(resolve, reject){
    const connect = client.db("SME_Tracker");
    connect.collection(user).deleteOne({_id: id}, function(err){
      if (err) return reject(err);
      return resolve(true);
    })
  })
}


/**
 * retrieves specific document from given user collection
 * @param {user id} user 
 * @param {id of document} docID 
 * @returns JSON document from db
 */
function getDoc(user, docID){
  return new Promise(function(resolve, reject){
    const connect = client.db("SME_Tracker");
    connect.collection(user).find({_id:docID}).toArray(function(err, doc){
      if(err) return reject(err);
      return resolve(doc[0]); //Return just the JSON doc
    
    });
  })
}


module.exports = {
numberQuery,
empID,
inject,
employeeNames,
mgmtList,
newUser,
employeeListUpdate,
newManager,
managagerUpdate,
removeEmp,
getCollections,
mgmtDelete, 
dropEmp,
listAllDocs,
deleteDocument,
getDoc
};
