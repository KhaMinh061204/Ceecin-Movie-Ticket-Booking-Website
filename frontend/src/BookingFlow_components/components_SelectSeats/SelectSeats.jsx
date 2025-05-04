import { useCallback, useContext, useEffect, useState } from "react"
import ProgressBar from "../component_ProgressBar/ProgressBar"
import MovieCard from "../components_ShowTime/MoviesCard"
import { BookingContext } from "../Context"
import CinemaSeat from "./CinemaSeat"
import ConfirmSelectSeat from "./ConfirmSelectSeat"
import './SelectSeatsResponsive.css'
import React from 'react'; 

function SelectSeats() {
  const { setSelectedSeats, setSelectedSeatIds } = useContext(BookingContext);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  // Add responsive detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const handleSelectSeat = useCallback((seats, seatId) => {
    try {
      if (!Array.isArray(seats) || !Array.isArray(seatId)) {
        console.warn("Invalid seat data format:", { seats, seatId });
        return;
      }
      
      setSelectedSeats(seats); 
      setSelectedSeatIds(seatId);
    } catch (err) {
      console.error("Error updating selected seats:", err);
      setError("Có lỗi khi chọn ghế. Vui lòng thử lại.");
    }
  }, [setSelectedSeats, setSelectedSeatIds]);

  return (
    <div className="select-seats-container"> 
      <div className="movie-progress-container">
        <MovieCard />
        <ProgressBar Progress={1} />
      </div>

      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => setError(null)}>Dismiss</button>
        </div>
      )}

      <div className="booking-layout">
        <div className="seats-container">
          <CinemaSeat onSeatChange={handleSelectSeat}/>
        </div>
        <div className="confirmation-container">
          <ConfirmSelectSeat isMobile={isMobile} />
        </div>
      </div>
    </div>
  )
}

export default SelectSeats