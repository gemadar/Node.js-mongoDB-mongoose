const express = require("express");

// Import validator
const {
  createOrUpdateCustomerValidator,
  getDetailValidator,
} = require("../middlewares/validators/customers");

// Import controller
const {
  createCustomer,
  readAllCustomers,
  readDetailCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customers");

// Make router
const router = express.Router();

// Make some routes
router.post("/", createOrUpdateCustomerValidator, createCustomer);
router.get("/", readAllCustomers);

router.get("/:id", getDetailValidator, readDetailCustomer);
router.put("/:id", createOrUpdateCustomerValidator, updateCustomer);
router.delete("/:id", deleteCustomer);

// Export
module.exports = router;
