const mongoose = require("mongoose");
const User = require("./user.model");

const DoctorSchema = mongoose.Schema({
  age: {
    type: Number,
    min: 25,
    max: 80,
    validate: {
      validator: Number.isInteger,
      message: (props) => `${props.value} is not an integer value for age.`,
    },
    trim: true,
  },
  speciality: { type: [String], required: true, trim: true },
  contactNumber: {
    type: String,
    required: false,
    trim: true,

    validate: {
      validator: function (v) {
        return /^[0-9]{8}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
      trim: true,
    },
  },
  address: { type: String, required: false },
  isAvailable: { type: Boolean, default: true },
});
User.discriminator("doctor", DoctorSchema);
