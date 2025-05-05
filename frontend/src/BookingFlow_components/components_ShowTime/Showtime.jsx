import React, { useContext, useEffect, useState } from 'react';
import ProgressBar from '../component_ProgressBar/ProgressBar';
import { BookingContext } from '../Context';
import CinemaSelector from './CinemaSelector';
import Confirm from './Confirm';
import MovieCard from './MoviesCard';
import ScheduleList from './ScheduleList';
import './Showtime.css';
import TimeBar from './TimeBar';

function Showtime() {
  const { selectedDate, setSelectedDate,
    selectedTheater, setSelectedTheater,
    selectedTime, setSelectedTime,
    selectedRoomId, setSelectedRoomId,
    selectedShowtimeId, setSelectedShowtimeId } = useContext(BookingContext);
  
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Hàm nhận dữ liệu từ component con
  const handleScheduleSelection = (theater, time, roomId, showtimeId) => {
    setSelectedTheater(theater);
    setSelectedTime(time);
    setSelectedRoomId(roomId);
    setSelectedShowtimeId(showtimeId);
    // console.log("Theater selected:", theater);
    // console.log("Time selected:", time);
    // console.log("Room ID selected:", roomId);
    // console.log("Showtime selected:", showtimeId);
  };

  const handleDateSelect = (selectedDayData) => {
    setSelectedDate(selectedDayData);// Cập nhật thông tin ngày đã chọn vào state
  };

  return (
    <div className="showtime-container">
      <div className="movie-card-wrapper">
        <MovieCard />
      </div>

      {/* Progress Bar */}
      <div className="progress-bar-wrapper">
        <ProgressBar Progress={0} />
      </div>

      {isMobile && (
        <div className="mobile-filter-wrapper">
          <CinemaSelector />
        </div>
      )}

      {/* Main Content Area */}
      <div className="showtime-content">
        <div className="showtime-left-column">
          <TimeBar onDateSelect={handleDateSelect} />
          <ScheduleList selectedDate={selectedDate} onScheduleSelect={handleScheduleSelection} />
        </div>

        <div className="showtime-right-column">
          {/* On desktop: CinemaSelector appears here */}
          {!isMobile && <CinemaSelector />}
          <Confirm />
        </div>
      </div>
    </div>
  );
}

export default Showtime;