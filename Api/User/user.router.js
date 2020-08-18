const { createUser, getUserByUserId, updateUserById, login, instructordata, getUser,getCategory, getEmail, ProfileReview, AddInstructor, UpdateUserType, getInstructorByUserId, getUserReviewsByUserId, getUserRatingByUserId, getUserPasswordById, updatePasswordById, Forgot, UpdatePasswordByEmail} = require("./user.controller");
const router = require("express").Router();

const { checkToken } = require("../../Auth/token_validation");

router.post("/",createUser);
router.get("/",getUser);
router.get("/:id",getUserByUserId);
router.patch("/",checkToken,updateUserById);
router.get("/cat",checkToken,getCategory);
router.post("/Email",getEmail);

router.post("/ProfileReview",checkToken,ProfileReview);

router.post("/AddInstructor",checkToken,AddInstructor);
router.patch("/UpdateUserType",checkToken,UpdateUserType);
router.get("/GetInstructor/:id",getInstructorByUserId);

router.post("/instructordata",instructordata);

router.get("/GetReviews/:id",getUserReviewsByUserId);
router.get("/GetRating/:id",getUserRatingByUserId);

router.post("/Password",checkToken,getUserPasswordById);
router.patch("/UpdatePassword",checkToken,updatePasswordById);

router.patch("/UpdatePasswordByEmail",UpdatePasswordByEmail);

router.post("/ForgotPassword",Forgot);



router.post("/login",login);

module.exports = router;