const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    email: String,
  },
  {
    discriminatorKey: "role",
    timestamps: true,
  }
);

const User = mongoose.model("users", userSchema);
module.exports = User;
