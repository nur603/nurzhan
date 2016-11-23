var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();
var PORT = process.env.PORT || 3000;
var books = [];
var booksNextId = 1;

app.use(bodyParser.json());

app.get('/', function(req, res){
	res.send('library');
});

		// GET /books
		app.get ('/books', function(req, res){
		var col = 0;
		for (var i=0; i<books.length; i++)
		{
		col=i+1;
		}
		console.log(col);
		res.send(JSON.stringify(books,null,null,10)+"\n Summ: "+col+" books");
		res.json(books);
		}
		);

		// GET /books/:id
		app.get('/books/id', function(req, res){  
	var booksId = parseInt(req.books.id, 10);
	var matchedbooks = _.findWhere(books, {id: booksId});

	if(matchedbooks){
		res.json(matchedbooks);
	}else{
		res.status(404).send();
	}
});

	// POST /books

		app.post('/books', function(req, res){
		var body = _.pick(req.body, 'name', 'author', 'price');

		if(!_.isString(body.name) || !_.isString(body.author) || !_.isNumber(body.price) ){
			return res.status(400).send();
				}
				body.id = booksNextId++;
				books.push(body);
				res.json(body);
								
				});
	//Delete/books/:id	
		app.delete('/books/:id', function(req,res){
		var booksId = parseInt(req.params.id,10);
		var matchedbooks = _.findWhere(books, {id: booksId});
		if(!matchedbooks){
		res.status(404).json("not found");
		}else{
		books = _.without(books, matchedbooks);
		res.json(matchedbooks);
		}
		console.log('Method Delete for /books/:id working');
		});
		app.listen(PORT, function(){
		console.log('Express listening on port ' + PORT + '!');
		});
