const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const todos = [];

app.use(bodyParser.json());
function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

app.post('/todos', (req, res) => {
  const newTodo = req.body;
  newTodo.id = generateId();
  todos.push(newTodo);
  res.status(201).json(newTodo);
});


app.get('/todos', (req, res) => {
  res.status(200).json(todos);
});

app.get('/todos/:id', (req, res) => {
  const todoId = req.params.id;
  const todo = todos.find((t) => t.id === todoId);
  if (todo) {
    res.status(200).json(todo);
  } else {
    res.status(404).json({ error: 'ToDo not found' });
  }
});

app.put('/todos/:id', (req, res) => {
  const todoId = req.params.id;
  const updatedTodo = req.body;
  const index = todos.findIndex((t) => t.id === todoId);
  if (index !== -1) {
    updatedTodo.id = todoId;
    todos[index] = updatedTodo;
    res.status(200).json(updatedTodo);
  } else {
    res.status(404).json({ error: 'ToDo not found' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});