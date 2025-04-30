import React, { useState, useEffect, useContext } from "react";
import "./MethodPayment.css"; // File CSS để định kiểu
import momo from '../../assets/icon/momo.webp'
import card from '../../assets/icon/card.png' 
import bank from '../../assets/icon/bank.png'
import zalopay from '../../assets/icon/zalopay.png'
import shoppepay from '../../assets/icon/shoppepay.webp'
import googlepay from '../../assets/icon/googlepay.png' 
import vnpay from '../../assets/icon/vnpay.webp'
import { BookingContext } from "../Context";

function MethodPayment() {
  const [selectedMethod, setSelectedMethod] = useState(""); // Trạng thái lưu phương thức đã chọn

  const {setIsButtonDisabled}  = useContext(BookingContext);

  const paymentMethods = [
    { id: "card", label: "Card", icon: card },
    { id: "momo", label: "Momo", icon: momo },
    { id: "bank", label: "Bank", icon: bank},
    { id: "zalopay", label: "Zalo pay", icon: zalopay},
    { id: "shopeepay", label: "Shopee pay", icon: shoppepay},
    { id: "gpay", label: "Google pay", icon: googlepay},
    { id: "vnpay", label: "VNPay", icon: vnpay},
  ];

  const handleSelect = (id) => {
    setSelectedMethod(id);
  };

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  useEffect(() => {
    if (!selectedMethod) {
      setIsButtonDisabled(false);
    } else {
      const isDisabled = 
        (selectedMethod === "card" || selectedMethod === "bank")
          ? true // Kiểm tra xem các giá trị có hợp lệ không
          : false; // Chỉ cần kiểm tra cardNumber nếu là phương thức khác
      setIsButtonDisabled(isDisabled);
    }
  }, [selectedMethod, cardNumber, expiry, cvv, setIsButtonDisabled]);

  return (
    <div className="payment-container">
      <h2>Phương thức thanh toán</h2>
      <div className="payment-methods">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            className={`payment-button ${
              selectedMethod === method.id ? "selected" : ""
            }`}
            onClick={() => handleSelect(method.id)}
          >
            <img src={method.icon} alt="logo" className="icon"/>
            <span>{method.label}</span>
          </button>
        ))}
      </div>

      {/* Hiển thị thông tin thẻ nếu chọn "Card" */}
      {(selectedMethod === "card" || selectedMethod === 'bank') ? (
        <div className="card-info">
          {/* <div className="form-group">
            <label>Mã số thẻ</label>
            <input type="text" placeholder="Input numbers card (>10 numbers)" onChange={(e) => setCardNumber(e.target.value)}/>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Expiry</label>
              <input type="text" placeholder="MM/YY (Example: 15/10)" onChange={(e) => setExpiry(e.target.value)}/>
            </div>
            <div className="form-group">
              <label>CVV</label>
              <input type="text" placeholder="CVV (Example: 271)" onChange={(e) => setCvv(e.target.value)}/>
            </div>
          </div> */}
        </div>
      ) : (
        <div className="form-group">
          <label>Mã ví</label>
          <input type="text" placeholder="Enter wallet code (>10 numbers)" onChange={(e) => setCardNumber(e.target.value)}/>
        </div>
      )}

      {/* Checkbox xác nhận */}
      <div className="checkbox-group">
        <input type="checkbox" id="terms" />
        <label htmlFor="terms">
          Tôi đồng ý với
          <a href="https://example.com/terms" target="_blank" rel="noopener noreferrer" style={{color:"blue", marginLeft:'5px'}}>điều khoản sử dụng </a> 
          và mua vé cho người có độ tuổi phù hợp
        </label>
      </div>
    </div>
  );
}

export default MethodPayment;
