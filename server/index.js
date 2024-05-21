import express  from "express";
import cors from "cors";
import bodyParser from 'body-parser'
import "dotenv/config";
import dotenv from "dotenv";
import routers from './routers/router.js';
import { connectDatabase } from "./config/database.js";

dotenv.config({path: "./config/config.env"});

connectDatabase();

const app = express();

const corsOrigin ={
    origin:'http://localhost:3000', 
    credentials:true,            
    optionSuccessStatus:200
}
app.use(cors(corsOrigin));         //CORS middleware for Express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// app.get('/api', (req, res) => {
//     res.send("I am Ashish");
// });

app.use('/', routers);


app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`);
});