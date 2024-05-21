//import mongoose from 'mongoose';
import * as mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config({path: "./config/config.env"});

export const connectDatabase =  () => {
    mongoose.connect("mongodb://127.0.0.1:27017/CRUD_OPERATION")
    .then ((c) => {
        console.log(`MongoDB connected to: ${c.connection.host}`);
    })
    .catch((e)=>{
        console.log(e);
    });
};