const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      set: setPassword,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      required: true,
      default: "user",
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

function setPassword(password) {
  return bcrypt.hashSync(password, 10);
}

userSchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = mongoose.model("user", userSchema);
