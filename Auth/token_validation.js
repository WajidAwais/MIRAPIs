const { verify } = require("jsonwebtoken");

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization");
        if(token){
            token = token.slice(7);
            verify(token, "quarantine", (err, decoded) => {
                if(err){
                    res.json({
                        success: 0,
                        message: "Invalid Token"
                    });
                }else{
                    next();
                }
            })
        }else{
            res.json({
                success: 0,
                message: "Access denied! unauthorized user"
            });
        }
    },
    verifyToken: (req, res) => {
        let token = req.get("authorization");
        if(token){
            token = token.slice(7);
            verify(token, "evaluation", (err, decoded) => {
                if(err){
                    res.json({
                        success: 0,
                        message: "Invalid Token"
                    });
                }else{
                    res.json({
                        success: 1,
                        message: "Valid Token"
                    });
                }
            })
        }else{
            res.json({
                success: 0,
                message: "Access denied! unauthorized user"
            });
        }
    }
}