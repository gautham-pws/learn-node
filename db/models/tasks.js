const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  isComplete: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
});

const Tasks = mongoose.model("TaskSchema", taskSchema);

module.exports = Tasks;
