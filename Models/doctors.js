const mongoose = require("mongoose");
const User = require("./users");

const doctorschema = mongoose.Schema(
  {
    age: {
      type: Number,
      min: 25,
      max: 80,
      validate: {
        validator: Number.isInteger,
        message: (props) => `${props.value} is not an integer value for age.`,
      },
    },
    speciality: { type: [String], required: true },
    contactNumber: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^[0-9]{8}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    address: { type: String, required: false },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = User.discriminator("doctors", doctorschema);
