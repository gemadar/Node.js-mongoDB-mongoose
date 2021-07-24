const validator = require("validator");
const mongoose = require("mongoose");
const { good, supplier } = require("../../models");
const path = require("path");
const crypto = require("crypto");
const { promisify } = require("util");

exports.getOneValidator = async (req, res, next) => {
	try {
		if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
			return next({ message: "id is not valid", statusCode: 400 });
		}

		next();
	} catch (error) {
		next(error);
	}
};

exports.createOrUpdateGoodValidator = async (req, res, next) => {
	try {
		const errorMessages = [];

		if (!validator.isInt(req.body.price)) {
			errorMessages.push("price must be a number");
		}

		if (errorMessages.length > 0) {
			return next({ statusCode: 400, messages: errorMessages });
		}

		if (req.files) {
			// req.files.image is come from key (file) in postman
			const file = req.files.image;

			// Make sure image is photo
			if (!file.mimetype.startsWith("image")) {
				errorMessages.push("File must be an image");
			}

			// Check file size (max 1MB)
			if (file.size > 1000000) {
				errorMessages.push("Image must be less than 1MB");
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
			await move(`./public/images/${file.name}`);

			// assign req.body.image with file.name
			req.body.image = file.name;
		}

		req.body.name = req.body.name;
		req.body.price = req.body.price;

		next();
	} catch (error) {
		next(error);
	}
};
