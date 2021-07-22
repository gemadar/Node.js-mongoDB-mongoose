const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const transactionSchema = new mongoose.Schema(
  {
    good: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    price: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    quantity: {
      type: Number,
      required: false,
    },
    total: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: {
      createdAt: "crearedAt",
      updatedAt: "updatedAt",
    },
  }
);

transactionSchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = mongoose.model("transaction", transactionSchema);
