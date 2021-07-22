const mongoose = require("mongoose");

// Connect express to MongoDB with mongoose
mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true, // Must be added
    useNewUrlParser: true, // Must be added
    useCreateIndex: true, // Use to enable unique data type
    useFindAndModify: false, // Use findOneAndUpdate instead of findAndModify
  })
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.error(err));

exports.good = require("./good");
exports.customer = require("./customer");
exports.supplier = require("./supplier");
exports.transaction = require("./transaction");
