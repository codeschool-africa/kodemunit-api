const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  first_name: { type: String, required: true },
  second_name: { type: String, required: true },
  date_of_birth: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true, unique: true }
});

module.exports = mongoose.model("Student", studentSchema);
