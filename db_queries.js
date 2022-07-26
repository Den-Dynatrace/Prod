require("dotenv").config();
const fetch = require("./public/javascripts/fetch.js")
const { MongoClient } = require('mongodb');
const uri = process.env.MONGO_URI
const client = new MongoClient(uri);


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
    const connect = client.db("SME_Tracker")
    connect.collection("managers").updateOne(
      {_id: manager},
      { $addToSet: {Employees: emp}}
    )
    return resolve(true)
  })
}


async function mgmtList(){
  return new Promise(function(resolve, reject){
    const connect = client.db("SME_Tracker")
    connect.collection("managers").find({}).project({_id:1}).toArray(function(err, result){
      console.log(result)
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
          //console.log(results[0]["Employees"])
          return resolve(results[0])
        });
  });
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
  
  const connect = client.db("SME_Tracker")
  connect.collection(user).find(query).toArray( async function(err, docs) {
   if (err) {
     // Reject the Promise with an error
     return reject(err)
   }
   console.log(docs)
   // Resolve (or fulfill) the promise with data
   return await resolve(docs.length)
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
      console.log(docs)
      return await resolve(docs)
    })
  })
}

function dropCollection(user){
  client.connect(err => {
    const collection = client.db("SME_Tracker").collection(user)
    if (err) throw err;
    collection.drop(function(err, res){
      if (err) throw err;
      console.log("Collection Droped")
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



module.exports = {
numberQuery,
empID,
inject,
employeeNames,
mgmtList,
newUser,
employeeListUpdate
};
