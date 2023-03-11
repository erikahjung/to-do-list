const express = require('express');
const todoRouter = express.Router();
const todoController = require('./todoController');

todoRouter.get('/',
  todoController.getToDo,
  (req, res) => res.status(200).json(res.locals.items),
);

todoRouter.post('/',
  todoController.createToDo,
  (req, res) => res.status(200).json(res.locals.newItem),
);

todoRouter.put('/',
  todoController.updateToDo,
  (req, res) => res.status(200).json(res.locals.updatedItem),
);

todoRouter.delete('/',
  todoController.deleteToDo,
  (req, res) => res.status(200).json(res.locals.deletedItem),
);

module.exports = todoRouter;