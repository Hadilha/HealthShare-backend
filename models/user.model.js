const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number"
          );
        }
      },
      private: true,
    },
    role: {
      type: String,
      enum: ["doctor", "patient"],
      required: true,
      default: "patient",
    },
    archived: {
      required: true,
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef User
 */
const User = mongoose.model("User", userSchema);

module.exports = User;
