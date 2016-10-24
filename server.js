//BASE SETUP
//===============================================
var express = require('express'); 
var app = express(); 
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 61676; 


//CONNECTING DATABASE
//===============================================
var mongoose = require('mongoose'); 

//change to process.env.MONGOLAB_URI. when pushing to github 

var Bear = require('./app/models/bear.js');


//ROUTES FOR API 
//===============================================
var router = express.Router(); 

//middleware for all requests 
router.use(function(req, res, next){
	console.log('Something is happening.');
	next();
})

//test routes (GET http://localhost:61676/api)
router.get('/', function(req, res){
	res.json({ message: 'hooray! welcome to our api!'}); 
});

//more route here 



//routes that end in '/bears'
router.route('/bears')

	//(POST http://localhost:61676/api/bears)
	.post(function(req, res){

		var bear = new Bear();
		bear.name = req.body.name; 

		bear.save(function(err){
			if(err)
				res.send(err);

			res.json({ message: 'Bear created' });
		});
	})

	//(GET http://localhost:61676/api/bears)
	.get(function(req, res){

		Bear.find(function(err, bears){
			if(err)
				res.send(err);

			res.json(bears);
		});
	});

//routes that end in '/bears/:bear_id'
router.route('/bears/:bear_id')

	//GET bear with id (http://localhost:61676/api/bears/:bear_id)
	.get(function(req, res){

		Bear.findById(req.params.bear_id, function(err, bear){
			if(err)
				res.send(err);
			res.json(bear);
		});
	})

	//update bear with id (PUT http://localhost:61676/api/bears/:bear_id)
	.put(function(req, res){

		Bear.findById(req.params.bear_id, function(err, bear){

			if(err)
				res.send(err);

			bear.name = req.body.name; //update bear info

			bear.save(function(err){
				if(err)
					res.send(err); 

				res.json({ message: 'Bear update!' });
			});
		});
	})

	//delete the bear with id (DELETE http://localhost:61676/bears/:bear_id)
	.delete(function(req, res){
		Bear.remove({
			_id: req.params.bear_id
		}, function(err, bear){
			if(err)
				res.send(err);

			res.json({ message: 'Successfully deleted!'});

		});
	});


//REGISTER ROUTES 
//===============================================
app.use('/api', router);

//START THE SERVER
//===============================================
app.listen(port); 
console.log('Magic happens on port' + port);