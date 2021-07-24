const express = require("express");
// make router
const router = express.Router();

// import validator
const { supplierValidator } = require("../middlewares/validators/suppliers");

// import controller
const {
  createSupplier,
  getAllSupplier,
  getDetailSupplier,
  updateSupplier,
  deleteSupplier,
} = require("../controllers/suppliers");

// make the route
router.route("/").post(supplierValidator, createSupplier).get(getAllSupplier);
router
  .route("/:id")
  .get(getDetailSupplier)
  .put(supplierValidator, updateSupplier)
  .delete(deleteSupplier);

// export
module.exports = router;
