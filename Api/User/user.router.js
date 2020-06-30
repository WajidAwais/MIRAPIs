const { createUser, getUserByUserId, updateUserById, login, getCategory, getEmail} = require("./user.controller");
const router = require("express").Router();

const { checkToken } = require("../../Auth/token_validation");

router.post("/",createUser);
router.get("/:id",getUserByUserId);
router.patch("/",checkToken,updateUserById);
router.get("/cat",checkToken,getCategory);
router.post("/Email",getEmail);


router.post("/login",login);
module.exports = router;