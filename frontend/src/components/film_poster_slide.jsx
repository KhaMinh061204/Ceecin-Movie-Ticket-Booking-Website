/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import $ from "jquery";
import { useEffect } from "react";
import React from 'react'; 
function FimlPosterSlide(){

    var position = 0;

    useEffect(()=>{
        bind_event();
    },[])

    var bind_event = ()=>{
        $("#left_slide").on("click",()=>{
            if(position === 0){
                position-=200;
                $(".wrap_product").css("transform", `translateX(${position}%)`)
                console.log(position)
            }else if(position === -200){
                position+=100;
                $(".wrap_product").css("transform", `translateX(${position}%)`)
                console.log(position)
            }else if(position === -100){
                position+=100;
                $(".wrap_product").css("transform", `translateX(${position}%)`)
                console.log(position)
            }
            console.log(position)
        })

        $("#right_slide").on("click",()=>{
            if(position === -200){
                position+=200;
                $(".wrap_product").css("transform", `translateX(${position}%)`)
                console.log(position)

            }else if(position === 0){
                position-=100;
                $(".wrap_product").css("transform", `translateX(${position}%)`)
                console.log(position)
            }else if(position === -100){
                position-=100;
                $(".wrap_product").css("transform", `translateX(${position}%)`)
                console.log(position)
            }
            console.log(position)
        })
    }

    return(
    <section className="wrap_body" style={{"position":"relative"}}>
       <button id="left_slide" className="flex cenhor cenver border-circle p-0" style={{"backgroundColor":"transparent","left":"0","width":"45px","height":"45px","position":"absolute","zIndex":"10000"}}>
       <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" width="30" height="30" viewBox="0 0 24 24" stroke="#ffffff" transform="matrix(-1, 0, 0, 1, 0, 0)">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                <g id="SVGRepo_iconCarrier">
                <path d="M5.536 21.886a1.004 1.004 0 0 0 1.033-.064l13-9a1 1 0 0 0 0-1.644l-13-9A1 1 0 0 0 5 3v18a1 1 0 0 0 .536.886z"/>
                </g>
                </svg>
        </button>
        <div className="wrap_newest_product">
            <div className="newest_prod">
                <div className="wrap_product">   
                    <div className="slide">
                        <div className="product p-0" style={{"position":"relative"}}>
                            <div className="product-name w-100 h-100 box-img-linear" style={{"alignContent":"center","position":"absolute", "left":"0","right":"0","padding":"0% 20% 0% 10%"}}>
                                <h1 className="mb-10 p-0" style={{"fontSize":"60px"}}>AVATAR</h1>
                                <span style={{"fontSize":"12px","textWrap":"wrap"}}>Trong phần này, khán giả sẽ được khám phá những nền văn hóa và bối cảnh mới trên hành tinh Pandora, với sự xuất hiện của các nhân vật và sinh vật mới. Đạo diễn Cameron tiết lộ rằng phim sẽ mang đến những cảm xúc sâu sắc hơn và đi vào những khía cạnh tối tăm hơn so với các phần trước.</span>
                                <div className="wrap-btn-action mt-20">
                                    <button className="btn_cus btn_film" style={{"backgroundColor":"red"}}><p>Đặt vé ngay</p></button>
                                    <button className="btn_cus btn_film" style={{"border":"1px solid white","backgroundColor":"transparent"}}><p>Xem thêm</p></button>
                                </div>
                            </div>
                            <img className="w-100 h-100" style={{"objectFit":"cover"}} src="https://congluan-cdn.congluan.vn/files/content/2022/04/30/2-1-06204547.jpg"/> 
                        </div>

                    </div>
        
        
                    <div className="slide">

                    <div className="product p-0" style={{"position":"relative"}}>
                    <div className="product-name w-100 h-100 box-img-linear" style={{"alignContent":"center","position":"absolute", "left":"0","right":"0","padding":"0% 20% 0% 10%"}}>
                    <h1 className="mb-10 p-0" style={{"fontSize":"60px"}}>Venom: The Last Dance</h1>
                                <span style={{"fontSize":"12px","textWrap":"wrap"}}>Eddie Brock and Venom must make a devastating decision as they're pursued by a mysterious military man and alien monsters from Venom's home world.</span>
                                <div className="wrap-btn-action mt-20">
                                    <button className="btn_cus btn_film" style={{"backgroundColor":"red"}}><p>Đặt vé ngay</p></button>
                                    <button className="btn_cus btn_film" style={{"border":"1px solid white","backgroundColor":"transparent"}}><p>Xem thêm</p></button>
                                </div>
                            </div>
                            <img className="w-100 h-100" style={{"objectFit":"cover"}} src="https://i.ytimg.com/vi/HyIyd9joTTc/maxresdefault.jpg"/>
                        </div>

                    </div>
                    <div className="slide ">
                    <div className="product p-0" style={{"position":"relative"}}>
                    <div className="product-name w-100 h-100 box-img-linear" style={{"alignContent":"center","position":"absolute", "left":"0","right":"0","padding":"0% 20% 0% 10%"}}>                               
                         <h1 className="mb-10 p-0" style={{"fontSize":"60px"}}>Deadpool & Wolverine</h1>
                                <span style={{"fontSize":"12px","textWrap":"wrap"}}>Deadpool's peaceful existence comes crashing down when the Time Variance Authority recruits him to help safeguard the multiverse. He soon unites with his would-be pal, Wolverine, to complete the mission and save his world from an existential threat.</span>
                                <div className="wrap-btn-action mt-20">
                                    <button className="btn_cus btn_film" style={{"backgroundColor":"red"}}><p>Đặt vé ngay</p></button>
                                    <button className="btn_cus btn_film" style={{"border":"1px solid white","backgroundColor":"transparent"}}><p>Xem thêm</p></button>
                                </div>
                            </div>
                            <img className="w-100 h-100" style={{"objectFit":"cover"}} src="https://m.media-amazon.com/images/S/pv-target-images/34ad26abbc7a49fd05a67873bb65ea0e0bd5ac818ce0b7eb53db96aff464ffbb._UR1920,1080_.jpg"/>
                        </div>
                    </div>
    
                </div>
                
            </div>
        </div>
        <button id="right_slide" className="flex cenhor cenver border-circle p-0" style={{"backgroundColor":"transparent","right":"0","width":"45px","height":"45px","position":"absolute","zIndex":"10000"}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" width="30" height="30" viewBox="0 0 24 24" stroke="#ffffff" >
                <g id="SVGRepo_bgCarrier" strokeWidth="0" fill="rgb(187, 151, 93)"/>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" fill="#ffffff"/>
                <g id="SVGRepo_iconCarrier" fill="#ffffff">
                <path d="M5.536 21.886a1.004 1.004 0 0 0 1.033-.064l13-9a1 1 0 0 0 0-1.644l-13-9A1 1 0 0 0 5 3v18a1 1 0 0 0 .536.886z" fill="#ffffff"/>
                </g>
            </svg>
        </button>
    </section>
    )
}

export default FimlPosterSlide;