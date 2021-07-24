const express = require("express");

const { createOrUpdateGoodValidator, getOneValidator } = require("../middlewares/validators/goods");
const { createGood, getAllGoods, getOneGood, editGood, deleteGood } = require("../controllers/goods");

const router = express.Router();

router.route("/").post(createOrUpdateGoodValidator, createGood).get(getAllGoods);

router.route("/:id").get(getOneValidator, getOneGood).put(editGood).delete(deleteGood);

module.exports = router;
