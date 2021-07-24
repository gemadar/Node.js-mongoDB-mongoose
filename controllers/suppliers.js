const { supplier } = require("../models");

class Supplier {
  async createSupplier(req, res, next) {
    try {
      const newData = await supplier.create(req.body);

      const dataSupplier = await supplier.findOne({ _id: newData._id });

      res.status(201).json({ dataSupplier });
    } catch (error) {
      next(error);
    }
  }

  async getAllSupplier(req, res, next) {
    try {
      const dataSupplier = await supplier.find();

      if (dataSupplier.length === 0) {
        return next({ message: "Supplier not found", statusCode: 404 });
      }

      res.status(200).json({ dataSupplier });
    } catch (error) {
      next(error);
    }
  }

  async getDetailSupplier(req, res, next) {
    try {
      const dataSupplier = await supplier.findOne({ _id: req.params.id });

      if (!dataSupplier) {
        return next({ message: "Supplier not found", statusCode: 404 });
      }

      res.status(200).json({ dataSupplier });
    } catch (error) {
      next(error);
    }
  }

  async updateSupplier(req, res, next) {
    try {
      const newSupplier = await supplier.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );

      if (!newSupplier) {
        return next({ message: "Supplier not found", statusCode: 404 });
      }

      res.status(201).json({ newSupplier });
    } catch (error) {
      next(error);
    }
  }

  async deleteSupplier(req, res, next) {
    try {
      const dataSupplier = await supplier.delete({
        _id: req.params.id,
      });

      if (dataSupplier.nModified === 0) {
        return next({ meesage: "Supplier not found", statusCode: 404 });
      }

      res.status(200).json({
        message: `Supplier with id: ${req.params.id} successfully deleted`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new Supplier();
