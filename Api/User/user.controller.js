const { create, getUserById, updateUser, getUserByEmail, getInstructorByEmail, getCategories, getUsers, getUserEmail, profileReview, addInstructor, updateUserType, getInstructorById, getUserReviewsById, getUserRatingById, getUserPassword, updatePassword, updatePasswordByEmail} = require("./user.service");

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
    Forgot: (req, res) => {
        const body = req.body;
        getUserByEmail(body.email, (err, results) => {
            if(err){
                console.log(err);
            }
            if(!results) {
                return res.json({
                    success: 0,
                    message: "Invalid email"
                })
            }
            const result = (body.email == results.email);
            if(result){
                const forgottoken = sign({ result: results }, "evaluation", {
                    expiresIn: "10min"
                });
                /////////////////////////////mailer
                const mailgun = require("mailgun-js");
                const DOMAIN = "sandbox7531e743ab3840afaf0a598bbba63d99.mailgun.org";
                const mg = mailgun({apiKey: "7aeeccccf582551c760b8fb8d3045cd5-07e45e2a-7d395aac", domain: DOMAIN});
                const data = {
                    from: "ranahamzanadeem27@gmail.com",
                    to: body.email,
                    subject: "Forgot Password Request",
                    text: 'To reset your password, please click the link below.\n\nhttp://localhost:3000/ResetPassword?token='+forgottoken,
                };
                mg.messages().send(data, function (error, body) {
                    console.log(body);
                });


                /////////////////////////////mailer


                return res.json({
                    success: 1,
                    message: "Mail sent successfully",
                    data: results,
                    token: forgottoken
                });
            }else{
                return res.json({
                    success: 0,
                    message: "Invalid Email or Password",
                });
            }
        });
    },
    UpdatePasswordByEmail: (req, res) => {
        const body = req.body;
        updatePasswordByEmail(body, (err, results) => {
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