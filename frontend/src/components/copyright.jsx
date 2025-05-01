import face from "../assets/img/face.png"
import yt from "../assets/img/youtube.png"
import twt from "../assets/img/twt.png"
import phone from "../assets/img/phone.png"
import React from 'react'; 

function copyRight(){

    return(
        <div className="w-100 copyright endver">
            <div className="nav f-col cenhor" style={{"gap":"10px"}}>
                <h2 className="text_upper">Liên hệ</h2>
                <div className="flex gap15">
                    <img src={face}/>
                    <img src={yt}/>
                    <img src={twt}/>
                </div>
            </div>
            <div className="nav f-col endver" style={{"gap":"10px"}}>
                <h2 className="text_upper">Tổng đài hỗ trợ</h2>
                <div className="flex gap15">
                    <img src={phone} height={48}/>
                    <h2>012 3456 7890</h2>
                </div>
            </div>
        </div>
    );

}

export default copyRight;