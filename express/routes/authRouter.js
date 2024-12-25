var express = require("express");
var router = express.Router();
const { login } = require("../controllers/authController");
const { Login } = require("../validations/authValidation")

router.get("/login", Login, login);

module.exports = router;
