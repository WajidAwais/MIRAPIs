const { createProduct, createProdpic, getAllProd, getRentProd, getSaleProd, getProdCat } = require("./prod.controller");
const router = require("express").Router();
const { checkToken } = require("../../Auth/token_validation");

router.post("/",checkToken,createProduct);
router.post("/Picture",checkToken,createProdpic);
router.get("/",getAllProd);
router.get("/Rent",getRentProd);
router.get("/Sale",getSaleProd);
router.get("/Cat/:id",getProdCat);

module.exports = router;