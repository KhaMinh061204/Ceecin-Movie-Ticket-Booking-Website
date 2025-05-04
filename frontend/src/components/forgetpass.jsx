import logoicon from "../assets/img/icon-logo.png";
import { useState } from "react";
import { post } from "../api/api";
import React from 'react'; 
function ForgetPass(prop) {

  const [email, setEmail] = useState("");

  const handleSendOTP = async () => {
    try {
      sessionStorage.setItem("email", email);
      const response = await post("/account/forgot-password", { email: email });
      if (response.status === 200) {

        alert(response.data.message); // Hiển thị thông báo thành công
        prop.OTP();
      } else {
        alert(response.data.message); // Hiển thị lỗi
      }
    } catch (error) {
      alert("Có lỗi xảy ra: " + error.message);
    }
  };
  return (
    <div id="forgetpass-popup" className="auth_box hide" style={{ position: "relative" }}>
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
        <label className="lable_auth">Email</label>
        <input
          className="inp_cus inp_auth"
          placeholder="Nhập email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="w-100 flex f-col mb-30">
        <button onClick={handleSendOTP} className="w-100 btn_cus auth_btn" ><p>Tiếp theo</p></button>
      </div>
      <div className="w-100 flex cenhor cenver text-center mt-30">
        <p><a onClick={prop.changetoLogin} className="nav-auth" style={{ color: "#3D70B7" }}>Đăng nhập</a></p>
      </div>
    </div>
  );
}

export default ForgetPass;