const { good, supplier } = require("../models");

class Goods {
	async createGood(req, res, next) {
		try {
			const newGood = await good.create(req.body);
			let data = await good.findOne({ _id: newGood._id }).populated("supplier");

			res.status(201).json({ data });
		} catch (error) {
			next(error);
		}
	}

	async getAllGoods(req, res, next) {
		try {
			let data = await good.find().populate("supplier");

			if (data.length === 0) {
				return next({ message: "Goods not found", statusCode: 404 });
			}

			for (let i = 0; i < data.length; i++) {
				data[i].supplier = await supplier.findOne({
					_id: data[i].supplier,
				});
			}

			res.status(200).json({ data });
		} catch (error) {
			next(error);
		}
	}

	async getOneGood(req, res, next) {
		try {
			let data = await (await good.findOne({ _id: req.params.id })).populated("supplier");

			if (!data) {
				return next({ message: "good not found", statusCode: 404 });
			}

			data.supplier = await supplier.findOne({ _id: data.supplier });

			res.status(200).json({ data });
		} catch (error) {
			next(error);
		}
	}

	async editGood(req, res, next) {
		try {
			let data = await (await good.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })).populate("supplier");

			if (!data) {
				return next({ message: "Good not found", statusCode: 404 });
			}

			data.supplier = await supplier.findOne({ _id: data.supplier });

			return res.status(201).json({ data });
		} catch (error) {
			next(error);
		}
	}

	async deleteGood(req, res, next) {
		try {
			const data = await good.delete({ _id: req.params.id });

			if (data.n === 0) {
				return next({ message: "good not found", statusCode: 404 });
			}

			res.status(200).json({ message: `Good with id ${req.params.id} has been deleted` });
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new Goods();
