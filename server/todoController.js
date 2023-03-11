const todoController = {};
const ToDoList = require('./todoModel');

todoController.getToDo = (req, res, next) => {
  ToDoList.find({})
    .then((items) => {
      res.locals.items = items;
      next();
    })
    .catch((error) => next({
      log: 'Error in todoController.getToDo',
      status: 400,
      message: error
    }));
};

todoController.createToDo = (req, res, next) => {
  const { item } = req.body;
  console.log(req.body);
  ToDoList.create({ item })
    .then((newItem) => {
      res.locals.newItem = newItem;
      next();
    })
    .catch((error) => next({
      log: 'Error in todoController.createToDo',
      status: 400,
      message: error
    }));
};

todoController.updateToDo = (req, res, next) => {
  const { id, item } = req.body;
  ToDoList.findOneAndUpdate({ _id : id }, { item },{ new: true })
    .then((updatedItem) => {
      res.locals.updatedItem = updatedItem;
      next();
    })
    .catch((error) => next({
      log: 'Error in todoController.updateToDo',
      status: 400,
      message: error
    }));
};

todoController.deleteToDo = (req, res, next) => {
  const { id } = req.body;
  ToDoList.findOneAndDelete({ _id: id })
    .then((deletedItem) => {
      res.locals.deletedItem = deletedItem;
      next();
    })
    .catch((error) => next({
      log: 'Error in todoController.deleteToDo',
      status: 400,
      message: error
    }));
}

module.exports = todoController;