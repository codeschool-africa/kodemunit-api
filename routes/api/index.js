const express = require("express");
const router = express.Router();
 
router.get('/', function (req, res) {
    res.send('Welcome To Kodemunit-API')
});

module.exports = router;