const { getBrand} = require("./brand.controller");
const router = require("express").Router();

const { checkToken } = require("../../Auth/token_validation");

router.get("/",checkToken,getBrand);

module.exports = router;