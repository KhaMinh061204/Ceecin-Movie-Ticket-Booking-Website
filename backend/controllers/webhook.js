import BookingModel from "../models/booking-model.js";
import SeatModel from "../models/seat-model.js";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export const handleStripeWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    console .log("trả về webhook")
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
  
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
  
      const bookingId = session.metadata?.bookingId;
  
      if (!bookingId) {
        console.warn("Không có bookingId trong metadata.");
        return res.status(200).json({ received: true });
      }
  
      try {
        await BookingModel.findByIdAndUpdate(bookingId, { status: true });
        await SeatModel.findByIdAndUpdate(seatId, { status: 'booked' });
        console.log(`Booking ${bookingId} đã được cập nhật là đã thanh toán.`);
      } catch (err) {
        console.error(`Lỗi khi cập nhật booking ${bookingId}:`, err.message);
      }
    }
  
    res.status(200).json({ received: true });
  };