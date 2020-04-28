const { createUser, getUserByUserId, updateUserById, login} = require("./user.controller");
const router = require("express").Router();

const { checkToken } = require("../../Auth/token_validation")

router.post("/",createUser)
router.get("/:id",checkToken,getUserByUserId)
router.patch("/",checkToken,updateUserById)

router.post("/login",login);
module.exports = router;