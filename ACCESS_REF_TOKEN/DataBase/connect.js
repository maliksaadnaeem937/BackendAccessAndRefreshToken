import mongoose from "mongoose";

import 'dotenv/config'

const connectDB=async()=>{
    try{
        const options={
            dbName:process.env.dbName
        }

        await mongoose.connect('mongodb://localhost:27017',options)
        console.log('connection established with database',process.env.dbName)
    }catch(e){
        console.log('Error during db connection!')
    }
}

export default connectDB;