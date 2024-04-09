import Razorpay from "razorpay";
import { app } from "./app.js";


export const instance = new Razorpay({
   key_id: process.env.RAZORPAY_API_KEY, 
   key_secret: process.env.RAZORPAY_API_SECRET,
})

app.listen(process.env.PORT, () => console.log(`Server is running on ${process.env.PORT}` ));