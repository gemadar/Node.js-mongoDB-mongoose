const express = require("express");

// Import auth
const { admin, user, adminOrUser } = require("../middlewares/auth");

// Import validator
const {
  createOrUpdateTransactionValidator,
  getDetailValidator,
} = require("../middlewares/validators/transactions");

// Import controller
const {
  createTransaction,
  getAllTransactions,
  getDetailTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactions");

// Make router
const router = express.Router();

// Make some routes
router.post("/", createOrUpdateTransactionValidator, createTransaction);
router.get("/", getAllTransactions);

router.get("/:id", getDetailValidator, getDetailTransaction);
router.put("/:id", createOrUpdateTransactionValidator, updateTransaction);
router.delete("/:id", deleteTransaction);

// Export
module.exports = router;
