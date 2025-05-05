import BookingModel from "../models/booking-model.js";
import SeatModel from "../models/seat-model.js";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];

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
    const seatIdRaw = session.metadata?.seatId;

    if (!bookingId || !seatIdRaw) {
      console.warn("Missing metadata (bookingId or seatId).");
      return res.status(200).json({ received: true });
    }

    const seatIds = seatIdRaw.split(',');

    try {
      // Cập nhật trạng thái đã thanh toán
      await BookingModel.findByIdAndUpdate(bookingId, { status: true });

      // Đánh dấu các ghế là 'booked'
      await SeatModel.updateMany(
        { _id: { $in: seatIds } },
        { $set: { status: 'booked' } }
      );

      console.log(`Booking ${bookingId} đã thanh toán. Cập nhật ${seatIds.length} ghế.`);
    } catch (err) {
      console.error(`Lỗi khi cập nhật dữ liệu booking ${bookingId}:`, err.message);
    }
  }

  res.status(200).json({ received: true });
};
