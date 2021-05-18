const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  role_id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
});

module.exports = mongoose.model("user", userSchema);
