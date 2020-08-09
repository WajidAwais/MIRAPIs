const pool = require("../../config/database");

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `insert into user(user_id, full_name, user_type, email, password, phone, address, gender, status, avatar)
            values (?,?,?,?,?,?,?,?,?,?)`,
            [
                ,
                data.fullname,
                data.usertype,
                data.email,
                data.password,
                data.phone,
                data.address,
                data.gender,
                1,
                data.avatar
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
        
    },
    getUserEmail: (email, callBack) => {
        pool.query(
            `select email from user where email=?`,
            [email],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    getUserById: (id, callBack) => {
        pool.query(
            `select * from user where user_id= ?`,
            [id],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    updateUser: (data, callBack) => {
        pool.query(
            `update user set full_name=?, email=?, phone=?, avatar=?,address=?,about=? where user_id = ?`,
            [
                data.fullname,
                data.email,
                data.phone,
                data.avatar,
                data.address,
                data.about,
                data.user_id
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
        
    },
    getUserByEmail: (email, callBack) => {
        pool.query(
            `select * from user where email=?`,
            [email],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    getInstructorByEmail: (email, callBack) => {
        pool.query(
            `select u.*, i.instructor_id, i.expertise, i.experience, i.description from user u join instructor i on (u.user_id=i.user_id) where email=?`,
            [email],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    getCategories: callBack => {
        pool.query(
            `select * from category where cat_status=1`,
            [],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    profileReview: (data, callBack) => {
        pool.query(
            `insert into profile_review(review_id, user_id, reviewer_id, rating, comment, date_added)
            values (?,?,?,?,?,?)`,
            [
                ,
                data.userid,
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
    addInstructor: (data, callBack) => {
        pool.query(
            `insert into instructor(instructor_id, user_id, expertise, experience, description)
            values (?,?,?,?,?)`,
            [
                ,
                data.userid,
                data.expertise,
                data.experience,
                data.description
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateUserType: (data, callBack) => {
        pool.query(
            `update user set user_type=? where user_id = ?`,
            [
                data.usertype,
                data.userid
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
        
    },
    getInstructorById: (id, callBack) => {
        pool.query(
            `select * from instructor where user_id= ?`,
            [id],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
};