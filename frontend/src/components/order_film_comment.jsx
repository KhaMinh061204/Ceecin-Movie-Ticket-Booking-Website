import Comment from "./comment";
import React from 'react'; 

function OrderFilmComment(){
    return(
        <section>
        <div className="flex w-100 f-col cenver mt-50" style={{"position":"relative","padding":"0 5%","gap":"10px", "transform":"translateY(-60px)"}}>
            <div className="flex cenhor gap10">
                <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 60 60" fill="none">
                    <path d="M30 52.5L36.1141 40.7609H50.5C51.6046 40.7609 52.5 39.8654 52.5 38.7609V9.5C52.5 8.39543 51.6046 7.5 50.5 7.5H9.5C8.39543 7.5 7.5 8.39543 7.5 9.5V38.7609C7.5 39.8654 8.39543 40.7609 9.5 40.7609H24.375L30 52.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h1 className="product-name" style={{"fontSize":"30px"}}>Đánh giá phim</h1>
            </div>
            <div className="line w-100" style={{"height":"1px", "backgroundColor":"white"}}></div>
            <div className="flex f-col w-100">
                <div className="flex cenver starthor gap20 w-100" style={{"padding":"1%"}}>
                    <img width="50px" height="50px" style={{"borderRadius":"50%"}} src="https://imgs.search.brave.com/1LcwfYbjU8OFzYWLk0FGt4SKF7kVE8qcG0TlTVd6GVc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kMzhi/MDQ0cGV2bndjOS5j/bG91ZGZyb250Lm5l/dC9jdXRvdXQtbnV4/dC9jYXJ0b29uL25l/dy8xMy5qcGc"/>
                    <div className="flex f-col w-100 gap10" style={{"border":"1px solid white","borderRadius":"5px","fontSize":"14px","color":"white","backgroundColor":"#ffffff3d", "padding":"2%"}}>
                        <h1>
                            Nguyễn Huỳnh Minh Kha
                        </h1>
                        <div className="flex gap10 ">
                            <div className="">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 48 46" fill="white">
                                    <path d="M24 0L18.3871 17.2746H0.223587L14.9182 27.9508L9.30537 45.2254L24 34.5491L38.6946 45.2254L33.0818 27.9508L47.7764 17.2746H29.6129L24 0Z" fill="#ffffff3d"/>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 48 46" fill="white">
                                    <path d="M24 0L18.3871 17.2746H0.223587L14.9182 27.9508L9.30537 45.2254L24 34.5491L38.6946 45.2254L33.0818 27.9508L47.7764 17.2746H29.6129L24 0Z" fill="#ffffff3d"/>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 48 46" fill="white">
                                    <path d="M24 0L18.3871 17.2746H0.223587L14.9182 27.9508L9.30537 45.2254L24 34.5491L38.6946 45.2254L33.0818 27.9508L47.7764 17.2746H29.6129L24 0Z" fill="#ffffff3d"/>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 48 46" fill="white">
                                    <path d="M24 0L18.3871 17.2746H0.223587L14.9182 27.9508L9.30537 45.2254L24 34.5491L38.6946 45.2254L33.0818 27.9508L47.7764 17.2746H29.6129L24 0Z" fill="#ffffff3d"/>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 48 46" fill="white">
                                    <path d="M24 0L18.3871 17.2746H0.223587L14.9182 27.9508L9.30537 45.2254L24 34.5491L38.6946 45.2254L33.0818 27.9508L47.7764 17.2746H29.6129L24 0Z" fill="#ffffff3d"/>
                                </svg>
                            </div>
                            <div className="flex cenhor cenver" style={{"width":"30px","height":"30px","border":"1px solid yellow","borderRadius":"50%","padding":"10px","backgroundColor":"#ffffff3d"}}>
                                <p>0</p>
                            </div>
                            
                        </div>
                        <div className="w-100">
                            <textarea className="w-100" style={{"height":"70px"}} placeholder="Thêm bình luận...">
                            </textarea>
                        </div>
                        <div className="flex endver cenhor">
                        <button className=" btn_cus auth_btn" id="loginbtn"><p>Gửi</p></button>
                        </div>
                    </div>
                </div>
                <Comment/>
                <Comment/>
                <Comment/>
                <div className="flex cenver w-100 mt-50">
                    <button className=" btn_cus" id="more_films"><p className="text_upper">Xem thêm</p></button>
                </div>
            </div>
        </div>
    </section>
    )
}

export default OrderFilmComment;