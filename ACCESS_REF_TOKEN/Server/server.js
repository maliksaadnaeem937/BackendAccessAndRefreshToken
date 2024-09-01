import express from "express";

import 'dotenv/config'


import registerRouter  from "../Routes/routes.js";



import cors from 'cors';




const app=express();




app.use(cors());



const HOST=process.env.HOST||'localhost';




const PORT=process.env.PORT||8000;



app.use(express.json());

app.use((req,res,next)=>{
    console.log(registerRouter)
    next()
})

app.use('/api', registerRouter);




app.listen(PORT,HOST,(req,res)=>{
console.log(`server running at http://${HOST}:${PORT}`)
})