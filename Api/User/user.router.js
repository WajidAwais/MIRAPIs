const { createUser, getUserByUserId, updateUserById, login, getCategory, getEmail, ProfileReview, AddInstructor, UpdateUserType, getInstructorByUserId} = require("./user.controller");
const router = require("express").Router();

const { checkToken } = require("../../Auth/token_validation");

router.post("/",createUser);
router.get("/:id",getUserByUserId);
router.patch("/",checkToken,updateUserById);
router.get("/cat",checkToken,getCategory);
router.post("/Email",getEmail);

router.post("/ProfileReview",checkToken,ProfileReview);

router.post("/AddInstructor",checkToken,AddInstructor);
router.patch("/UpdateUserType",checkToken,UpdateUserType);
router.get("/GetInstructor/:id",getInstructorByUserId);

router.post("/login",login);
module.exports = router;