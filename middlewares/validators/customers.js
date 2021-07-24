const validator = require("validator");
const mongoose = require("mongoose");

exports.getDetailValidator = async (req, res, next) => {
  try {
    if (!validator(req.params.id)) {
      return next({ message: "id is not valid", statusCode: 400 });
    }

    next();
  } catch (error) {
    next(error);
  }
};

exports.createOrUpdateCustomerValidator = async (req, res, next) => {
  try {
    if (!validator.isAlpha(req.body.name, "en-US", { ignore: " " })) {
      return next({
        statusCode: 400,
        message: "Customer name can only contains letters",
      });
    }

    if (!validator.isAlpha(req.body.name, "en-US", { ignore: " " })) {
      return next({
        statusCode: 400,
        message: "Customer name can only contains letters",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};
