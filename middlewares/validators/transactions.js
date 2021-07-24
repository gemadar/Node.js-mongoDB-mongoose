const validator = require("validator");
const mongoose = require("mongoose");
const { good, customer } = require("../../models");

exports.getDetailValidator = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return next({ message: "id is not valid", statusCode: 400 });
    }

    next();
  } catch (error) {
    next(error);
  }
};

exports.createOrUpdateTransactionValidator = async (req, res, next) => {
  try {
    const errorMessages = [];

    if (!validator.isInt(req.body.quantity)) {
      errorMessages.push("quantity must be number (integer");
    }

    if (!mongoose.Types.ObjectId.isValid(req.body.id_good)) {
      errorMessages.push("id_good is not valid");
    }

    if (!mongoose.Types.ObjectId.isValid(req.body.id_customer)) {
      errorMessages.push("id_customer is not valid");
    }

    if (errorMessages.length > 0) {
      return next({ messages: errorMessages, statusCode: 400 });
    }

    /* Find price and validate customer is exist */
    // Find good and customer
    const data = await Promise.all([
      good.findOne({ _id: req.body.id_good }),
      customer.findOne({ _id: req.body.id_customer }),
    ]);

    if (!data[0] || !data[1]) {
      errorMessages.push(`Good or Customer not found`);
    }

    if (errorMessages.length > 0) {
      return next({ messages: errorMessages, statusCode: 400 });
    }

    req.body.total = parseInt(req.body.quantity) * parseFloat(data[0].price);
    req.body.good = data[0];
    req.body.customer = req.body.id_customer;

    next();
  } catch (error) {
    next(error);
  }
};
