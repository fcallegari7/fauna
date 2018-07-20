var express = require('express');
var router = express.Router();
const favicon = require('express-favicon');

const app = express();

app.use(favicon(__dirname + '/public/favicon.png'));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
