import mongoose from "mongoose";
import TicketModel from "../models/ticket-model.js";
import SeatModel from "../models/seat-model.js";
import Account from "../models/account-model.js";
import Member from "../models/member-model.js";


export const createTicket = async (req, res) => {
    const { seat_id, showtime_id } = req.body;
    const accountId = req.user.id;
    if (!mongoose.Types.ObjectId.isValid(accountId)) {
        return res.status(400).json({ status: false, message: "Invalid Account ID" });
      }
        // Tìm user thông qua accountId
        const account = await Account.findById(accountId).populate("member");
        if (!account || !account._id) {
           
          return res.status(404).json({ status: false, message: "User not found" });
        }
    
        const userId = account._id;
    if (!seat_id || !showtime_id) {
        return res.status(400).json({ message: "Seat ID and Showtime ID are required." });
    }

    try {
        // Kiểm tra trạng thái ghế
        const seat = await SeatModel.findById(seat_id);
        if (!seat || seat.status !== "available") {
            return res.status(400).json({ message: "Seat is not available or does not exist." });
        }

        // Tạo vé
        const ticket = new TicketModel({
            showtime_id,
            seat_id,
            ticketPrice: seat.price
        });
        const savedTicket = await ticket.save();

        // Cập nhật trạng thái ghế
        seat.status = "booked";
        await seat.save();

        return res.status(201).json({
            ticket: savedTicket
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred", error: error.message });
    }
};

