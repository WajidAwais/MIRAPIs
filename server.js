require("dotenv").config();
const express = require('express');
const app = express();
const userRouter = require("./Api/User/user.router")
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}


app.use(express.json());
app.use(allowCrossDomain);


app.use("/Api/User", userRouter);

//PORT
const port = process.env.PORT || 3000; 
app.listen(port, () => console.log(`Listening on port ${port}`));