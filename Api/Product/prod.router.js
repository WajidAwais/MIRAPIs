
const { createProduct, createProdpic, getAllProd,getProductByUserID,disableProduct,updateProduct,updatePicture,getPicsByProd,
        rentProdRecord,
        sellProdRecord,
        onRentProductsByUserId,
        ProductsHistoryRentee,
        onRentProductsByRentee,
        updateRentRecordStatus,
        ProductsHistoryByUserId,
        BuyProductsHistory,
        SellProductsHistory,
        ProductReview,
        getProductRatingByUserId,
        getProductReviewsByUserId,
        DeletePics,
        getAllProds
    } = require("./prod.controller");

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

router.get("/OnRentProducts/:id",checkToken,onRentProductsByUserId);
router.get("/ProductsHistory/:id",checkToken,ProductsHistoryByUserId);

router.get("/ProductsRenteeHistory/:id",checkToken,ProductsHistoryRentee);
router.get("/OnRentProductsRentee/:id",checkToken,onRentProductsByRentee);
router.patch("/UpdateRentRecord",checkToken,updateRentRecordStatus);

router.get("/BuyHistory/:id",checkToken,BuyProductsHistory);
router.get("/SellHistory/:id",checkToken,SellProductsHistory);

router.post("/ProductReview",checkToken,ProductReview);

router.get("/GetReviews/:id",getProductReviewsByUserId);
router.get("/GetRating/:id",getProductRatingByUserId);

router.delete("/DeletePics/:id",DeletePics);

router.get("/All",checkToken,getAllProds);

module.exports = router;