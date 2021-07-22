const { transaction } = require("../models");
const supplier = require("../models/supplier");
class Transactions {
  async createTransaction(req, res, next) {
    try {
      const newData = await transaction.create(req.body);

      const data = await transaction
        .findOne({ _id: newData._id })
        .populate("customer");

      data.good.supplier = await supplier.findOne({ _id: data.good.supplier });

      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new Transactions();
