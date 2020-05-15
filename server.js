require("dotenv").config();
const express = require('express');
const app = express();

const multer = require("multer");
const path = require("path");


var Jimp = require('jimp');


const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const avatarStorage = multer.diskStorage({
    destination: './upload/avatars',
    filename: (req, file, cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage
})

const avatarUpload = multer({
    storage:avatarStorage
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
    res.json({
        success: 1,
        product_url: `http://localhost:5000/product/${req.file.filename}`
    })
    
    Jimp.read(`http://localhost:5000/product/${req.file.filename}`)
    .then(lenna => {    
        return lenna
        .contain(300, 300) // resize
        .quality(100) // quality
        .write(`upload/images/${req.file.filename}`); // save
    })
    .catch(err => {
        console.error(err);
    });
})

app.use('/avatar', express.static('upload/Avatars'));
app.post("/avatarUpload",avatarUpload.single('avatar'), (req, res) => {
    
    Jimp.read(`http://localhost:5000/avatar/${req.file.filename}`)
    .then(lenna => {
        res.json({
            success: 1,
            avatar_url: `http://localhost:5000/avatar/${req.file.filename}`
        })
        return lenna
        .contain(300, 300) // resize
        .write(`upload/Avatars/${req.file.filename}`); // save
    })
    .catch(err => {
        console.error(err);
    });
})


//PORT
const port = process.env.PORT || 3000; 
app.listen(port, () => console.log(`Listening on port ${port}`));