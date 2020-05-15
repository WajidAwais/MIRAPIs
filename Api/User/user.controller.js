const { create, getUserById, updateUser, getUserByEmail, getCategories, getUserEmail } = require("./user.service");

const { sign } = require("jsonwebtoken")

module.exports = {
    createUser: (req, res) => {
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
    
    getEmail: (req, res) => {
        const body = req.body.email;
        getUserEmail(body, (err, results) => {
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
            })
        });
    },
    getUserByUserId: (req, res) => {
        const id = req.params.id;
        getUserById(id, (err, results) => {
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
    },
    updateUserById: (req, res) => {
        const body = req.body;
        updateUser(body, (err, results) => {
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
                    message: "Failed to update user"
                })
            }
                return res.json({
                success: 1,
                message: "updated Successfully"
            })
        });
    },
    login: (req, res) => {
        const body = req.body;
        getUserByEmail(body.email, (err, results) => {
            if(err){
                console.log(err);
            }
            if(!results) {
                return res.json({
                    success: 0,
                    message: "Invalid email or password"
                })
            }
            const result = (body.password == results.password);
            if(result){
                results.password = undefined;
                const jsontoken = sign({ result: results }, "quarantine", {
                    expiresIn: "5h"
                });
                return res.json({
                    success: 1,
                    message: "login successfully",
                    data: results,
                    token: jsontoken
                });
            }else{
                return res.json({
                    success: 0,
                    message: "Invalid Email or Password",
                });
            }
        });
    },
    getCategory: (req, res) => {
        getCategories((err, results) => {
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