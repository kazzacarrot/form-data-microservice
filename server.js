var express = require("express");
var path = require("path")
var app = express();
var port = process.env.PORT || 8080;
var pug = require("pug");
var multer = require('multer')
var upload = multer({dest: "uploads/"});
module.exports = app;

app.listen(port, function(){
    console.log("listening on port %s", port);
})

app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'templates'));

app.post('/', upload.single('theirFile'), function (req, res, next) {
    // req.file is the 'theirFile' file 
    res.json({size: req.file.size});
})


app.get("/", function(req, res){
    res.render("index.pug");
})
