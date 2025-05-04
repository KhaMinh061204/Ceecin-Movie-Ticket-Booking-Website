import express from "express"
import { createBooking,getBooking,payment, handleStripeWebhook } from "../controllers/booking-controller.js";
import authMiddleware from "../middlewares/auth-middlewares.js";
const bookingRouter = express.Router();
    bookingRouter.post("/",authMiddleware,createBooking);
    bookingRouter.get("/",authMiddleware,getBooking);
    bookingRouter.post("/create-payment-intent",payment);
    bookingRouter.post('/webhook', express.raw({ type: 'application/json' }), handleStripeWebhook);
export default bookingRouter;