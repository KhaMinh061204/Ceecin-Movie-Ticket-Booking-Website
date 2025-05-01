import logoicon from "../assets/img/icon-logo.png";
import facecol from '../assets/img/face-color.png';
import xcol from '../assets/img/x-color.png';
import ggcol from '../assets/img/google-color.png';
import { useState, useEffect } from "react";
import $ from "jquery";
import { post } from "../api/api";
import React from 'react'; 

function Login(prop) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State để quản lý trạng thái mật khẩu

  useEffect(() => {
    do_bind_event();
  }, []);

  const do_bind_event = () => {
    $("#loginbtn").on("click", () => {
      do_login();
    });

    $(".close_auth").on("click", function () {
      $("#authpopup").addClass("hide");
    });
  };

  const do_login = async () => {
    const mail = $("#mailinp").val(); // Lấy giá trị email
    const pass = $("#passinp").val(); // Lấy giá trị password

    try {
      // Gọi API đăng nhập
      const response = await post("/account/login", {
        username: mail,
        password: pass,
      });

      // Xử lý kết quả trả về từ API
      const { token } = response.data; // Lấy token từ response
      localStorage.setItem('token', token) // Lưu token vào localStorage
      sessionStorage.setItem('token', token)
      const time = Date.now() + 60 * 60 * 1000
      sessionStorage.setItem('expires', time)

      alert("Đăng nhập thành công!");
      console.log("Token:", token);
      $('#authpopup').addClass("hide");
      $("#login").addClass("hide");
      $("#img_account_top").removeClass("hide");
    } catch (error) {
      console.error("Login Error:", error);
      if (error.response) {
        alert(error.response.data.message || "Đăng nhập thất bại!");
      } else {
        alert("Có lỗi xảy ra, vui lòng thử lại!");
      }
    }
  };

  return (
    <div id="login-popup" className="auth_box" style={{ position: "relative" }}>
      <button className="close_auth" style={{ backgroundColor: "transparent", position: "absolute", top: "1%", right: "1%" }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 17 18" fill="none">
          <g opacity="0.7">
            <path d="M14.1668 3L2.8335 15M14.1668 15L2.8335 3" stroke="black" strokeWidth="2" strokeLinecap="round" />
          </g>
        </svg>
      </button>

      <img width="150px" src={logoicon} />
      <h3 className="header-auth mb-30">Đăng nhập tài khoản</h3>
      <div className="w-100 flex f-col mb-30">
        <label className="lable_auth">Email</label>
        <input className="inp_cus inp_auth" id="mailinp" placeholder="Nhập email" />
      </div>
      <div className="w-100 flex f-col" style={{ position: "relative" }}>
        <label className="lable_auth">Mật khẩu</label>
        <input
          className="inp_cus inp_auth"
          id="passinp"
          type={isPasswordVisible ? "text" : "password"} // Đổi type theo trạng thái
          placeholder="Nhập mật khẩu"
        />
        <button
          type="button"
          className="toggle-password"
          style={{
            position: "absolute",
            top: "75%",
            right: "10px",
            transform: "translateY(-50%)", // Đảm bảo biểu tượng mắt căn giữa ô nhập mật khẩu
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
          onClick={() => setIsPasswordVisible(!isPasswordVisible)} // Thay đổi trạng thái
        >
          {isPasswordVisible ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M1 1l22 22M17.94 17.94a10.5 10.5 0 0 0 3.71-5.94 10.5 10.5 0 0 0-18.24 0 10.5 10.5 0 0 0 3.71 5.94M9.5 9.5a3 3 0 1 0 4.24 4.24M12 3a9 9 0 0 1 9 9m-3.05 3.05A9 9 0 0 1 3 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M1 12s3-7 11-7 11 7 11 7-3 7-11 7S1 12 1 12z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>
      <div className="w-100 flex f-col">
        <button className="w-100 btn_cus auth_btn" id="loginbtn"><p>Đăng nhập</p></button>
      </div>
      <div className="flex f-col text-center mt-10">
        <span className="nav-auth" onClick={prop.changetoForgetPass}>Quên mật khẩu?</span>
      </div>

      <div className="w-100 flex cenhor cenver text-center mt-10 gap10">
        <div className="line"></div><span><b>hoặc</b></span><div className="line"></div>
      </div>
      <div className="flex f-col text-center mt-10">
        <span>Đăng nhập bằng</span>
        <div className="flex gap20 mt-10">
          <img src={facecol} />
          <img src={xcol} />
          <img src={ggcol} />
        </div>
      </div>
      <div className="line flex f-col text-center mt-10 w-100">
      </div>
      <div className="w-100 flex cenhor cenver text-center mt-30">
        <p>Bạn chưa có tài khoản? <a onClick={prop.changetoRegis} className="nav-auth" style={{ color: "#3D70B7" }}>Đăng ký ngay</a></p>
      </div>
    </div>
  );
}

export default Login;
