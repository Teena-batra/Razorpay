import mysql from "mysql2/promise";
import {config} from "dotenv";

config({path: "./config/config.env"});
//dotenv.config();

export const connectDB = async(req,res) => {
    console.log("HOST1",process.env.HOST)

        try{
            console.log("HOST",process.env.HOST)
            console.log("USER",process.env.USER)
            console.log("PASS",process.env.PASSWORD)
            console.log("DATABASE",process.env.DATABASE)
            const pool = mysql.createPool({
                host: process.env.HOST,
                user: process.env.USER,
                password: process.env.PASSWORD,
                database: process.env.DATABASE
            });
            console.log("Connected to mysql");
            return pool;
        }catch(err){
            console.log("Mysql connection error",err);
            process.exit(1);
        }
}
// const db = await connectDB();
export default connectDB;
