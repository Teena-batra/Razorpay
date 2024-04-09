import {instance} from "../server.js"
import crypto from "crypto"
import { connectDB } from "../config/database.js";

const db = await connectDB();


//========================================= checkout ==================================================
export const checkout = async (req,res) => {

    const options = {
        amount: Number(req.body.amount * 100),  // amount in the smallest currency unit
        currency: "INR"
    };
    const order = await instance.orders.create(options)

    //console.log(order);
    res.status(200).json({
        success: true,
        order
    })
    };


    //========================================= payment verification =============================
    export const paymentverification = async (req,res) => {

        const {razorpay_order_id,razorpay_payment_id, razorpay_signature } = req.body;

        const body= razorpay_order_id + "|" + razorpay_payment_id;

  //const crypto = require("crypto");
  const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET)
                            .update(body.toString()).digest('hex');
                            
    // console.log("sig received " ,razorpay_signature);
    // console.log("sig generated " ,expectedSignature);
//   let response = {"signatureIsValid":"false"}
//   if(expectedSignature === razorpay_signature)
//    response={"signatureIsValid":"true"}
//       res.send(response);

  
    const isAuthentic = (expectedSignature === razorpay_signature)
    if(isAuthentic){

        try {
           const query = `INSERT INTO payment (razorpay_order_id,razorpay_payment_id, razorpay_signature) VALUES(?,?,?)`;
            const values = [razorpay_order_id,razorpay_payment_id, razorpay_signature]
            const [row] = await db.query(query,values,(error,result) => {
                if(error) {
                    console.log("Error" ,error)
                }else{
                    console.log(result);
                }
        });

            if(row.affectedRows === 0){
                throw new error(400,"Failed to insert data");
            }
            console.log("working");

            res.redirect(`http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`);
        } catch (error) {
            console.error("Error inserting payment:", error.message);
            res.status(500).json({ success: false, error: "Internal Server Error" });
        }
    }else {
        res.status(400).json({
            success: false
        })
    }
};
        

        