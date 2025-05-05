import mongoose from "mongoose";
import TicketModel from "../models/ticket-model.js";
import BookingModel from "../models/booking-model.js";
import FandBModel from "../models/F&B-model.js";
import Account from "../models/account-model.js";
import Stripe from "stripe";

export const createBooking = async (req, res) => {
    const { ticket_ids, fandb_items } = req.body;
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
    
    if (!ticket_ids) {
        return res.status(400).json({ message: "Tickets are required." });
    }

    try {
        // Kiểm tra danh sách vé
        const tickets = await TicketModel.find({ _id: { $in: ticket_ids } });
        if (tickets.length !== ticket_ids.length) {
            return res.status(404).json({ message: "Invalid ticket IDs provided." });
        }

        // Kiểm tra danh sách đồ ăn/thức uống
        let fandbTotal = 0;
        const validatedFandbItems = [];
        if (fandb_items && fandb_items.length > 0) {
            for (const item of fandb_items) {
                const fandb = await FandBModel.findById(item.id);
                if (!fandb) {
                    return res.status(404).json({ message: `Invalid FandB ID: ${item.id}` });
                }
                fandbTotal += fandb.price * item.quantity;
                validatedFandbItems.push({ id: fandb._id,name:fandb.name, quantity: item.quantity });
            }
        }

        // Tính tổng tiền
        const ticketTotal = tickets.reduce((sum, ticket) => sum + ticket.ticketPrice, 0);
        const total = ticketTotal + fandbTotal;

        // Tạo đơn đặt vé
        const booking = new BookingModel({
            user_id:userId,
            ticket_id: ticket_ids,
            FandB_id: validatedFandbItems,
            total,
            status: false
        });
        const newBooking = await booking.save();

        return res.status(201).json({
            message: "Booking created successfully",
            booking: newBooking
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred", error: error.message });
    }
};

export const getBooking = async (req, res) => {
    const accountId = req.user.id;

    // Kiểm tra tính hợp lệ của accountId
    if (!mongoose.Types.ObjectId.isValid(accountId)) {
        return res.status(400).json({ status: false, message: "Invalid Account ID" });
    }

    try {
        // Tìm user thông qua accountId
        const account = await Account.findById(accountId).populate("member");
        if (!account || !account._id) {
            return res.status(404).json({ status: false, message: "User not found" });
        }

        const userId = account._id;

        // Lấy danh sách các booking của user
        const bookings = await BookingModel.find({ user_id: userId, status:true })
            .populate({
                path: "ticket_id",
                populate: [
                    {
                        path: "showtime_id", // Populate thông tin về showtime từ ticket
                        model: "showtimes",  // Đảm bảo rằng "Showtime" là tên model tương ứng
                        populate: [
                            {
                                path: "movie_id", // Populate thông tin phim
                                model: "movies",  // Tên model phim
                            },
                            {
                                path: "screening_room_id", // Populate thông tin phòng chiếu
                                model: "rooms",  
                                populate: [
                                    {
                                        path: "theater_id", // Populate thông tin rạp
                                        model: "theaters",  // Tên model phim
                                    },
                                ]           
                            },
                        ],
                    },
                    {
                        path: "seat_id", // Populate thông tin ghế từ ticket
                        model: "seats",
                    },
                ],
            })
            //.populate("FandB_id.id") // Lấy thông tin chi tiết về đồ ăn/thức uống
            .exec();

        if (!bookings || bookings.length === 0) {
            return res.status(404).json({ message: "No bookings found for this user." });
        }

        // Trả về danh sách booking
        return res.status(200).json({
            bookings,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred", error: error.message });
    }
};

const stripe = new Stripe ( process.env.STRIPE_SECRET_KEY);
// Thanh toán
export const payment = async (req, res) => {
    try {
        const { products, bookingId, couponCode, selectedSeatIds } = req.body;

        //Danh sách sản phẩm
        const lineItems = products.map((product) => ({
            price_data: {
                currency: 'VND',
                product_data: {
                    name: product.name,
                    images: [product.image],
                },
                unit_amount: product.price,
            },
            quantity: product.quantity,
        }));

        let discounts = [];

        // Nếu có couponCode từ frontend → kiểm tra trên Stripe
        if (couponCode) {
            const promotionCodes = await stripe.promotionCodes.list({
                code: couponCode,
                active: true,
                limit: 1,
            });

            if (promotionCodes.data.length > 0) {
                discounts.push({ promotion_code: promotionCodes.data[0].id });
            } else {
                return res.status(400).json({ error: 'Mã giảm giá không hợp lệ' });
            }
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            discounts: discounts, // Chỉ thêm nếu có mã giảm giá hợp lệ
            success_url: 'https://ceecine.vercel.app/success',
            cancel_url: 'https://ceecine.vercel.app/cancel',
            metadata: {
                bookingId: bookingId,
                seatId:selectedSeatIds
            },
        });

        res.json({ sessionId: session.id });
    } catch (error) {
        res.status(500).send('Lỗi khi tạo session thanh toán');
        console.error("Lỗi khi tạo session thanh toán:", error);
    }
};