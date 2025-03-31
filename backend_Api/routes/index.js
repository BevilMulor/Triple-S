var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  console.timeEnd("DB Query Time");
  res.send('Welcome to the API!');
});

module.exports = router;
