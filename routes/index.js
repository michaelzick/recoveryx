var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;

var work = [];

/* GET home page. */
router.get('/', function(req, res) {
  MongoClient.connect("mongodb://localhost:27017/michaelmulti", function(err, db) {
    if(!err) {
      console.log("We are connected");
    }
    db.collection("work", function(err, collection) {
      collection.find().sort({order_num: 1}).toArray(function(err, result) {
        if (err) {
          throw err;
        } else {
          for (var i = 0; i < result.length; i++) {
            work[i] = result[i];
          }
        }
      });
    });
  });

  res.render('index', {
    title: 'Michael',
    work: work
  });
});

router.get('/surfing', function(req, res) {
  res.render('surfing', {
    title: 'RecoveryX - Surfing'
  });
});

module.exports = router;
