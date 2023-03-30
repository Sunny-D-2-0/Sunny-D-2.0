const mongoose = require('mongoose');
const User = require('./server/userModel.js')

// Define the MongoDB connection URI for the test database
const MONGODB_URI = 'mongodb+srv://pj:cs39@cluster.kkyleu9.mongodb.net/?retryWrites=true&w=majority';

// Connect to the test database
beforeAll(async () => {
  await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
});