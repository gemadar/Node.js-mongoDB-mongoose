const validator = require("validator");
const path = require("path");
const crypto = require("crypto");
const { promisify } = require("util");

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

    if (req.files) {
      // req.files.image is come from key (file) in postman
      const file = req.files.image;

      // Make sure image is photo
      if (!file.mimetype.startsWith("image")) {
        errorMessages.push("File must be an image");
      }

      // Check file size (max 5MB)
      if (file.size > 5000000) {
        errorMessages.push("Image must be less than 5MB");
      }

      // If error
      if (errorMessages.length > 0) {
        return next({ statusCode: 400, messages: errorMessages });
      }

      // Create custom filename
      let fileName = crypto.randomBytes(16).toString("hex");

      // Rename the file
      file.name = `${fileName}${path.parse(file.name).ext}`;

      // Make file.mv to promise
      const move = promisify(file.mv);

      // Upload image to /public/images
      await move(`./public/images/customers/${file.name}`);

      // assign req.body.image with file.name
      req.body.image = file.name;
    }

    next();
  } catch (error) {
    next(error);
  }
};
