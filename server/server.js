const express = require('express');
const mongoose = require('mongoose');
const userController = require('./controllers/userController');
const path = require('path');

const URI = process.env.NODE_ENV !== 'test' ? 
'mongodb+srv://pj:cs39@cluster.kkyleu9.mongodb.net/SunnyD2?retryWrites=true&w=majority' : 
'mongodb+srv://pj:cs39@cluster.kkyleu9.mongodb.net/?retryWrites=true&w=majority';


// Data Base
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

// App Router
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const api = express.Router();
app.use('/api', api);

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
  app.use('/build', express.static(path.join(__dirname, '../build')));
  app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../index.html'))
});
}

//Sign Up
api.post('/signup', userController.createUser, (req, res) => {
  return res.status(200).json(res.locals.created);
});

//Log In 
api.post('/login', userController.logIn, (req, res) => {
  return res.status(200).json(res.locals.userInfo);
});

//Update user points
api.patch('/update', userController.updateUser, (req, res) => {
  return res.sendStatus(200);
});


// Unknown route handler
app.use((req, res) => res.sendStatus(404));

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});

module.exports = app;
