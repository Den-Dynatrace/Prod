require("dotenv").config();
const fetch = require("./public/javascripts/fetch.js")
const { MongoClient } = require('mongodb');
const uri = process.env.MONGO_URI
const client = new MongoClient(uri);


async function managagerUpdate(user, manager_id){
  return new Promise(function(resolve, reject){
    const connect = client.db("SME_Tracker");
    connect.collection(user).updateOne({_id: user}, {$set:{manager: manager_id}});
    return resolve(true);
  });
}



function inject(user, doc){
    //INSERT ONE//
    client.connect(err => {
        const collection = client.db("SME_Tracker").collection(user);
        if (err) throw err;
        collection.insertOne(doc, function(err, res){
            if (err) throw err;
            console.log("Inserted Docs");
        });
        
    });
}

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


async function employeeNames(managerEmail){
    return new Promise(function(resolve, reject) {
      const connect = client.db("SME_Tracker")
      connect.collection("managers").find({"_id": managerEmail}).toArray(function(err, results) {   
          if(err) {
            return reject(err)
          }
          console.log(results[0])
          return resolve(results[0])
        });
  });
}


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


function tagQuery(tag, language){
  //TAG QUERY//
  client.connect(err => {
    const connect = client.db("SME_Tracker")
    connect.collection
  });
}


async function numberQuery(query, user){ 
//SIMPLE QUERY//
return new Promise(function(resolve, reject) {
  var sum = 0;
  var result = []
  const connect = client.db("SME_Tracker")
  connect.collection(user).find(query).toArray( async function(err, docs) {
   if (err) {
     // Reject the Promise with an error
     return reject(err)
   }
   for(entries in docs){
    sum += Number(docs[entries]["value"]);
    result.push(docs[entries]["Proof"]);
   }
   result = [sum].concat(result)
   //console.log(result)
   return await resolve(result)
 })
})
}


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


function dropEmp(user){
  return new Promise(function(resolve, reject){
  client.connect(err => {
    const collection = client.db("SME_Tracker").collection(user)
    if (err) return reject(err);
    collection.drop(function(err, res){
      if (err) return reject(err);
      console.log("Collection Droped")
      return resolve(true);
    })
  })
  })
}


async function newUser(userInfo, mgmt){
  id = userInfo.mail.split("@")
  console.log(userInfo)
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
          console.log("Inserted Docs");
          return resolve(true);
      });
  })
});
}

async function newManager(manager){
  id_doc = {
    "_id": manager.mail,
    "name": manager.displayName,
    "location": manager.officeLocation,
    "Title": manager.jobTitle,
    "Employees" : []
  }
  return new Promise(function(resolve, reject){
    client.connect(err => {
      const collection = client.db("SME_Tracker").collection("managers")
      if (err) return reject(err);
      collection.insertOne(id_doc, function(err, res){
        if (err) return reject(err);
        console.log("Inserted Docs")
        return resolve(true);
      })
    })
  })
}

//COLLECTION NAMES//
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

function mgmtDelete(manager) {
  return new Promise(function(resolve, reject){
    const connect = client.db("SME_Tracker")
    connect.collection("managers").deleteOne({_id: manager}, function(err){
      if(err) {return reject(err)}
      return resolve(true);
    })
  })
}

function listAllDocs(user) {
  return new Promise(function(resolve, reject){
    const connect = client.db("SME_Tracker")
    connect.collection(user).find({}).toArray(function(err, docs){
      if (err) return reject(err);
      return resolve(docs);
    })
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
listAllDocs
};
