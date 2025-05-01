import Navbar from "../components/nav-bar"
import Footer from "../components/footer"
import ContentPromotionPage from "../layouts/content-promotion-page"
import React from 'react'; 

function CinemaPage() {
    return (
        <>
            <Navbar></Navbar>
                <ContentPromotionPage/>
            <Footer></Footer>
        </>
    )
}

export default CinemaPage