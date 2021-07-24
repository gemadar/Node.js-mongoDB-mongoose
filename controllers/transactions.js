const { transaction, supplier } = require("../models");

class Transactions {
  async getAllTransactions(req, res, next) {
    try {
      let data = await transaction.find().populate("customer");

      if (data.length === 0) {
        return next({ message: "Transactions not found", statusCode: 404 });
      }

      for (let i = 0; i < data.length; i++) {
        data[i].good.supplier = await supplier.findOne({
          _id: data[i].good.supplier,
        });
      }

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async getDetailTransaction(req, res, next) {
    try {
      let data = await transaction
        .findOne({ _id: req.params.id })
        .populate("customer");

      if (!data) {
        return next({ message: "Transaction not found", statusCode: 404 });
      }

      data.good.supplier = await supplier.findOne({ _id: data.good.supplier });

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async createTransaction(req, res, next) {
    try {
      const newData = await transaction.create(req.body);

      let data = await transaction
        .findOne({ _id: newData._id })
        .populate("customer");

      data.good.supplier = await supplier.findOne({ _id: data.good.supplier });

      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async updateTransaction(req, res, next) {
    try {
      // Update data
      let data = await transaction
        .findOneAndUpdate(
          {
            _id: req.params.id,
          },
          req.body, // This is all of req.body
          {
            new: true,
          }
        )
        .populate("customer");
      // new is to return the updated transaction data
      // If no new, it will return the old data before updated

      if (!data) {
        return next({ message: "Transaction not found", statusCode: 404 });
      }

      data.good.supplier = await supplier.findOne({ _id: data.good.supplier });

      // If success
      return res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async deleteTransaction(req, res, next) {
    try {
      const data = await transaction.delete({ _id: req.params.id });

      if (data.n === 0) {
        return next({ message: "Transaction not found", statusCode: 404 });
      }

      res.status(200).json({ message: "Transaction has been deleted" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new Transactions();
