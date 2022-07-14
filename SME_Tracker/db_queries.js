require("dotenv").config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin:"+process.env.DBPASS+"@cluster0.hqxio3m.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

function insertOne(user, document){
    //INSERT ONE//
    client.connect(err => {
        const collection = client.db("SME_Tracker").collection(user);
        if (err) throw err;
        collection.insertOne(first_docs, function(err, res){
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
 len = client.connect(err  =>{
    if (err) throw err;
    var emps = client.db("SME_Tracker");
    
    var len =  emps.collection("Erik.Sundblad").find(query).toArray(function(err, result) {
      if (err) throw err;
      console.log(result.length);
      return(result.length)
      
    });
    return(len) 
  }); 
  return(len)  
}


module.exports = numberQuery