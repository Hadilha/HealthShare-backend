const mongoose = require("mongoose");
const User = require("./user.model");

const PatientSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: false,
    trim: true,
  },
  region: {
    type: String,
    trim: true,
  },

  notes: {
    type: String,
    trim: true,
  },
  profile_photo: {
    type: String,
  },
});
User.discriminator("patient", PatientSchema);
