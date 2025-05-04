import Copyright from "./copyright"
import React from 'react'; 
function footer(){
    
    return(
        <footer>
        <div className="foot_el" id="footer">
            <div className="wrap_logo_footer f-col">
                <div className="logo text_upper" id="logo">
                    Thông tin liên hệ
                </div>
                <div className="row mt-30">
                    <div>
                        <label className="text_upper" style={{"color":"white","fontSize":"14px"}}>Địa chỉ email</label>
                        <input className="inp_cus" placeholder="Nhập email..."/>
                    </div>
                    <div>
                        <label className="text_upper" style={{"color":"white","fontSize":"14px"}}>Họ tên</label>
                        <input className="inp_cus" placeholder="Nhập họ tên..."/>
                    </div>
                </div>
                <div className="row mt-30">
                    <button className="w-100 btn_cus" id="send_footer_btn"><p className="text_upper">Gửi ngay</p></button>
                </div>
            </div>
            
            <div className="nav f-col starthor" style={{"gap":"10px"}}>
                <h2>CEECINE</h2>
                <p>Giới thiệu</p>
                <p>Tuyển dụng</p>
            </div>
            <div className="nav f-col starthor" style={{"gap":"10px"}}>
                <h2 className="text_upper">Hệ thống rạp</h2>
                <p>Tất cả các hệ thống rạp</p>
                <p>Rạp CGV</p>
                <p>Rạp Galaxy Cinema</p>
                <p>CineStar</p>
            </div>
            <div className="nav f-col starthor" style={{"gap":"10px"}}>
                <h2 className="text_upper">KHUYẾN MÃI</h2>
            </div>
        </div>
        <Copyright/>
    </footer>
    );

}

export default footer;