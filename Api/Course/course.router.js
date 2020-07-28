const { createCourse } = require("./course.controller");
const router = require("express").Router();

const { checkToken } = require("../../Auth/token_validation");

router.post("/",createCourse);

module.exports = router;