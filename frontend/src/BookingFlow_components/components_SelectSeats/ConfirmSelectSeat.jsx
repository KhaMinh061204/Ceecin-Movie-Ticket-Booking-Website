import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BookingContext } from "../Context";
import { createTicket } from "../../api/api.js";
import "./confirmselectseat.css";

function ConfirmSelectSeat() {
  const {
    selectedTheater,
    selectedTime,
    selectedDate,
    convertDateFormat,
    movieTitle,
    movieUrl,
    selectedSeats = [],
    selectedSeatIds,
    selectedShowtimeId,
    createdTicketIds,setCreatedTicketIds,
    ticketPrice = 70000 // Default price in VND
  } = useContext(BookingContext);
  
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const handleNext = async () => {
    try {
      if (selectedSeats.length > 0) {
        // Tạo ticket cho từng ghế

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
  
        navigate("/cornpage");
      } else {
        alert('Bạn chưa chọn ghế!');
      }
    } catch (error) {
      console.error("Lỗi trong handleNext:", error);
      alert(error.message || "Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  };
  
  
  const totalAmount = selectedSeats.length * ticketPrice;
  
  const formatCurrency = (amount) => {
    return amount.toLocaleString('vi-VN') + ' đ';
  };

  return (
    <div className="container">
      <div className="container_card">
        {/* Movie info card */}
        <div className="card">
          {/* Poster */}
          <img
            src={movieUrl}
            alt={movieTitle}
            className="poster"
          />

          {/* Thông tin */}
          <div className="info">
            <h3 className="title-confirm">{movieTitle}</h3>
            <p className="subtitle">2D Phụ đề</p>
            <div className="details">
              {selectedTheater && <p>Rạp: {selectedTheater}</p>}
              {selectedDate && selectedDate.day && (
                <p>{selectedDate.day} - {convertDateFormat(selectedDate.date)}</p>
              )}
              {selectedTime && <p>Giờ: {selectedTime}</p>}
            </div>
          </div>
        </div>
        
        {/* Crossbar separator */}
        <div className="crossbar"></div>
        
        {/* Seat information */}
        <div className="infoseat">
          <div className="seatdetail">
            <p>Ghế: {selectedSeats.join(", ") || "Chưa chọn"}</p>
            <p>Số lượng: {selectedSeats.length}</p>
          </div>
          <div className="seatprice">
            {formatCurrency(ticketPrice * selectedSeats.length)}
          </div>
        </div>
      </div>

      {/* Total amount */}
      <div className="total">
        <div className="totaltext">Tổng tiền</div>
        <div className="totalprice">{formatCurrency(totalAmount)}</div>
      </div>

      {/* Navigation buttons */}
      <div className="buttons">
        <button className="button-back" onClick={handleBack}>Quay lại</button>
        <button className="button-next" onClick={handleNext}>Tiếp theo</button>
      </div>
    </div>
  );
}

export default ConfirmSelectSeat;