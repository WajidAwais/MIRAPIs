const { createProduct, createProdpic, getAllProd } = require("./prod.controller");
const router = require("express").Router();

const { checkToken } = require("../../Auth/token_validation");

router.post("/",checkToken,createProduct);
router.post("/Picture",checkToken,createProdpic);
router.get("/",getAllProd);

module.exports = router;