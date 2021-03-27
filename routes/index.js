var express = require('express');

//add mongodb require
var mongo = require('mongodb').MongoClient
// for mongodb objectID
var objectId = require('mongodb').ObjectID;


var router = express.Router();

// added mongodb url
var url = 'mongodb://localhost:27017';


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Example Express Title', body: ' body Example Express' });
});

// router.get('/sample', function(req, res, next) {
//   res.send('Prasad Router sample');
// });

// router.get('/users', function(req, res, next) {
//   res.send('respond with a resource');
// });

// router.get('/users/details', function(req, res, next) {
//   res.send('user form Prasad  sacasd etail');
// });


//example for getting id from params
// router.get('/test/:id',(req, res, next) =>{
//   res.render('test', {output:req.params.id})
// })

//example of post id from user

// router.post('/test/submit', (req, res, next) =>{
//   res.redirect(`/test/${req.body.id}`)
// })

// added mongodb insert command /// / / / /

router.post('/insert', function(req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };
  console.log(item)

  mongo.connect(url, function(err, client) {
    
    var db = client.db('Express-TestDB');
    
    db.collection('userdata').insertOne(item, function(err, result) {    
      console.log('Item inserted');
      client.close();
    });
  });

  res.redirect('/');
});

/// added get command

router.get('/get-data', (req, res, next) => {
  var resultArray = [];
  mongo.connect(url, (err, client) =>{
   
    var db = client.db('Express-TestDB');

    var cursor = db.collection('userdata').find();
    cursor.forEach((doc, err) => {
      
      resultArray.push(doc);
    }, () => {
      client.close();
      res.render('index', {items: resultArray});
    });
  });
});

// added update command

router.post('/update', (req, res, next) => {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };
  var id = req.body.id;

  mongo.connect(url, (err, client) => {
   
    var db = client.db('Express-TestDB');

    db.collection('userdata').updateOne({"_id": objectId(id)}, {$set: item}, (err, result) => {
     

      console.log('Item updated');
      client.close();
    });
  });
});

// added delete command
router.post('/delete', (req, res, next) =>{
  var id = req.body.id;

  mongo.connect(url, (err, client) =>{

    var db = client.db('Express-TestDB');

    db.collection('userdata').deleteOne({"_id": objectId(id)}, (err, result) =>{
      

      console.log('Item deleted');
      client.close();
    });
  });
});

module.exports = router;
