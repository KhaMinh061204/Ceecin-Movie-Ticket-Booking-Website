import express from "express"
import { createBooking,getBooking,payment } from "../controllers/booking-controller.js";
import authMiddleware from "../middlewares/auth-middlewares.js";
const bookingRouter = express.Router();
    bookingRouter.post("/",authMiddleware,createBooking);
    bookingRouter.get("/",authMiddleware,getBooking);
    bookingRouter.post("/create-payment-intent",payment);
export default bookingRouter;