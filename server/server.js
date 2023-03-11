require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;

const todoRouter = require('./todoRouter');

const mongoose = require('mongoose');
const URI = "mongodb+srv://erikahjung:mushroom@cluster0.eanhbnd.mongodb.net/?retryWrites=true&w=majority";
// const URI = process.env.MONGOOSE_URI;
// console.log(URI);
mongoose.connect(URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'todoList'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use('/', express.static(path.join(__dirname, '../build')));

app.use('/todo', todoRouter);

//unknown route handler
app.use((req, res) => {
  return res.status(404).send('Page Not Found.');
})

//global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' }
  }
  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
})

//start the server on PORT
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}...`));

//not necessary since we do not need to import app anywhere
module.exports = app;