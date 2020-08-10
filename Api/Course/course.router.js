const { createCourse, getAllCourses, AddLesson, getLessonByCourseID, getTotalVideosByCourseID,enrollCourse,disableCourse, getEnrolledCourse, CourseReview,
        getUserID,
        getCourseRatingByUserId,
        getCourseReviewsByUserId,
    } = require("./course.controller");
const router = require("express").Router();

const { checkToken } = require("../../Auth/token_validation");
const { getCourseRatingById } = require("./course.service");

router.post("/",checkToken,createCourse);
router.get("/",getAllCourses);

router.patch("/ByCourseID",checkToken,disableCourse);

router.post("/AddLesson",checkToken,AddLesson);

router.get("/LessonByCourseId/:id",checkToken,getLessonByCourseID);
router.get("/TotalVideos/:id",getTotalVideosByCourseID);
router.post("/EnrollCourse",checkToken,enrollCourse);

router.get("/EnrolledCourse/:id",checkToken,getEnrolledCourse);

router.post("/CourseReview",checkToken,CourseReview);

router.get("/UserId/:id",checkToken,getUserID);

router.get("/GetReviews/:id",getCourseReviewsByUserId);
router.get("/GetRating/:id",getCourseRatingByUserId);

module.exports = router;