var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: String,
  password: String,
});

UserSchema.statics.encrypt = function(password) {
  return bcrypt.hashSync(password, 10);
};

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

mongoose.model('User', UserSchema);
