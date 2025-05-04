import logoicon from "../assets/img/icon-logo.png";
import { useState } from "react";
import { post } from "../api/api";
import React from 'react'; 

function Repass(prop) {

  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State để quản lý trạng thái mật khẩu
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const email = sessionStorage.getItem("email");


  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Mật khẩu không khớp.");
      return;
    }

    try {
      const response = await post("/account/reset-password", { email, newPassword });

      if (response.status === 200) {
        alert(response.data.message);
        prop.changetoLogin(); // Quay lại bước đăng nhập
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("Đã có lỗi xảy ra: ", error.message);
    }
  };

  return (
    <div id="repass-popup" className="auth_box hide" style={{ position: "relative" }}>
      <button className="close_auth" style={{ backgroundColor: "transparent", position: "absolute", top: "1%", right: "1%" }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 17 18" fill="none">
          <g opacity="0.7">
            <path d="M14.1668 3L2.8335 15M14.1668 15L2.8335 3" stroke="black" strokeWidth="2" strokeLinecap="round" />
          </g>
        </svg>
      </button>

      <img width="150px" src={logoicon} />
      <h3 className="header-auth mb-30">Quên mật khẩu</h3>
      <div className="w-100 flex f-col mb-30" style={{ position: "relative" }}>
        <label className="lable_auth">Mật khẩu</label>
        <input
          className="inp_cus inp_auth"
          type={isPasswordVisible ? "text" : "password"} // Đổi type theo trạng thái
          placeholder="Nhập mật khẩu"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
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

      <div className="w-100 flex f-col" style={{ position: "relative" }}>
        <label className="lable_auth">Nhập lại mật khẩu</label>
        <input
          className="inp_cus inp_auth"
          type={isPasswordVisible ? "text" : "password"} // Đổi type theo trạng thái
          placeholder="Nhập lại mật khẩu"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
        <button className="w-100 btn_cus auth_btn" onClick={handleResetPassword}><p>Lưu</p></button>
      </div>
    </div>
  );
}

export default Repass;