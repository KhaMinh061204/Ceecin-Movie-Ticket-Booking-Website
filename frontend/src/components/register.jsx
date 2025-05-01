import logoicon from "../assets/img/icon-logo.png";
import facecol from '../assets/img/face-color.png';
import xcol from '../assets/img/x-color.png';
import ggcol from '../assets/img/google-color.png';
import { useEffect, useState } from "react";
import $ from "jquery";
import { post } from "../api/api";
import React from 'react'; 

function Register(prop) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        gender: "",
        password: "",
        confirmPassword: ""
    });

    // Hàm cập nhật giá trị form
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Hàm xử lý đăng ký
    const handleRegister = async () => {
        const { name, email, phone, dateOfBirth, gender, password, confirmPassword } = formData;

        // Kiểm tra các trường bắt buộc
        if (!name || !email || !phone || !dateOfBirth || !gender || !password || !confirmPassword) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        // Kiểm tra khớp mật khẩu
        if (password !== confirmPassword) {
            alert("Mật khẩu không khớp!");
            return;
        }

        // Gửi yêu cầu API
        try {
            const response = await post("/account/register", {
                name,
                email,
                phone,
                dateOfBirth,
                gender,
                password
            });

            if (response.status === 201) {
                alert("Đăng ký thành công!");
                // Chuyển sang trang đăng nhập
                prop.changetoLogin();
            } else {
                alert(response.message || "Đăng ký thất bại. Vui lòng thử lại.");
            }
        } catch (error) {
            alert("Có lỗi xảy ra: " + error.message);
        }
    };


    useEffect(() => {
        $(".close_auth").on("click", function () {
            $("#authpopup").addClass("hide");
        });
    }, []);


    return (
        <div id="regis-popup" className="auth_box hide" style={{ "position": "absolute" }}>
            <button className="close_auth" style={{ "backgroundColor": "transparent", "position": "absolute", "top": "1%", "right": "1%" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 17 18" fill="none">
                    <g opacity="0.7">
                        <path d="M14.1668 3L2.8335 15M14.1668 15L2.8335 3" stroke="black" strokeWidth="2" strokeLinecap="round" />
                    </g>
                </svg>
            </button>

            <img width="150px" src={logoicon} />
            <h3 className="header-auth mb-30">Đăng ký tài khoản</h3>

            <div className="w-100 flex f-col mb-30">
                <label className="lable_auth">Họ và tên</label>
                <input
                    className="inp_cus inp_auth"
                    placeholder="Nhập họ và tên"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
            </div>
            <div className="w-100 flex f-col mb-30">
                <label className="lable_auth">Email</label>
                <input
                    className="inp_cus inp_auth"
                    placeholder="Nhập email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>
            <div className="w-100 flex f-col mb-30">
                <label className="lable_auth">Số điện thoại</label>
                <input
                    className="inp_cus inp_auth"
                    placeholder="Nhập số điện thoại"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                />
            </div>
            <div className="w-100 flex f-col mb-30">
                <label className=" lable_auth">Ngày sinh</label>
                <input
                    className="inp_cus inp_auth"
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                />
            </div>
            {/* Chọn giới tính */}
            <div className="w-100 flex mb-30 gap20">
                <div className="flex cenhor">
                    <input
                        className="m-0 inp_auth"
                        type="radio"
                        name="gender"
                        value="Nam"
                        checked={formData.gender === "Nam"}
                        onChange={handleChange}
                    />
                    <label>Nam</label>
                </div>
                <div className="flex cenhor">
                    <input
                        className="m-0 inp_auth"
                        type="radio"
                        name="gender"
                        value="Nữ"
                        checked={formData.gender === "Nữ"}
                        onChange={handleChange}
                    />
                    <label>Nữ</label>
                </div>
            </div>

            {/* Nhập mật khẩu */}
            <div className="w-100 flex f-col mb-30" style={{ position: "relative" }}>
                <label className="lable_auth">Nhập mật khẩu</label>
                <input
                    className="inp_cus inp_auth"
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="Nhập mật khẩu"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <button
                    type="button"
                    className="toggle-password"
                    style={{
                        position: "absolute",
                        top: "75%",
                        right: "10px",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                    }}
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                    {isPasswordVisible ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
                            <path d="M1 1l22 22M17.94 17.94a10.5 10.5 0 0 0 3.71-5.94 10.5 10.5 0 0 0-18.24 0 10.5 10.5 0 0 0 3.71 5.94M9.5 9.5a3 3 0 1 0 4.24 4.24M12 3a9 9 0 0 1 9 9m-3.05 3.05A9 9 0 0 1 3 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
                            <path d="M1 12s3-7 11-7 11 7 11 7-3 7-11 7S1 12 1 12z" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Nhập lại mật khẩu */}
            <div className="w-100 flex f-col mb-10" style={{ position: "relative" }}>
                <label className="lable_auth">Nhập lại mật khẩu</label>
                <input
                    className="inp_cus inp_auth"
                    type={isConfirmPasswordVisible ? "text" : "password"}
                    placeholder="Nhập lại mật khẩu"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />
                <button
                    type="button"
                    className="toggle-password"
                    style={{
                        position: "absolute",
                        top: "75%",
                        right: "10px",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                    }}
                    onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                >
                    {isConfirmPasswordVisible ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
                            <path d="M1 1l22 22M17.94 17.94a10.5 10.5 0 0 0 3.71-5.94 10.5 10.5 0 0 0-18.24 0 10.5 10.5 0 0 0 3.71 5.94M9.5 9.5a3 3 0 1 0 4.24 4.24M12 3a9 9 0 0 1 9 9m-3.05 3.05A9 9 0 0 1 3 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
                            <path d="M1 12s3-7 11-7 11 7 11 7-3 7-11 7S1 12 1 12z" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                    )}
                </button>
            </div>

            <div className="w-100 flex f-col">
                <button className="mb-30 w-100 btn_cus auth_btn" onClick={handleRegister}>
                    <p className="">Đăng ký</p>
                </button>
            </div>
            <div className="line flex f-col text-center mt-10 w-100">
            </div>
            <div className="w-100 flex cenhor cenver text-center mt-30">
                <p>Bạn đã có tài khoản? <a onClick={prop.changetoLogin} className="nav-auth" style={{ "color": "#3D70B7" }}>Đăng nhập ngay</a></p>
            </div>
        </div>
    );
}

export default Register;
