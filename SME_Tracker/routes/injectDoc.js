var express = require('express');
var router = express.Router();
const {inject} = require('../db_queries.js')

/* GET Inject view */
router.get('/', function(req, res, next) {
  res.render('injectDoc');
});

router.post('/injectDoc', function (req, res) {
    doc = {
    "Overall" : req.body.Overall,
    "Sub-Cat" : req.body.SubCat,
    "metric" : req.body.metric,
    "value" : req.body.value,
    "Proof" : req.body.Proof,
    "Notes" : req.body.notes,
    "Tag" : req.body.Tag
    }
    inject(user, doc)
  })

module.exports = router;