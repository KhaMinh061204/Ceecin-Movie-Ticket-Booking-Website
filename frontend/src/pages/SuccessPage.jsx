import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "../BookingFlow_components/components_Payment/PopUp.css";
import { BookingContext } from "../BookingFlow_components/Context";
import logo from "../assets/img/logo.png";
import qrCodeImage from "../assets/img/QR_code.png";

const PopUP = () => {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState(null);
  useEffect(() => {
    const stored = localStorage.getItem("bookingData");
    if (stored) {
      setBookingData(JSON.parse(stored));
      localStorage.removeItem("bookingData");
    }
  }, []);
  
  function convertDateFormat(dateString) {
    const parts = dateString.split('-'); // Tách chuỗi theo dấu '-'
    return `${parts[2]}/${parts[1]}/${parts[0]}`; // Đổi thứ tự thành ngày/tháng/năm
  }
  
  const handleClosePaymentPopup = () => {
    //setIsPaymentPopup(false); // Đóng popup thông tin thanh toán
    navigate("/");
  };

  if (!bookingData) return;

  const {
    movieTitle,
    movieUrl,
    selectedDate,
    selectedTheater,
    selectedTime,
    selectedSeats,
  } = bookingData;

  return (
    <div className="popup-overlay">
      <div className="payment-success-container">
        {/* Tiêu đề */}
        <div className="header">
          <span className="success-icon">✅</span>
          <h2>THANH TOÁN THÀNH CÔNG</h2>
        </div>

        {/* Thông tin vé */}
        <div className="ticket-info">
          <div className="movie-details-popup">
            <div className="title-popup">
              <h3>{movieTitle}</h3>
              <p>2D Phụ đề</p>
            </div>
            <p><strong>Rạp:</strong> {selectedTheater}</p>
            <p>{selectedDate.day} - {convertDateFormat(selectedDate.date)}</p>
            <p><strong>Giờ:</strong> {selectedTime}</p>
            <p><strong>Vị trí ghế:</strong> {selectedSeats.join(", ")}</p>
          </div>

          <div className="poster-container">
            <img src={movieUrl} alt="Movie Poster" className="movie-poster-popup" />
          </div>
        </div>

        {/* QR Code */}
        <div className="qr-code-container">
          <img src={qrCodeImage} alt="QR Code" className="qr-code" />
          <p>27012004151024</p>
        </div>

        {/* Lưu ý */}
        <p className="note">
          Vui lòng đưa mã này cho nhân viên để xác nhận vé của bạn. <br />
          Mã này đã được gửi đến email của bạn.
        </p>

        {/* Nút thao tác */}
        <div className="buttons-popup">
          <button className="save-button" onClick={handleClosePaymentPopup}>💾 Lưu ảnh</button>
          <button className="home-button" onClick={handleClosePaymentPopup}>
            🏠 Về trang chủ
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUP;
