const pool = require("../../config/database");

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `insert into course(course_id, instructor_id, category_id, title, description, date_added, status, price, course_pic)
            values (?,?,?,?,?,?,?,?,?)`,
            [
                ,
                data.instructorid,
                data.catid,
                data.title,
                data.description,
                data.dateadded,
                1,
                data.price,
                data.picture
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getcourses: callBack => {
        pool.query(
            `select c.course_id,c.instructor_id,c.category_id,c.title,c.description,LEFT(c.date_added,10) AS date_added,IF(c.status=1,'active','inactive') as status, c.price, c.course_pic from course c where c.status=1 ORDER BY c.course_id DESC`,
            [],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateCourseStatus: (data, callBack) => {
        pool.query(
            `update course set status=? where course_id = ?`,
            [
                data.status,
                data.courseid
            ],

            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );

    },
    createLesson: (data, callBack) => {
        pool.query(
            `insert into lesson(lesson_id, title, status, date_added, video_file_name, course_id)
            values (?,?,?,?,?,?)`,
            [
                ,
                data.title,
                data.status,
                data.dateadded,
                data.videofilename,
                data.courseid
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getLessonByCourseId: (courseid, callBack) => {
        pool.query(
            `select l.lesson_id,l.title,l.status,LEFT(l.date_added,10) AS date_added, l.video_file_name from lesson l where l.course_id=? and l.status=1 ORDER BY l.lesson_id DESC`,
            [courseid],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getTotalVideos: (courseid, callBack) => {
        pool.query(
            `select COUNT(lesson_id) as totalVideos from lesson where course_id=?`,
            [courseid],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    enrollcourse: (data, callBack) => {
        pool.query(
            `insert into enroll_course(enroll_id, student_id, course_id, enroll_date)
            values (?,?,?,?)`,
            [
                ,
                data.studentid,
                data.courseid,
                data.dateadded
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getEnrollCourse: (userid, callBack) => {
        pool.query(
            `select e.enroll_id, e.student_id,LEFT(e.enroll_date,10) AS enroll_date, c.* from enroll_course e join course c on(e.course_id=c.course_id) where e.student_id=?`,
            [userid],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    courseReview: (data, callBack) => {
        pool.query(
            `insert into course_review(review_id, course_id, reviewer_id, rating, comment, date_added)
            values (?,?,?,?,?,?)`,
            [
                ,
                data.courseid,
                data.reviewerid,
                data.rating,
                data.comment,
                data.dateadded
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUserId: (instructorid, callBack) => {
        pool.query(
            `select user_id from instructor where instructor_id=?`,
            [instructorid],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getCourseReviewsById: (id, callBack) => {
        pool.query(
            `select review_id,reviewer_id,comment,rating,LEFT(date_added,10) as date_added from course_review where course_id= ?`,
            [id],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getCourseRatingById: (id, callBack) => {
        pool.query(
            `select AVG(rating) as rating from course_review where course_id= ?`,
            [id],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
};