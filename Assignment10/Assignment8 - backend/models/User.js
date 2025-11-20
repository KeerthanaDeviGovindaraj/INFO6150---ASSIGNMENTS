const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Full name is required"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  imagePath: {
    type: String,
    default: null
  },
  type: {
    type: String,
    required: true,
    enum: ['admin', 'employee'],
    default: 'employee'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);