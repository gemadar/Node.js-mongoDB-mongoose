const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
      get: getPhoto,
    },
  },
  {
    timestamps: {
      createdAt: "crearedAt",
      updatedAt: "updatedAt",
    },
  }
);

function getPhoto(photo) {
  if (!photo || photo.include("https") || photo.includes("http")) {
    return photo;
  }

  return `/images/customers/${photo}`;
}

customerSchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = mongoose.model("customer", customerSchema);
