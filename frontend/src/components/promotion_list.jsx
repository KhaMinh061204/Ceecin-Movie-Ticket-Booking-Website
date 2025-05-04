import React from 'react'; 
function Promolist(prop){
    return(
        <section className="mt-50 mb-50">
        <div className="center_ul" id="btn_type_film_list">
            <button className="btn_cus btn-file-time-cate" id="promotion_tab"><p className="text_upper">Khuyến mãi</p></button>
        </div>
        <div className="center_ul" id="wrap-product-list">
            <div className="center_ul" id="promo-list">
            <div className="wrap-nodata hide"></div>
            {prop.data ? prop.data.map((d) => (
                    <img className="w-100 h-100 img-promo" key={d.id} src={d.url}/>
            )) : ""}
            </div>
            <button className='btn_cus' id='more_films' onClick={()=>{prop.promotenav()}}>
                <p className='text_upper'>Xem thêm</p>
            </button>
        </div>
        </section>
    )
}

export default Promolist;