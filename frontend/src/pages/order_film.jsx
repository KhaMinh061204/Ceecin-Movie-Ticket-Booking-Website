/* eslint-disable react-hooks/rules-of-hooks */
import ContentOrderPage from "../layouts/content-order-page";
import Navbar from "../components/nav-bar"
import Footer from "../components/footer";
import React from 'react'; 

function OrderFilm() {


  return (
    <>        
        <Navbar/>
          <ContentOrderPage />
        <Footer/>
    </>
  )
}

export default OrderFilm
