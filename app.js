
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/Hackofiesta', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (e) => {
    console.log("DB Connected");
});

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    Address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    programmingLanguage: {
        type: String,
        required: true
    },
    Zipcode: {
        type: String,
        required: true
    }
})

const User = new mongoose.model("user", userSchema)

app.post("/login", (req, res) => {
    
})

app.post("/register", (req, res) => {
    const {fname,lname,email,password,Address,city,state,programmingLanguage,Zipcode} = req.body;
    console.log(req.body);
    User.findOne({email:email},(err,user)=>{
        if(user){
            res.send({message: "User already registered"});
        }else{
            const user = new User({
                fname,
                lname,
                email,
                password,
                Address,
                city,
                state,
                programmingLanguage,
                Zipcode
            });
            res.send({message : "register data received"});
            user.save();
        }
    });
    // console.log(req.body.fname);
   
})

app.listen(9002, () => {
    console.log("Server connected")
})