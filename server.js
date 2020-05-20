require("dotenv").config();
const express = require('express');
const app = express();

const multer = require("multer");
const path = require("path");
const cors = require("cors");
const uuid = require("uuid/dist/v4");

var Jimp = require('jimp');

app.use(express.json());

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.header('Access-Control-Allow-Headers', '*');
    next();
}

app.use(allowCrossDomain);
// app.use(cors);

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.post("/charge",(req, res)=>{
    
    const {instrument, token} = req.body;
    const idempontencyKey = uuid();

    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer => {
        stripe.charge.create({
            amount: instrument.price * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            destination: `purchase of Instrument instrument.name`,
            shipping: {
                name: token.card.name,
                address:{
                    country: token.card.address_country
                }
            }

        },{idempontencyKey})
    }).then(result => res.status(200).json(result))
    .catch(err => console.log(err))


    // try {
    //     stripe.customers
    //       .create({
    //         name: "shaheer",
    //         email: "shaheerkhalid12@gmail.com",
    //         // source: req.body.stripeToken
    //       })
    //       .then(customer =>
    //         stripe.charges.create({
    //             amount: "1000",
    //             currency: "usd",
    //             source: "tok_visa",
    //             receipt_email: "shaheerkhalid12@gmail.com"
              
    //         })
    //       )
    //       .then(() => {
    //           console.log('success');
              
    //       })
    //       .catch(err => console.log(err));
    //   } catch (err) {
    //     res.send(err);
    //   }
      
      
})


app.post("/withdraw",(req,res)=>{
    const stripe = require("stripe")("sk_test_Rl4mSrmkKlk6MQXZeVi6HZxn00Jz1UvpIq");
    try {
        
            stripe.transfer.create({
                object: "bank_account",
                account: "acct_1GiFhHFhtNb4OaZe",
                account_holder_name: "Jane Austen",
                account_holder_type: "individual",
                bank_name: "STRIPE TEST BANK",
                country: "US",
                currency: "usd",
                last4: "6789",
                metadata: {},
                routing_number: "110000000",
                status: "new"
              }
              )
          .then(() => {
              console.log('success');
              
          })
          .catch(err => console.log(err));
      } catch (err) {
        res.send(err);
      }
      
      
})







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
