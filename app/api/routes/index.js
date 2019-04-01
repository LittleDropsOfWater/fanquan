var express = require('express');
var router = express.Router();
var mongo = require('mongodb-curd');
var dbName = 'fanquan';
var colName = 'toutiao';
activeTab = ['toutiao', 'aidou', 'guangchang', 'tongkuan'];
/* GET home page. */
router.post('/getData', function(req, res, next) {
    console.log('req.body', req.body);
    var { skip = 0, limit = 0, type } = req.body;
    // activeTab[req.body.type]
    mongo.find(dbName, activeTab[type], function(result) {
        if (!result) {
            res.send({ code: 0, mes: 'error' })
        }
        res.send({ code: 1, data: result })
    }, { skip, limit })
});

module.exports = router;