const pool = require("../../config/database");

module.exports = {
    getBrands: callBack => {
        pool.query(
            `select * from brand where status=1`,
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