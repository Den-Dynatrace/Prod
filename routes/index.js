const { json } = require('express');
var express = require('express');
var router = express.Router();
const {numberQuery, empID} = require('../db_queries.js')
var user = "Erik.Sundblad"
var queries = require('../individual.js')
results =[]

/* GET home page. */
router.get('/', async function(req, res, next) {
  id = await empID(user)
  for (let query in queries) {
    console.log(queries[query])
    val = await numberQuery(queries[query])
    console.log(val)
    results.push(val)
  }
  res.render('index', { i1: id[0]._id,
                        i2: id[0].Department,
                        i3: id[0].Position,
                        i4: id[0].Languages,
                        a2: results[0],
                        a3: results[2],
                        a4: results[3],
                        a5: results[4],
                        a6: results[5],
                        a7: results[6],
                        a8: results[7],
                        a9: results[8],
                        a10: results[9],
                      });    
});



module.exports = router;
