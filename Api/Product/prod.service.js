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
            `select p.product_id,p.renter_id,p.category_id,p.brand_id,p.title,p.product_type,p.description,LEFT(p.date_added,10) AS date_added,IF(p.status=1,'active','inactive') as status,p.price_per_day,p.actual_price, pic.picture_file_name from product p join picture pic on(p.product_id=pic.product_id) where p.status=1 && pic.is_main_picture=1 ORDER BY p.product_id DESC;` ,
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
            `insert into rent_record(rent_id, rentee_id, product_id, on_rent, payment_method, shipment_address, contact_number, rent_from, days)
            values (?,?,?,?,?,?,?,?,?)`,
            [
                ,
                data.renteeid,
                data.prodid,
                data.onrent,
                data.paymentmethod,
                data.address,
                data.contact,
                data.from,
                data.days,
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },    
    update: (data, callBack) => {
        pool.query(
            `update product set  category_id=?, brand_id=?, title=? , description=? ,product_type=? ,date_added=? , price_per_day=?, actual_price=? where product_id=?`,
            [
                data.catid,
                data.brandid,
                data.title,
                data.description,
                data.product_type,
                data.dateadded,
                data.priceperday,
                data.actualprice,
                data.productid,
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
            `insert into sell_record(sell_id, buyer_id, product_id, payment_method, shipment_address, contact_number,sell_date)
            values (?,?,?,?,?,?,?)`,
            [
                ,
                data.buyerid,
                data.prodid,
                data.paymentmethod,
                data.address,
                data.contact,
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
    productpicupdate: (data, callBack) => {
        pool.query(
            `update picture set picture_file_name=?, is_main_picture=? where product_id=?`,
            [
                data.picname,
                data.ismain,
                data.prodid
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    onRentProdsByUserId: (id,callBack) => {
        pool.query(
            `SELECT p.title, u.full_name, LEFT(r.rent_from,10) as rent_from, r.days, price_per_day from product p join rent_record r on (r.product_id = p.product_id) join user u on(r.rentee_id = u.user_id) where r.on_rent = 1 and p.renter_id = ?`,
            [id],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    ProdsHistoryByRentee: (id,callBack) => {
        pool.query(
            `SELECT p.title, u.full_name, LEFT(r.rent_from,10) as rent_from, r.days, p.price_per_day*r.days as price_per_day from product p join rent_record r on (r.product_id = p.product_id) join user u on(p.renter_id = u.user_id) where r.on_rent = 0 and r.rentee_id = ?`,
            [id],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    onRentProdsByRentee: (id,callBack) => {
        pool.query(
            `SELECT p.title, u.full_name, LEFT(r.rent_from,10) as rent_from, r.days, p.price_per_day*r.days as price_per_day from product p join rent_record r on (r.product_id = p.product_id) join user u on(p.renter_id = u.user_id) where r.on_rent = 1 and r.rentee_id = ?`,
            [id],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateRentStatus: (id,callBack) => {
        pool.query(
            `update rent_record set on_rent=0 where id = ?`,
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