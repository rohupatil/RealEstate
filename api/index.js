import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'

dotenv.config();


mongoose
.connect(process.env.MONGO).then(()=>{
    console.log('conectde to mongodb');
}).catch((err)=>{
    console.log(err)
})

const app=express();  /*it will call to mongo varible used in .env file so that no other person can see ur pass and DB name*/

app.use(express.json());  /*it allows json as input at server*/

app.listen(3000,()=>{
    console.log('app is running on 3000 port!')
})

app.use("/api/user",userRouter);
app.use('/api/auth',authRouter);

        //this is middle wear function to handle the error  
app.use((err,req,res,next)=>{                 
    const statusCode=err.statusCode || 500;  //internal errror
    const message=err.message || 'Internal server error';
    return res.status(statusCode).json({
        success:false,
        statusCode: statusCode,
        message,


    })
})