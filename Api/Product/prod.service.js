const pool = require("../../config/database");

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `insert into product(product_id, renter_id, category_id, brand_id, title, description, product_type, date_added, status, price_per_day, actual_price)
            values (?,?,?,?,?,?,?,?,?,?,?)`,
            [
                ,
                data.renterid,
                data.catid,
                data.brandid,
                data.title,
                data.description,
                data.product_type,
                data.dateadded,
                1,
                data.priceperday,
                data.actualprice
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    productpic: (data, callBack) => {
        pool.query(
            `insert into picture(picture_id, product_id, picture_file_name, is_main_picture)
            values (?,?,?,?)`,
            [
                ,
                data.prodid,
                data.picname,
                data.ismain
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getprods: callBack => {
        pool.query(
            `select p.*, pic.picture_file_name from product p join picture pic on(p.product_id=pic.product_id) where p.status=1 && pic.is_main_picture=1` ,
            [],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getRentingProds: callBack => {
        pool.query(
            `select p.*, pic.picture_file_name from product p join picture pic on(p.product_id=pic.product_id) where p.status=1 && product_type='rent' && pic.is_main_picture=1` ,
            [],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getSaleProds: callBack => {
        pool.query(
            `select p.*, pic.picture_file_name from product p join picture pic on(p.product_id=pic.product_id) where p.status=1 && product_type='sale' && pic.is_main_picture=1` ,
            [],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getProdByCat: (id, callBack) => {
        pool.query(
            `select p.*, pic.picture_file_name from product p join picture pic on(p.product_id=pic.product_id) where p.status=1 && p.category_id=? && pic.is_main_picture=1` ,
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