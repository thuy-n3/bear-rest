//BASE SETUP
//===============================================
var express = require('express'); 
var app = express(); 
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; 

//CONNECTING DATABASE
//===============================================
var mongoose = require('mongoose'); 
mongoose.connect('mongodb://t3nguyen:n0d3b3@rs@ds053166.mlab.com:53166/bear-rest');


//ROUTES FOR API 
//===============================================
var router = express.Router(); 

router.get('/', function(req,res){
	res.json({ message: 'hooray! welcome to our api!'}); 
});

//more route here 

//REGISTER ROUTES 
//===============================================
app.use('/api', router);

//START THE SERVER
//===============================================
app.listen(port); 
console.log('Magic happens on port' + port);