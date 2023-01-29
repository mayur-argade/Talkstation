const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
    },
    activated: {
      type: Boolean,
      default: false,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
