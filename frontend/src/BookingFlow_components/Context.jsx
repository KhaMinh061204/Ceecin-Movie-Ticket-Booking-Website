import React, { createContext, useState,useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
// Tạo Context
export const BookingContext = createContext();

// Provider để bao bọc các component con và truyền dữ liệu
export const BookingProvider = ({ children }) => {
  const [movie_id, setMovie_id] = useState(null); 
  const [movieTitle, setMovieTitle] = useState(""); 
  const [movieUrl, setMovieUrl] = useState("");
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState({ day: "Thứ 2", date: "2024-12-13" });
  const seatPrice = 70000;
  const [selectedSeats, setSelectedSeats] = useState([]); // State lưu ghế đã chọn
  const [order, setOrder] = useState({});
  const [selectedRoomId, setSelectedRoomId]=useState(null);
  const [selectedShowtimeId, setSelectedShowtimeId]=useState([])
  const [selectedSeatIds, setSelectedSeatIds] = useState([]);
  const [fandb,setFandB]=useState([])
  const [stripe, setStripe] = useState(null);
  const [cardElement, setCardElement] = useState(null);
  const [elements, setElements] = useState(null);
  const [user, setUser] = useState({ name: "", avatar: "" });

  const navigate=useNavigate()
  const totalCorn = () => {
    return Object.keys(order).reduce((total, itemId) => {
      const item = order[itemId];
      total += item.price * item.quantity;
      return total;
    }, 0);
  };

  const [discountAmount, setDiscountAmount] = useState(0);

  function convertDateFormat(dateString) {
    const parts = dateString.split('-'); // Tách chuỗi theo dấu '-'
    return `${parts[2]}/${parts[1]}/${parts[0]}`; // Đổi thứ tự thành ngày/tháng/năm
  }

  const formatCurrency = (value) => new Intl.NumberFormat("vi-VN").format(value);

  // PopUp Context
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isPaymentPopup, setIsPaymentPopup] = useState(false);
  // Kiểm tra trường input thông tin thanh toán có trống không
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);  


  
  const handleConfirmClick = async () => {
    if (!stripe || !cardElement) {
      alert('Stripe chưa sẵn sàng!');
      return;
    }

    
    const tickets = [
      {
        name: movieTitle,    
        image: movieUrl,    // URL ảnh vé
        quantity: selectedSeats.length,   // số lượng vé
        price: seatPrice,    // giá 1 vé (USD hoặc VND *100)
      }
    ];
    const FandB = fandb.map(item => ({
      id: item.id,
      name: item.name,
      image: item.image,  // Thay thế bằng đường link ảnh thật nếu có
      quantity: item.quantity,
      price: item.price
    }));
    const data = [FandB,tickets];
    const products=data.flat();

    // Lưu thông tin đặt vé vào localStorage trước khi chuyển trang
    const bookingData = {
      movieTitle,
      movieUrl,
      selectedSeats,
      selectedDate,
      selectedTime,
      selectedTheater,
      fandb,
    };

    localStorage.setItem("bookingData", JSON.stringify(bookingData));

    if (isButtonDisabled) {
      try {
        const response = await fetch('https://ceecine.onrender.com/booking/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({products}),
        });
  
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Server trả lỗi:', errorText);
          alert('Có lỗi từ server: ' + errorText);
          return;
        }
  
        const data = await response.json(); // Parse JSON response
        const sessionId = data.sessionId;  // Lấy sessionId từ response
  
        if (!sessionId) {
          alert('Không lấy được sessionId từ server!');
          return;
        }
  
        const { error } = await stripe.redirectToCheckout({
          sessionId: sessionId 
        });
  
        if (error) {
          alert(error.message);
        }
      } catch (error) {
        console.error("Lỗi khi gọi API backend:", error);
        alert('Có lỗi xảy ra trong quá trình thanh toán!');
      }
    } else {
      alert('Vui lòng điền đầy đủ thông tin!');
    }
  };
  
  

  const handleConfirmClose = () => {
    setIsConfirmPopupOpen(false); // Đóng popup xác nhận
  };

  const handleConfirmOpen = () => {
    setIsConfirmPopupOpen(false); // Đóng popup xác nhận
    setIsPaymentPopup(true); // Hiển thị popup thông tin thanh toán
  };

  const handleClosePaymentPopup = () => {
    setIsPaymentPopup(false); // Đóng popup thông tin thanh toán
    navigate("/");
  };

  // Input Discount
  const [discountInput, setDiscountInput] = useState(0);
  


  
  return (
    <BookingContext.Provider
      value={{
        movie_id, setMovie_id,
        movieTitle, setMovieTitle, 
        movieUrl, setMovieUrl,
        selectedDate, setSelectedDate,
        selectedTheater, setSelectedTheater,
        selectedTime, setSelectedTime,
        seatPrice,
        selectedSeats, setSelectedSeats,
        order, setOrder,
        convertDateFormat, 
        totalCorn,
        discountAmount, setDiscountAmount,
        formatCurrency,
        handleConfirmClick, handleConfirmClose, handleConfirmOpen, handleClosePaymentPopup,
        isConfirmPopupOpen, isPaymentPopup,
        discountInput, setDiscountInput,
        selectedRoomId,setSelectedRoomId,
        selectedShowtimeId, setSelectedShowtimeId,
        selectedSeatIds, setSelectedSeatIds ,
        fandb,setFandB,
        isButtonDisabled, setIsButtonDisabled,
        stripe, setStripe,
        cardElement, setCardElement,
        setElements,
        user, setUser
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
