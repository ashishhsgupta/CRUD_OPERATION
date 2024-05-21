import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({path: "./config/config.env"});


mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log('connected to the database');
})
.catch((e) =>{
    console.log('DB not connected');
})

const postuserDataSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required: true,
        trim: true,
        min: 5,
        max: 50
    },
   lastName:{
    type: String,
    trim: true,
    min: 5,
    max: 20
   },
   email:{
    type: String,
    unique :true,
    required: [true,"Please provide your email"],
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    lowercase: true,
    trim: true
   } ,
   profile:{
    type: String,
    required: true,
    //enum: ["User","Developer"]
   }
},{ timestamps: true }
);
const datamodel = mongoose.model('userTable', postuserDataSchema);


export default datamodel;