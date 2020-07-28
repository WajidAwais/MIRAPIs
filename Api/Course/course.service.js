const pool = require("../../config/database");

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `insert into course(course_id, user_id, category_id, title, description, date_added, status, price, course_pic)
            values (?,?,?,?,?,?,?,?,?)`,
            [
                ,
                data.userid,
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
};