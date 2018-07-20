var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json([
    {id: 1, name:"somebody"},
    {id: 2, name:"somebody-else"}
  ]);
});

module.exports = router;
