import React, { useContext, useState } from 'react';
import { checkCoupon } from '../../api/api'; // Import checkCoupon từ api.js
import { BookingContext } from '../Context';
import './Promotion.css';
import VoucherCardList from './VoucherCardList';

const Promotion = () => {
  const { discountInput, setDiscountInput, couponCode, setCouponCode } = useContext(BookingContext);
  const [title, setTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCouponApply = async () => {
    try {
      const res = await checkCoupon(couponCode);  // Gọi API checkCoupon 
      setDiscountInput(res.balance); // Gán giá trị từ API response
      alert('Áp dụng mã giảm giá thành công!'); // Hiển thị thông báo thành công
        setErrorMessage(res.message); // Hiển thị thông báo lỗi nếu coupon không hợp lệ

    } catch (error) {
      setErrorMessage(error.message || 'Đã xảy ra lỗi, vui lòng thử lại.');
    }
  };

  return (
    <div className="promo-container">
      <h2>Khuyến mãi</h2>
      <div className="input-container">
        <input
          type="text"
          placeholder="Mã giảm giá"
          className="promo-input"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        <button className="apply-button" onClick={handleCouponApply}>Áp dụng</button>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      
      <div className="voucher-section">
        <h3>Voucher của bạn</h3>
        <VoucherCardList />
      </div>
    </div>
  );
};

export default Promotion;
