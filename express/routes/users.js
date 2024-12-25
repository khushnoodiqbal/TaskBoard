var express = require("express");
var router = express.Router();

const {
  create,
  get,
  getALL,
  update,
  Delete,
} = require("../controllers/userController");

const {
  createUser,
  getUser,
  updateUser,
  DeleteUser,
} = require("../validations/userValidator");
const middleware = require("../middleware")

/* GET users listing. */
router.post("/create", createUser, create);

// router.get("/get-all",middleware, getALL);
router.get("/get-all", getALL);
router.get("/get", getUser, get);
router.put("/update", updateUser, update);
router.delete("/delete", DeleteUser, Delete);

module.exports = router;
