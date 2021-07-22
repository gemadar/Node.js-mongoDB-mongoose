const express = require("express");

const {
  createOrUpdateTransactionValidator,
} = require("../middlewares/validators/transactions");

const { createTransaction } = require("../controllers/transactions");

const router = express.Router();

router.post("/", createOrUpdateTransactionValidator, createTransaction);

module.exports = router;
