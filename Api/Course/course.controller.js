const { create } = require("./course.service");

module.exports = {
    createCourse: (req, res) => {
        const body = req.body;
        create(body, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database Connection Error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        });
    },
}