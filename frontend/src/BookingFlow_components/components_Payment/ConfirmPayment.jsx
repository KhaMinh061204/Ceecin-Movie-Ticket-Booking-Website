import React from "react";
import "./ConfirmPayment.css"; // Import file CSS
import avengerposter from '../../assets/img/avengerposter.jpg';
import { useNavigate } from "react-router";
import { BookingContext } from "../Context";
import { useContext } from "react";
import { loadStripe } from '@stripe/stripe-js';
import PopUP from "./PopUp";
import { useEffect } from "react";
const stripePromise = await loadStripe('pk_test_51RHQfxRo8s9ox9Q9YzcYdG40FOaAu2hQUb2ZVdl1GNP4B0jRnaZCbU9iFHZp8qkdURz1wFqj5PRXKR4OoHMK4A1600ZjhATk6U'); // public key

function ConfirmPayment () {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate(-1);
  };

  const {selectedSeats, seatPrice, selectedTheater, selectedTime, selectedDate, order, convertDateFormat, totalCorn, 
    discountAmount, formatCurrency, handleConfirmClick, discountInput, movieTitle, movieUrl,stripe, setStripe,
    cardElement, setCardElement, setElements} = useContext(BookingContext);

  const totalPrice = selectedSeats.length * seatPrice + totalCorn() - discountAmount - discountInput;
  const discount = discountAmount + discountInput;

  
  useEffect(() => {
      async function initStripe() {
        try {
          const stripeInstance = await stripePromise;
          const elementsInstance = stripeInstance.elements();
          const cardElementInstance = elementsInstance.create('card');
          cardElementInstance.mount('#card-element');
    
          setStripe(stripeInstance);
          setElements(elementsInstance);
          setCardElement(cardElementInstance);
        } catch (error) {
          console.error("Error Stripe:", error);
        }
      }
    initStripe();
  }, []);
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

          {/* Thông tin rap chiếu*/}
          <div className="info">
            <h3 className="title-confirm">{movieTitle}</h3>
            <p className="subtitle">2D Phụ đề</p>
            <div className="details">
              <p>Rạp: {selectedTheater}</p>
              <p>{selectedDate.day} - {convertDateFormat(selectedDate.date)} </p>
              <p>Giờ: {selectedTime}</p>
            </div>
          </div>
        </div>

        {/*Thanh Ngang */}
        <div className="crossbar"></div>

        {/*Thông tin ghế */}
        <div className="infoseat">
          <div className="seatdetail">
            <p> Số lượng ghế: {selectedSeats.length}</p>
            <p> Vị trí ghế: {selectedSeats.join(", ")}</p>
          </div>
          <div className="seatprice"> {selectedSeats.length} x {formatCurrency(seatPrice)}</div>
        </div>
      </div>

      {/*Thông tin bắp nước */}
      {/* Hiển thị từng mặt hàng */}
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

      {/*Giảm giá*/}
      {discount > 0 && (
      <div className="total">
        <div className="totaltext"> Giảm giá </div>
        <div className="totalprice"> {formatCurrency(discount)} </div>
      </div> 
      )}

      <div className="total">
        <div className="totaltext" style={{fontWeight:'bold'}}> Tổng tiền: </div>
        <div className="totalprice"> {formatCurrency(totalPrice)} </div>
      </div>

      {/* Nút điều hướng */}
      <div className="buttons">
        <button className="button-back" onClick={handleBack}>Quay lại</button>
        <div id="card-element"></div>
        <button className="button-next" onClick={handleConfirmClick}>Tiếp theo</button>
      </div>

      <PopUP></PopUP>
    </div>
  );
};

export default ConfirmPayment;
