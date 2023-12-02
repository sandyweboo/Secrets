//jshint esversion:6

const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const app = express();
const mongoose = require('mongoose')
const mongooseFieldEncryption = require("mongoose-field-encryption").fieldEncryption;

app.use(express.static("public"))
app.set('view engine', 'ejs')
app.use (bodyParser.urlencoded({extended:true}))

mongoose.connect("mongodb://localhost:27017/Secrets").then((result)=>{console.log("db connection success")})
.catch((err)=>{console.log(err)})

const userSchema = new mongoose.Schema ({
    username : String,
    password : String
})

const secret = "ZGRmc3RnbHRkc3ByZWFzc2Z2Ym8="
userSchema.plugin(mongooseFieldEncryption, { 
    fields: ["password"], 
    secret: secret,

  });

const user = mongoose.model("user", userSchema);

app.get('/',(req, res)=>{
    res.render("home")
});
app.get('/login',(req, res)=>{
    res.render("login")
});

app.get('/register',(req, res)=>{
    res.render("register")
});
app.post('/register',(req, res)=>{

    const newUser = new user({
        username : req.body.username,
        password : req.body.password
    })
    newUser.save()
    .then((result)=>{
        res.render("secrets")
    })
    .catch((err)=>{console.log(err)})
})


app.listen(process.env.PORT || 3000,()=>{
    console.log("app is runnig on port 3000")
});

app.post('/login',(req, res)=>{
    user.findOne({ username: req.body.username }).exec()
    .then((result) => {
        if(result.password === req.body.password){
            console.log("success")
        }else{
            console.log("password error")
        }
     
    })
    .catch((err) => {
      console.error('Retrieval error:', err);
    }); 
});

