const express = require("express");

const { signup, signin } = require("../middlewares/auth");

const {
  signUpValidator,
  signInValidator,
} = require("../middlewares/validators/auth");
const { getToken } = require("../controllers/auth");

const router = express.Router();

router.post("/signup", signUpValidator, signup, getToken);
router.post("/signin", signInValidator, signin, getToken);

module.exports = router;
