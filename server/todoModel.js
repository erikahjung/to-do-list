const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  item: {type: String, required: true}
});

const todoList = mongoose.model('todo', todoSchema);

module.exports = todoList;