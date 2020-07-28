require("dotenv").config();
const express = require('express');
const app = express();

const multer = require("multer");
const path = require("path");
const cors = require("cors");
// const uuid = require("uuid/dist/v4");
const { v4: uuidv4 } = require('uuid');


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

// app.post("/charge",(req, res)=>{
    
//     const {instrument, token} = req.body;
//     const idempontencyKey = uuidv4();

//     stripe.customers.create({
//         email: token.email,
//         source: token.id
//     }).then(customer => {
//         return stripe.charges.create({
//             amount: instrument.price * 100,
//             currency: 'usd',
//             customer: customer.id,
//             receipt_email: token.email,
//             destination: `purchase of Instrument instrument.name`,
//             shipping: {
//                 name: token.card.name,
//                 address:{
//                     country: token.card.address_country
//                 }
//             }

//         },{idempontencyKey})
//     }).then(result => res.status(200).json(result))
//     .catch(err => console.log(err))


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
      
      
// })


app.post('/payment', function(req, res){ 
  
    // Moreover you can take more details from user 
    // like Address, Name, etc from form 
    const {instrument, token, amount} = req.body;
    // console.log(token);
    // console.log(instrument);
    
    stripe.customers.create({ 
        email: token.email, 
        source: token.id, 
        name: token.card.name, 
        address: { 
            line1: '', 
            postal_code: '54777', 
            city: 'Lahore', 
            state: 'Punjab', 
            country: 'Pakistan', 
        } 
    }) 
    .then((customer) => { 
  
        return stripe.charges.create({ 
            amount: amount, 
            description: `purchase of Instrument ${instrument.title}`, 
            currency: 'PKR', 
            customer: customer.id 
        }); 
    }) 
    .then((charge) => { 
        res.send("Success")  // If no error occurs 
    }) 
    .catch((err) => { 
        res.send(err)       // If some error occurs 
    }); 
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

const coursepicStorage = multer.diskStorage({
    destination: './upload/CoursePics',
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

const coursepicUpload = multer({
    storage:coursepicStorage
})




const userRouter = require("./Api/User/user.router");
const catRouter = require("./Api/Category/cat.router");
const brandRouter = require("./Api/Brand/brand.router");
const prodRouter = require("./Api/Product/prod.router");
const courseRouter = require("./Api/Course/course.router");





app.use("/Api/User", userRouter);
app.use("/Api/Category", catRouter);
app.use("/Api/Brand", brandRouter);
app.use("/Api/Product", prodRouter);
app.use("/Api/Course", courseRouter);





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

app.use('/coursepic', express.static('upload/CoursePics'));
app.post("/coursepicUpload",coursepicUpload.single('coursepic'), (req, res) => {
    res.json({
        success: 1,
        coursepic_url: `http://localhost:5000/coursepic/${req.file.filename}`
    })

    Jimp.read(`http://localhost:5000/coursepic/${req.file.filename}`)
    .then(lenna => {
        return lenna
        .contain(300, 300) // resize
        .write(`upload/CoursePics/${req.file.filename}`); // save
    })
    .catch(err => {
        console.error(err);
    });
})

//PORT
const port = process.env.PORT || 3000; 
app.listen(port, () => console.log(`Listening on port ${port}`));
