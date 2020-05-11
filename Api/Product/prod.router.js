
const { createProduct, createProdpic, getAllProd,getProductByUserID,disableProduct,updateProduct,updatePicture,getPicsByProd,
        rentProdRecord,
        sellProdRecord } = require("./prod.controller");

const router = require("express").Router();
const { checkToken } = require("../../Auth/token_validation");

router.post("/",checkToken,createProduct);
router.post("/Picture",checkToken,createProdpic);
router.get("/",getAllProd);

router.get("/ByUserID/:id",checkToken,getProductByUserID);
router.patch("/ByUserID",checkToken,disableProduct);

router.get("/Picture/:id",checkToken,getPicsByProd);
router.post("/RentRecord",checkToken,rentProdRecord);

router.post("/SellRecord",checkToken,sellProdRecord);

router.patch("/UpdateProduct",checkToken,updateProduct);
router.patch("/UpdatePicture",checkToken,updatePicture);
module.exports = router;