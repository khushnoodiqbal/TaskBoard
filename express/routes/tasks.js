var express = require("express");
var router = express.Router();

const {
  create,
  get,
  getALL,
  update,
  Delete,
} = require("../controllers/taskController");

const {
  createTask,
  getTask,
  updateTask,
  DeleteTask,
} = require("../validations/taskValidator");

/* GET users listing. */
router.post("/create", createTask, create);

router.get("/get-all", getALL);
router.get("/get", getTask, get);
router.put("/update", updateTask, update);
router.delete("/delete", DeleteTask, Delete);

module.exports = router;
