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
        console.log("Hello"+data.avatar);
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
            `select * from user where email = ?`,
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
    }
};