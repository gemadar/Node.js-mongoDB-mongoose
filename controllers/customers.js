const { customer } = require("../models");

class Customers {
  async createCustomer(req, res, next) {
    try {
      const newData = await customer.create(req.body);

      let data = await customer
        .findOne({ _id: newData._id })
        .populate("customer");

      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async readAllCustomers(req, res, next) {
    try {
      let data = await customer.find();

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async readDetailCustomer(req, res, next) {
    try {
      let data = await customer.findOne({ _id: req.params.id });
      if (!data) {
        return next({ message: "Customer not found", statusCode: 404 });
      }

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async updateCustomer(req, res, next) {
    try {
      let data = await customer.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        req.body,
        {
          new: true,
        }
      );

      if (!data) {
        return next({ message: "Customer not found", statusCode: 404 });
      }

      return res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async deleteCustomer(req, res, next) {
    try {
      const data = await customer.delete({ _id: req.params.id });

      if (data.n === 0) {
        return next({ message: "Customer not found", statusCode: 404 });
      }

      res.status(200).json({ message: "Customer has been deleted" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new Customers();
