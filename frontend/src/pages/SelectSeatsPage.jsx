import React, { useContext, useEffect } from "react";
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from "react-router-dom";
import { BookingContext } from "../BookingFlow_components/Context";
import SelectSeats from "../BookingFlow_components/components_SelectSeats/SelectSeats";
import Navbar from "../components/nav-bar"

// Custom error fallback for object rendering errors
function ErrorFallback({error}) {
  const errorMessage = error.message || "An unknown error occurred";
  const isObjectError = errorMessage.includes("Objects are not valid as a React child");
  
  return (
    <div className="error-container" style={{
      padding: '20px',
      margin: '20px',
      backgroundColor: '#ffebee',
      borderRadius: '8px',
      border: '1px solid #f44336'
    }}>
      <h2>Something went wrong:</h2>
      <pre style={{ 
        padding: '10px', 
        backgroundColor: '#f8f8f8', 
        borderRadius: '4px', 
        overflow: 'auto' 
      }}>{errorMessage}</pre>
      
      {isObjectError && (
        <div style={{ margin: '15px 0', padding: '10px', backgroundColor: '#e3f2fd', borderRadius: '4px' }}>
          <strong>Possible solution:</strong> This appears to be an issue with rendering an object directly in JSX.
          <p>Check the date formatting in ConfirmSelectSeat component.</p>
        </div>
      )}
      
      <button onClick={() => window.location.reload()} style={{
        backgroundColor: '#2196f3',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer'
      }}>
        Reload page
      </button>
    </div>
  );
}

function SelectSeatsPage() {
  // When using mock data in UI development mode, comment out or modify this block
  const { movie_id, selectedDate, selectedTime, selectedTheater, selectedRoomId } = useContext(BookingContext);
  const navigate = useNavigate();

  // Uncomment for normal operation with API
  useEffect(() => {
    // Only navigate away if not in development mode
    if (process.env.NODE_ENV !== 'development' && 
        (!movie_id || !selectedDate || !selectedTime || !selectedTheater || !selectedRoomId)) {
      navigate("/");
      return;
    }
  }, [movie_id, selectedDate, selectedTime, selectedTheater, selectedRoomId, navigate]);

  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Navbar/>
        <SelectSeats/>
      </ErrorBoundary>
    </>
  )
}

export default SelectSeatsPage;