const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  todo_name: {
    type: String,
    required: true,
  },
  todo_desc: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Todo", todoSchema);
