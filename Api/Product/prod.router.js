const { createProduct, createProdpic, getAllProd,getProductByUserID,disableProduct } = require("./prod.controller");
const router = require("express").Router();

const { checkToken } = require("../../Auth/token_validation");

router.post("/",checkToken,createProduct);
router.post("/Picture",checkToken,createProdpic);
router.get("/",getAllProd);
router.get("/ByUserID/:id",checkToken,getProductByUserID);
router.patch("/ByUserID",checkToken,disableProduct)

module.exports = router;