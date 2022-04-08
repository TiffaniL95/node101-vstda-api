const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

let todo = [
	{
		todoItemId: 0,
		name: 'an item',
		priority: 3,
		completed: false
	},
	{
		todoItemId: 1,
		name: 'another item',
		priority: 2,
		completed: false
	},
	{
		todoItemId: 2,
		name: 'a done item',
		priority: 1,
		completed: true
	}
];

app.set('json spaces', 1)

app.use(bodyParser.json())

app.use(morgan('dev'))

app.get('/', (req, res) => {

   res.json({"status":"ok"});

});

app.get('/api/TodoItems', (req, res) => {

   res.send(todo);

});

app.get('/api/TodoItems/:number', (req, res) => {
	
	let searchTodo = todo.findIndex(item => item.todoItemId == req.params.number)

	if(searchTodo >= 0){
		res.send(todo[searchTodo])
	} else {
		res.status(404).send('Todo Item Not Found')
	}

});

app.get('*', (req, res) => {
	res.status(404).send('Page Not Found')
});

app.post('/api/TodoItems', (req, res) => {

	let existingTodo = todo.findIndex(item => item.todoItemId == req.body.todoItemId)

	existingTodo >= 0 ? todo.splice(existingTodo, 1, req.body) : todo.push(req.body)
	res.status(201).send(req.body)

});

app.delete('/api/TodoItems/:number', (req, res) => {
	
	let existingTodo = todo.findIndex(item => item.todoItemId == req.params.number)
	
	if(existingTodo >= 0){ 
		let deleted = todo.splice(existingTodo, 1)
		res.send(deleted[0])
	} else {
		res.status(404).send('Todo Item Not Found')
	}

});
module.exports = app;
