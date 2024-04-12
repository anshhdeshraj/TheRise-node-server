const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstName:{
    type:String,
    require:true
  },
  lastName:{
    type:String,
    require:true
  },
  yearOfBirth:{
    type:String,
    require:false
  },
  quotes:{
    type : [{quote:String, author: String}]
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

