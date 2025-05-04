import express from "express";
import { loginAdmin, register, login, getProfile, logout, forgotPassword, verifyOTP, resetPassword, updateProfile, updateAvatar } from '../controllers/auth-controller.js';
import authMiddleware from '../middlewares/auth-middlewares.js';
import upload from '../middlewares/uploadMiddleware.js';
import isAdmin from "../middlewares/isAdmin.js";

const AccountRouter = express.Router();

AccountRouter.post('/register', register); // Đăng ký tài khoản
AccountRouter.post('/login', login); // // Route đăng nhập (áp dụng giới hạn đăng nhập)
AccountRouter.get('/profile', authMiddleware, getProfile)
AccountRouter.post('/logout', logout);
AccountRouter.post('/forgot-password', forgotPassword);
AccountRouter.post('/verify-otp', verifyOTP);
AccountRouter.post('/reset-password', resetPassword);
AccountRouter.put('/update-profile', authMiddleware, updateProfile);
AccountRouter.post('/admin/login', loginAdmin)
AccountRouter.post("/update-avatar", authMiddleware, upload.single("avatar"), updateAvatar);

export default AccountRouter;
