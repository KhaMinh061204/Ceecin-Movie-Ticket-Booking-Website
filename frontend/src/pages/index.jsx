/* eslint-disable react-hooks/rules-of-hooks */
import ContentHomePage from "../layouts/content-home-page";
import Navbar from "../components/nav-bar"
import Footer from "../components/footer";
import React from 'react'; 

function index() {

  return (
    <>        
    {/* header  */}
        <Navbar />
        <ContentHomePage />
        <Footer/>
    </>
  )
}

export default index
