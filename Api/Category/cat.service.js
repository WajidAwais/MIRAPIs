const pool = require("../../config/database");

module.exports = {
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