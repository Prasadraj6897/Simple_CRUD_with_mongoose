var express = require('express');

//add mongoose require
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Express-TestDB');
var Schema = mongoose.Schema;


var router = express.Router();

// added mongodb url
// var url = 'mongodb://localhost:27017';

var userDataSchema = new Schema({
  title: {type: String, required: true},
  content: String,
  author: String
}, {collection: 'userdata'});

var UserData = mongoose.model('UserData', userDataSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Example Express Title', body: ' body Example Express' });
});


// added mongodb insert command /// / / / /

router.post('/insert', function(req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };

  var data = new UserData(item);
  data.save();

  res.redirect('/');
});

/// added get command

router.get('/get-data', (req, res, next) => {
  var resultArray = [];
  UserData.find({})
  .then((data) => {

    data.forEach((doc, err) => {
      
      resultArray.push(doc);
    });

    res.render('index', {items: data});
    
  });
});

// added update command

router.post('/update', (req, res, next) => {
  var id = req.body.id;

  UserData.findById(id, function(err, doc) {
    if (err) {
      console.error('error, no entry found');
    }
    doc.title = req.body.title;
    doc.content = req.body.content;
    doc.author = req.body.author;
    doc.save();
  })
  res.redirect('/');
});

// added delete command
router.post('/delete', (req, res, next) =>{
  var id = req.body.id;
  UserData.findByIdAndRemove(id).exec();
  res.redirect('/');
});

module.exports = router;
