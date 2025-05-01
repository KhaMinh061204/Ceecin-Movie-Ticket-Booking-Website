import React from 'react'; 
function Cinema(){
    return(
        <div className="flex f-col gap10" style={{"border":"1px solid white","borderRadius":"5px","fontSize":"14px","color":"white","backgroundColor":"#701D34", "padding":"2%"}}>
            <div className="flex cenhor gap20">
                <h1>CGV Vincom Gò Vấp</h1>
                <p>2D Phụ đề</p>
            </div>
            <div className="flex cenhor gap20">
                <p>Tầng 5 TTTM Vincom Plaza Gò Vấp, 12 Phan Văn Trị, P.7, Q. Gò Vấp, Tp. Hồ Chí Minh</p>
            </div>
            <div className="flex cenhor gap20" >
                <p className="text-badge" style={{"fontSize":"18px","padding":"7px 30px","backgroundColor":"#D9D9D9","color":"black"}}>9:00</p>
                <p className="text-badge" style={{"fontSize":"18px","padding":"7px 30px","backgroundColor":"#D9D9D9","color":"black"}}>11:00</p>
                <p className="text-badge" style={{"fontSize":"18px","padding":"7px 30px","backgroundColor":"#D9D9D9","color":"black"}}>13:00</p>
                <p className="text-badge" style={{"fontSize":"18px","padding":"7px 30px","backgroundColor":"#D9D9D9","color":"black"}}>15:00</p>
                <p className="text-badge" style={{"fontSize":"18px","padding":"7px 30px","backgroundColor":"#D9D9D9","color":"black"}}>17:00</p>
                <p className="text-badge" style={{"fontSize":"18px","padding":"7px 30px","backgroundColor":"#D9D9D9","color":"black"}}>19:00</p>
                <p className="text-badge" style={{"fontSize":"18px","padding":"7px 30px","backgroundColor":"#D9D9D9","color":"black"}}>21:00</p>
            </div>
        </div>
    )
}

export default Cinema;