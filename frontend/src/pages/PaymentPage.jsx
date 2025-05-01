import Navbar from "../components/nav-bar"
import Footer from "../components/footer"
import Payment from "../BookingFlow_components/components_Payment/Payment"
import { useContext,useEffect } from "react";
import { BookingContext } from "../BookingFlow_components/Context";
import { useNavigate } from "react-router-dom";
import React from 'react'; 

function PaymentPage() {
  const { movie_id, selectedDate,selectedTime, selectedTheater,selectedRoomId,selectedSeats } = useContext(BookingContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!movie_id || !selectedDate || !selectedTime || !selectedTheater || !selectedRoomId || !selectedSeats) {
      navigate("/");
    }
  }, [movie_id, selectedDate, selectedTime, selectedTheater, selectedRoomId, selectedSeats,navigate]);
  return (
    <>
    <Navbar></Navbar>
      <Payment></Payment>
    <Footer></Footer>
    </>
  )
}

export default PaymentPage