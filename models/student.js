const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    first_name: { type: String, required: true },
    second_name: { type: String, required: true },
    date_of_birth: { type: Date },
    mobile: { type: String, required: true },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    }
});

//Export model
module.exports = mongoose.model("Student", StudentSchema);
