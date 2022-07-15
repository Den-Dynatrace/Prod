require("dotenv").config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb://sme-database:ulb91PoDqNRdCLBvnBjcjQQPBzeOabzijeeOyBsIkryMeBD8VPmbMvO9FxzxQzsxxRD61RJdG4HmGmN0AvlpAg==@sme-database.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@sme-database@";
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


function employeeNames(){
    //COLLECTION NAMES//
    employees = []
    client.connect(err => {
    const connect = client.db("SME_Tracker")
    connect.listCollections().toArray(function(err, names) {   
        if(err) throw err;
        for (let item in names){
            //console.log(names[item]['name'])
            employees.concat([names[item]['name']])
        };
        });
    });
    return employees
}


function tagQuery(tag, language){
  //TAG QUERY//
  client.connect(err => {
    const connect = client.db("SME_Tracker")
    connect.collection
  });
}

async function numberQuery(query){ 
//SIMPLE QUERY//
return new Promise(function(resolve, reject) {
  const connect = client.db("SME_Tracker")
  connect.collection("Erik.Sundblad").find(query).toArray( async function(err, docs) {
   if (err) {
     // Reject the Promise with an error
     return reject(err)
   }
   console.log(docs.length)
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


exports.numberQuery = numberQuery
exports.empID = empID
exports.inject = inject