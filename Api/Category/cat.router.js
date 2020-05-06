const { getCategory} = require("./cat.controller");
const router = require("express").Router();


router.get("/",getCategory);



module.exports = router;