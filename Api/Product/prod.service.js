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
            `select p.product_id,p.renter_id,p.category_id,p.brand_id,p.title,p.product_type,p.description,LEFT(p.date_added,10) AS date_added,IF(p.status=1,'active','inactive') as status,p.price_per_day,p.actual_price, pic.picture_file_name from product p join picture pic on(p.product_id=pic.product_id) where p.status=1 && pic.is_main_picture=1` ,
            [],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getProdsByUserID: (id,callBack) => {
        pool.query(
            `select * from product where renter_id = ?` ,
            [id],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateProdStatus: (productID, callBack) => {
        
        pool.query(
            `update product set status=? where product_id = ?`,
            [
                0,
                productID
            ],

            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );

    },
    getPicsByProdId: (productID, callBack) => {
        pool.query(
            `select * from picture where product_id = ? && is_main_picture = 0 LIMIT 4`,
            [productID],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );

    },
    rentRecord: (data, callBack) => {
        pool.query(
            `insert into rent_record(rent_id, rentee_id, product_id, on_rent, payment_method, rent_from, rent_to)
            values (?,?,?,?,?,?,?)`,
            [
                ,
                data.renteeid,
                data.prodid,
                data.onrent,
                data.paymentmethod,
                data.from,
                data.to,
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    sellRecord: (data, callBack) => {
        pool.query(
            `insert into sell_record(sell_id, buyer_id, product_id, sell_out, payment_method, sell_date)
            values (?,?,?,?,?,?)`,
            [
                ,
                data.buyerid,
                data.prodid,
                data.sellout,
                data.paymentmethod,
                data.selldate,
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