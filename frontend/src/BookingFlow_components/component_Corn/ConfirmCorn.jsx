import "./ConfirmCorn.css"; // Import file CSS
import avengerposter from '../../assets/img/avengerposter.jpg';
import { useNavigate } from "react-router";
import { BookingContext } from "../Context";
import { useContext, useState } from "react";
import { createTicket, createBooking } from "../../api/api";
import React from 'react'; 

function ConfirmCorn() {
  const {
    selectedSeats,
    selectedSeatIds,
    selectedShowtimeId,
    seatPrice,
    selectedTheater,
    selectedTime,
    selectedDate,
    order,
    convertDateFormat,
    totalCorn,
    formatCurrency,
    fandb,
    movieTitle,
    movieUrl, setBookingId
  } = useContext(BookingContext);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleNext = async () => {
    try {
      setLoading(true);

      // Tạo ticket cho từng ghế
      const createdTicketIds = [];
      for (const seat of selectedSeatIds) {
        try {
          const ticketResponse = await createTicket({
            seat_id: seat, // `seat` là ID của ghế
            showtime_id: selectedShowtimeId,
          });
          createdTicketIds.push(ticketResponse.ticket._id);
        } catch (error) {
          console.error(`Error creating ticket for seat ${seat}:`, error.response?.data || error.message);
        }
      }
      console.log('create',createdTicketIds)
      if (createdTicketIds.length === 0) {
        throw new Error("Không thể tạo vé. Vui lòng kiểm tra lại thông tin.");
      }

      // Tạo booking
      const fandbItems = Object.values(fandb).filter((item) => item.quantity > 0);
      const bookingResponse = await createBooking({
        ticket_ids: createdTicketIds,
        fandb_items: fandbItems,
      });
      console.log("bookingId", bookingResponse.booking._id);
      setBookingId(bookingResponse.booking._id);
      // alert("Tiếp tục thanh toán!");
      navigate("/payment");
    } catch (error) {
      console.error("Error during booking process:", error);
      alert(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = selectedSeats.length * seatPrice + totalCorn();

  return (
    <div className="container">
      <div className="container_card">
        <div className="card">
          {/* Poster */}
          <img
            src={movieUrl} // Thay link này bằng link poster phim
            alt="Avengers: Infinity War"
            className="poster"
          />

          {/* Thông tin rạp chiếu */}
          <div className="info">
            <h3 className="title-confirm">{movieTitle}</h3>
            <p className="subtitle">2D Phụ đề</p>
            <div className="details">
              <p>Rạp: {selectedTheater}</p>
              <p>{selectedDate.day} - {convertDateFormat(selectedDate.date)}</p>
              <p>Giờ: {selectedTime}</p>
            </div>
          </div>
        </div>

        {/* Thanh Ngang */}
        <div className="crossbar"></div>

        {/* Thông tin ghế */}
        <div className="infoseat">
          <div className="seatdetail">
            <p>Số lượng ghế: {selectedSeats.length}</p>
            <p>Vị trí ghế: {selectedSeats.join(", ")}</p>
          </div>
          <div className="seatprice">{selectedSeats.length} x {formatCurrency(seatPrice)}</div>
        </div>
      </div>

      {/* Thông tin bắp nước */}
      {Object.values(order)
        .filter((item) => item.quantity > 0) // Chỉ hiển thị các mặt hàng có số lượng > 0
        .map((item, index) => (
          <div key={index} className="total">
            <div className="totaltext" style={{ width: "70%" }}>
              <p>{item.quantity} x {item.name}</p>
            </div>
            <div className="totalprice" style={{ width: "30%" }}>
              {formatCurrency(item.quantity * item.price)}đ
            </div>
          </div>
        ))}

      {/* Tổng tiền */}
      <div className="total">
        <div className="totaltext" style={{ fontWeight: 'bold' }}>Tổng tiền:</div>
        <div className="totalprice">{formatCurrency(totalPrice)}</div>
      </div>

      {/* Nút điều hướng */}
      <div className="buttons">
        <button className="button-back" onClick={handleBack}>Quay lại</button>
        <button className="button-next" onClick={handleNext} disabled={loading}>
          {loading ? "Đang xử lý..." : "Tiếp theo"}
        </button>
      </div>
    </div>
  );
};

export default ConfirmCorn;
