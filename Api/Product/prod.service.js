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
            `select p.product_id,p.renter_id,p.category_id,p.brand_id,p.title,p.product_type,p.description,LEFT(p.date_added,10) AS date_added,IF(p.status=1,'active','inactive') as status,IF(p.product_type='rent',p.price_per_day,'---') as price_per_day, p.actual_price, pic.picture_file_name from product p join picture pic on(p.product_id=pic.product_id) where p.status=1 && pic.is_main_picture=1 ORDER BY p.product_id DESC` ,
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
    updateProdStatus: (data, callBack) => {
        
        pool.query(
            `update product set status=? where product_id = ?`,
            [
                data.status,
                data.productid
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
            `SELECT p.title, u.full_name, LEFT(r.rent_from,10) as rent_from, r.days, p.price_per_day*r.days as price_per_day from product p join rent_record r on (r.product_id = p.product_id) join user u on(r.rentee_id = u.user_id) where r.on_rent = 1 and p.renter_id = ?`,
            [id],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    ProdsHistoryByUserId: (id,callBack) => {
        pool.query(
            `SELECT p.title, u.full_name, LEFT(r.rent_from,10) as rent_from, r.days, p.price_per_day*r.days as price_per_day from product p join rent_record r on (r.product_id = p.product_id) join user u on(r.rentee_id = u.user_id) where r.on_rent = 0 and p.renter_id = ?`,
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
            `SELECT p.product_id, p.title, u.user_id, u.full_name, LEFT(r.rent_from,10) as rent_from, r.days, p.price_per_day*r.days as price_per_day from product p join rent_record r on (r.product_id = p.product_id) join user u on(p.renter_id = u.user_id) where r.on_rent = 1 and r.rentee_id = ?`,
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
            `update rent_record set on_rent=0 where product_id = ?`,
            [id],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    BuyProdsHistory: (id,callBack) => {
        pool.query(
            `SELECT p.title, u.full_name, LEFT(s.sell_date,10) as sell_date, (p.actual_price+500) as actual_price from sell_record s join product p on (s.product_id = p.product_id) join user u on(p.renter_id = u.user_id) where s.buyer_id = ?`,
            [id],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    SellProdsHistory: (id,callBack) => {
        pool.query(
            `SELECT p.title, u.full_name, LEFT(s.sell_date,10) as sell_date, p.actual_price from sell_record s join product p on (s.product_id = p.product_id) join user u on(s.buyer_id = u.user_id) where p.renter_id = ?`,
            [id],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    productReview: (data, callBack) => {
        pool.query(
            `insert into product_review(review_id, rentee_id, renter_id, product_id, rating, comment, date_added)
            values (?,?,?,?,?,?,?)`,
            [
                ,
                data.renteeid,
                data.renterid,
                data.productid,
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
    
    getProductReviewsById: (id, callBack) => {
        pool.query(
            `select review_id,rentee_id,renter_id,comment,rating,LEFT(date_added,10) as date_added from product_review where product_id= ?`,
            [id],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getProductRatingById: (id, callBack) => {
        pool.query(
            `select AVG(rating) as rating from product_review where product_id= ?`,
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