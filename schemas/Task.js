const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IMPORTANCE_TYPES = ["Low", "Med", "High"];

const Task = new Schema({
  description: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    default: "AMOS",
  },
  active: {
    type: Boolean,
    default: true,
  },
  dueDate: {
    type: Date,
    default: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
  },
  importance: {
    type: String,
    default: IMPORTANCE_TYPES[0],
  },
  added: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Task", Task);
