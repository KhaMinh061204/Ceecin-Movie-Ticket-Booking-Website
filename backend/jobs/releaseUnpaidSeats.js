// jobs/releaseUnpaidSeats.js
import cron from "node-cron";
import BookingModel from "../models/booking-model.js";
import TicketModel from "../models/ticket-model.js";
import SeatModel from "../models/seat-model.js";

// Hàm xử lý
const releaseUnpaidSeats = async () => {
  try {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const expiredBookings = await BookingModel.find({
      status: false,
      createdAt: { $lt: fiveMinutesAgo }
    }).populate("ticket_id");

    for (const booking of expiredBookings) {
      const seatIds = booking.ticket_id.map(ticket => ticket.seat_id);
      await SeatModel.updateMany(
        { _id: { $in: seatIds }, status: "booked" },
        { $set: { status: "available" } }
      );
      await BookingModel.findByIdAndDelete(booking._id);
    }

    console.log(`[Cron] Released ${expiredBookings.length} unpaid bookings`);
  } catch (error) {
    console.error("[Cron] Error releasing unpaid seats:", error);
  }
};

// Lên lịch chạy mỗi 2 phút
const startReleaseUnpaidSeatsJob = () => {
  cron.schedule("*/2 * * * *", releaseUnpaidSeats); // mỗi 2 phút
  console.log("[Cron] Auto-release unpaid seats job started.");
};

export default startReleaseUnpaidSeatsJob;
