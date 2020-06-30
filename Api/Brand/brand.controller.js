const { getBrands } = require("./brand.service");

module.exports = {
    getBrand: (req, res) => {
        getBrands((err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database Connection Error"
                });
            }
            if(!results) {
                return res.json({
                    success: 0,
                    message: "Record Not Found"
                });
            }
            return res.json({
                success: 1,
                data: results
            })
        });
    }
}