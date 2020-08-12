const { create, getUserById, updateUser, getUserByEmail, getInstructorByEmail, getCategories, getUsers, getUserEmail, profileReview, addInstructor, updateUserType, getInstructorById, getUserReviewsById, getUserRatingById, getUserPassword, updatePassword} = require("./user.service");

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
    instructordata: (req, res) => {
        const body = req.body;
        getInstructorByEmail(body.email, (err, results) => {
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
                return res.json({
                    success: 1,
                    data: results,
                });
            }else{
                return res.json({
                    success: 0,
                    message: "Invalid Email or Password",
                });
            }
        });
    },
    getUser: (req, res) => {
        getUsers((err, results) => {
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
    },
    ProfileReview: (req, res) => {
        const body = req.body;
        profileReview(body, (err, results) => {
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
    AddInstructor: (req, res) => {
        const body = req.body;
        addInstructor(body, (err, results) => {
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
    UpdateUserType: (req, res) => {
        const body = req.body;
        updateUserType(body, (err, results) => {
            if(err){
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
    getInstructorByUserId: (req, res) => {
        const id = req.params.id;
        getInstructorById(id, (err, results) => {
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
    getUserReviewsByUserId: (req, res) => {
        const id = req.params.id;
        getUserReviewsById(id, (err, results) => {
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
    getUserRatingByUserId: (req, res) => {
        const id = req.params.id;
        getUserRatingById(id, (err, results) => {
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
    getUserPasswordById: (req, res) => {
        const body = req.body;
        getUserPassword(body, (err, results) => {
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
    updatePasswordById: (req, res) => {
        const body = req.body;
        updatePassword(body, (err, results) => {
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
}