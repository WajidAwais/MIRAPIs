require("dotenv").config();
const express = require('express');
const app = express();

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage
})

const userRouter = require("./Api/User/user.router");
const catRouter = require("./Api/Category/cat.router");
const brandRouter = require("./Api/Brand/brand.router");
const prodRouter = require("./Api/Product/prod.router");

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.header('Access-Control-Allow-Headers', '*');
    next();
}


app.use(express.json());
app.use(allowCrossDomain);


app.use("/Api/User", userRouter);
app.use("/Api/Category", catRouter);
app.use("/Api/Brand", brandRouter);
app.use("/Api/Product", prodRouter);





app.use('/product', express.static('upload/images'));
app.post("/upload",upload.single('product'), (req, res) => {
    console.log(req.files);
    res.json({
        success: 1,
        product_url: `http://localhost:5000/product/${req.file.filename}`
    })
})


//PORT
const port = process.env.PORT || 3000; 
app.listen(port, () => console.log(`Listening on port ${port}`));