const { json } = require('express');
var express = require('express');
var router = express.Router();
var databaseVals = require("../db_queries")
var user = "Erik.Sundblad"
var queries = require('../individual.js')
results =[]

/* GET home page. */
router.get('/', async function(req, res, next) {
  for (let query in queries) {
    console.log(queries[query])
    val = await databaseVals(queries[query])
    console.log(val)
    results.push(val)
  }
  res.render('index', { a1: results[0],
                        a2: results[1],
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
