import logoicon from "../assets/img/icon-logo.png";
import { post } from "../api/api";
import { useState } from "react";
import React from 'react'; 

function Otp(prop) {

  const [otp, setOtp] = useState("");
  const email = sessionStorage.getItem("email");

  const handleVerifyOTP = async () => {
    try {
      const response = await post("/account/verify-otp", { email, otp });


      if (response.status === 200) {
        alert(response.data.message);
        prop.repass();
      } else {
        alert(response.data.message); // Hiển thị lỗi
      }
    } catch (error) {
      alert("Lỗi: ", error.message);
    }
  };

  return (
    <div id="otp-popup" className="auth_box hide" style={{ position: "relative" }}>
      <button className="close_auth" style={{ backgroundColor: "transparent", position: "absolute", top: "1%", right: "1%" }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 17 18" fill="none">
          <g opacity="0.7">
            <path d="M14.1668 3L2.8335 15M14.1668 15L2.8335 3" stroke="black" strokeWidth="2" strokeLinecap="round" />
          </g>
        </svg>
      </button>

      <img width="150px" src={logoicon} />
      <h3 className="header-auth mb-30">Quên mật khẩu</h3>
      <div className="w-100 flex f-col mb-30">
        <label className="lable_auth">Nhập mã OPT</label>
        <input
          className="inp_cus inp_auth"
          placeholder="Nhập mã OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      </div>
      <div className="w-100 flex f-col">
        <button className="w-100 btn_cus auth_btn" onClick={handleVerifyOTP}><p>Kiểm tra</p></button>
      </div>
    </div>
  );
}

export default Otp;