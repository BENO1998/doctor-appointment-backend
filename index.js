import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import doctorRoutes from './routes/doctor.js'

const port = 5000;

mongoose.connection.on("disconnected", () =>{console.log("Disconnected")})

const connect = async () =>{
    try{
        mongoose.connect("mongodb+srv://booking:booking123@cluster0.hhxpd8f.mongodb.net/test")
        console.log("Connected to Mongodb")
    }catch(err){
        console.log(err)
    }
}

const app = express();
dotenv.config();

app.use(express.json())
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('doctors'));
app.use(fileUpload());
app.use('/', doctorRoutes)
app.get('/', (req, res) => {
    res.send("hello it/s running")
})

app.use((err, req, res, next) =>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something Went Wrong";
    return res.status(errorStatus).json({
        success: false,
        message: errorMessage,
        status: errorStatus,
        stack : err.stack,
    })
})
app.listen(process.env.PORT || port , ()=>{connect(); console.log("Started")})