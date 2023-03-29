const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const SALT_WORK_FACTOR = 10;

// User Schema
const userSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  days: [{ date: String, points: Number, activities: [{ name: String, time: Number }] }]
});

userSchema.pre('save', function (next) {
  const user = this;

  if (this.isModified('password') || this.isNew) {
    bcrypt.hash(user.password, SALT_WORK_FACTOR, function (err, hash) {
      // Store hash in your password DB.
      if (err) return next(err);
      user.password = hash;
      next();
    });
  } else {
    return next();
  }
});

userSchema.methods.comparePassword = async function(pass) {
  return await bcrypt.compare(pass, this.password);
};

const User = mongoose.model('users', userSchema);
module.exports = User;

