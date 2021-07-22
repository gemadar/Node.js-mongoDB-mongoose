const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const goodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    photo: {
      type: String,
      required: false,
      get: getPhoto,
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "supplier",
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

  return `/images/goods/${photo}`;
}

goodSchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = mongoose.model("good", goodSchema);
