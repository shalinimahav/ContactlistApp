var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('ContactlistApp', ['ContactlistApp']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.get('/xyz', function(req, res){

	console.log("I receieved a GET request");
	db.ContactlistApp.find(function (err, listOfContacts) {
		console.log(listOfContacts);
		res.json(listOfContacts);
	});
});

app.post('/xyz',function(req, res){
	console.log(req.body);
	db.ContactlistApp.insert(req.body, function(err, doc){
		res.json(doc);
	})
});

app.delete('/xyz/:id', function(req, res){
	var id = req.params.id;
	console.log(id);
		db.ContactlistApp.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
				res.json(doc);
		})

});

app.get('/xyz/:id', function(req, res){
	var id = req.params.id;
	console.log(id);
		db.ContactlistApp.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
				res.json(doc);
		})

});

app.put('/xyz/:id', function(req, res){
	var id = req.params.id;
	console.log(req.body);
	db.ContactlistApp.findAndModify(
			{
				query:  {
							_id: mongojs.ObjectId(id)
				},
				update: {
							$set:   {
										name: req.body.name, 
										email: req.body.email, 
										number: req.body.number
									}
				},
				new: true
			}, 
			function(err, doc){
				res.json(doc);
			});
	
});

// var req = {
// 	params: {
// 		id: 877326847362
// 	},
// 	body: {
// 		name: 'jegdjhsgdjh',
// 		email: 'wdwudx@jkebedjkde',
// 		number: 76382874634
// 	}
// }

app.listen(3000);
console.log('server running on port 3000');