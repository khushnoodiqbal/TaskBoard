var express = require('express');
var router = express.Router();

const {create, get,getAll,update,Delete} = require("../controllers/adminController")
const {
    createAdmin,
    getAdmin,
    updateAdmin,
    DeleteAdmin,
  } = require("../validations/adminValidator");
router.post('/create',createAdmin,create);
router.get('/get',getAdmin,get);
router.get('/get-all',getAll);
router.put('/update',updateAdmin,update)
router.delete('/delete',DeleteAdmin,Delete)


module.exports = router;