var express = require('express');
var router = express.Router();
var fs = require('fs');
var parser = require('osu-parser');

/* GET home page. */
router.get('/list', function(req, res) {
    var dirList = fs.readdirSync('./public/beatmaps');
    var list = [];
    var result = {};

    dirList.forEach(function(item) {
        var beatmap = {};
        if (item.indexOf('.DS_Store') == -1) {
            beatmap.path = item;
            var dirList = fs.readdirSync('./public/beatmaps/' + item);
            beatmap.list = [];
            dirList.forEach(function(item2) {
                if (item2.indexOf('.osu') != -1) {
                    beatmap.list.push(item2);
                }
            });
            list.push(beatmap);
        }
    });

    result.beatmaps = list;
    res.json(result);
});

router.get('/json/:path/:osu', function(req, res) {
    var path = './public/beatmaps/' + req.params.path + '/' + req.params.osu;
    parser.parseFile(path, function(err, beatmap) {
        res.json(beatmap);
    });
});


module.exports = router;
