import Navbar from "../components/nav-bar"
import Footer from "../components/footer"
import Showtime from '../BookingFlow_components/components_ShowTime/Showtime'
import React from 'react'; 

function ShowtimePage() {
  return (
    <>
    <Navbar></Navbar>
      <Showtime></Showtime>
    <Footer></Footer>
    </>
  )
}

export default ShowtimePage