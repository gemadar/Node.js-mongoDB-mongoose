const validator = require("validator");
const { promisify } = require("util");

exports.supplierValidator = async (req, res, next) => {
  try {
    const errorMessages = [];

    if (!validator.isAlpha(req.body.name, "en-US", { ignore: " " })) {
      errorMessages.push("Please use letters only");
    }

    if (validator.isEmpty(req.body.name)) {
      errorMessages.push("Name cannot be empty!");
    }

    if (errorMessages.length > 0) {
      return next({ messages: errorMessages, statusCode: 404 });
    }

    if (req.files) {
      const file = req.files.photo;

      if (!file.mimetype.startsWith("image")) {
        errorMessages.push("Format file must be image");
      }

      if (file.size > 1000000) {
        errorMessages.push("Only read image under 1MB");
      }

      if (errorMessages.length > 0) {
        return next({ messages: errorMessages, statusCode: 400 });
      }

      file.name = new Date().getTime() + "_" + file.name;

      const move = promisify(file.mv);

      await move(`./public/images/suppliers/${file.name}`);

      req.body.photo = file.name;
    }

    req.body = {
      name: req.body.name,
    };

    next();
  } catch (error) {
    next(error);
  }
};
