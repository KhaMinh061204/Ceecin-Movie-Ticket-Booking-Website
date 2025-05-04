import express, { Router } from "express";
import cors from "cors"
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routers/user-router.js";
import movieRouter from "./routers/movie-router.js"
import couponRouter from "./routers/coupon-router.js"
import AccountRouter from "./routers/auth-router.js";
import SeatRouter from "./routers/seat-router.js";
import PromotionRouter from "./routers/promotion-router.js";
import FoodRouter from "./routers/food-router.js";
import TheaterRouter from "./routers/theater-router.js";
import bookingRouter from "./routers/booking-router.js";
import ticketRouter from "./routers/ticket-router.js";
import webhookRouter from "./routers/webhook-router.js";
import path from "path";
import { fileURLToPath } from "url";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import http from "http";
import { Server } from "socket.io";
import startReleaseUnpaidSeatsJob from './jobs/releaseUnpaidSeats.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const swaggerDocument = YAML.load("./swagger.yaml");

app.use(cors());
app.use('/webhook', webhookRouter);

app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

startReleaseUnpaidSeatsJob();
mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.1qcpp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() =>
        server.listen(8081, () => {
            console.log("Connected to Database and Server is running")
        }
        )
    )
    .catch((e) => console.log(e));


app.use((req, res, next) => {
    req.io = io;
    next();
});

let seatLocks = new Map();  // Lưu trạng thái ghế đang được giữ

io.on('connection', (socket) => {
    console.log(`New client connected: ${socket.id}`);
    
    // Khi user chọn ghế -> LOCK GHẾ
    socket.on("lock_seat", ({ seatId, roomId }) => {
        const key = `${roomId}-${seatId}`;
        if (seatLocks.has(key)) {
        // Ghế đã bị user khác giữ
            socket.emit("seat_already_locked", { seatId });
        } else {
            const timeoutId = setTimeout(() => {
                seatLocks.delete(key);
                io.to(roomId).emit("seat_unlocked", { seatId, roomId });
                console.log(`Seat ${seatId} auto-unlocked due to timeout.`);
            }, 120000); // ⏳ 2 phút giữ ghế

            seatLocks.set(key, { socketId: socket.id, timeoutId });
            socket.join(roomId);
            io.to(roomId).emit("seat_locked", { seatId, roomId,sender: socket.id });
            console.log(`Seat ${seatId} locked by ${socket.id}`);
        }
    });

    // Khi user bỏ chọn -> UNLOCK
    socket.on("unlock_seat", ({ seatId, roomId }) => {
        const key = `${roomId}-${seatId}`;
        const seatData = seatLocks.get(key);
        if (seatData && seatData.socketId === socket.id) {
            clearTimeout(seatData.timeoutId);
            seatLocks.delete(key);
            io.emit("seat_unlocked", { seatId, roomId });
            console.log(`Seat ${seatId} unlocked by ${socket.id}`);
        }
    });

    // Khi user ĐẶT VÉ thành công -> xoá lock + thông báo booked
    socket.on("confirm_booking", ({ seatIds, roomId }) => {
        seatIds.forEach((seatId) => {
        const key = `${roomId}-${seatId}`;
        seatLocks.delete(key);
        io.to(roomId).emit("seat_booked", { seatId, roomId });
        console.log(`Seat ${seatId} BOOKED`);
        });
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
        for (const [key, lockerId] of seatLocks.entries()) {
          if (lockerId === socket.id) {
            const [roomId, seatId] = key.split("-");
            clearTimeout(seatData.timeoutId);
            seatLocks.delete(key);
            io.to(roomId).emit("seat_unlocked", { seatId, roomId });
            console.log(`Auto-unlocked seat ${seatId} due to user disconnect.`);
          }
        }
      });
  });
  
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/user", userRouter);
app.use("/movie", movieRouter);
app.use("/coupon", couponRouter);
app.use("/account", AccountRouter);
app.use("/seat", SeatRouter);
app.use("/promotion", PromotionRouter)
app.use("/food", FoodRouter)
app.use("/theater", TheaterRouter)
app.use("/ticket", ticketRouter)
app.use("/booking", bookingRouter)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default { server, io };

