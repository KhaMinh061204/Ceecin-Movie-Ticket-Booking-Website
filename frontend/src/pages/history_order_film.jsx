import Navbar from "../components/nav-bar"
import Footer from "../components/footer";
import ContentTransacPage from "../layouts/content-transacHistory_page";
import React from 'react'; 

function HistoryOrderFilm(){
    return(
        <>
            <Navbar/>
            <ContentTransacPage />
            <Footer/>
        </>
    )
}

export default HistoryOrderFilm;