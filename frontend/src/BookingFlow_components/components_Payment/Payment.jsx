import ProgressBar from "../component_ProgressBar/ProgressBar"
import MovieCard from "../components_ShowTime/MoviesCard"
import ConfirmPayment from "./ConfirmPayment"
import MethodPayment from "./MethodPayment"
import "./Payment.css"
import Promotion from "./Promotion"
import React from 'react'; 

function Payment() {
  return (
    <div className="payment-page-container"> 
      <div className="payment-header">
        <div className="payment-movie-card">
          <MovieCard />
        </div>
        <ProgressBar Progress={3} />
      </div>

      <div className="payment-content">
        <div className="payment-right-column">
          <ConfirmPayment />
        </div>
        
        <div className="payment-left-column">
          <Promotion />
          <MethodPayment />
        </div>
      </div>
    </div>
  )
}

export default Payment