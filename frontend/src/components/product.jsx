import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import comm from "../utils/common";
import $ from "jquery"
import React from 'react'; 

function Product(prop){
    const navigate = useNavigate(); 
    useEffect(()=>{
        new comm().do_grabb_scroll("#wrap-recom-product");
    })

    const handleBooking = () => {
        // Điều hướng sang trang khác (có thể truyền id hoặc thông tin sản phẩm qua URL)
        if(localStorage.getItem('token')){
            navigate(`/booking/${prop.id}`);
            return;
        }
        $("#authpopup").removeClass("hide");
    };

    const handleDetail = () => {
        // Điều hướng sang trang khác (có thể truyền id hoặc thông tin sản phẩm qua URL)
        navigate(`/movie/${prop.id}`);
    };

    if(prop.futu){
        return(
            <div className="wrap-product" data-id={prop.id}>
                <div className="wrap-prod-info">
                    <div className="product-topinf">{prop.type} / {prop.length}</div>
                    <div className="product-name">{prop.name}</div>
                    <div className="wrap-product-user">
                        <div className="wrap-btn-action">
                            <button 
                                className="btn_cus btn_film" 
                                style={{ border: "1px solid white", backgroundColor: "transparent" }}
                                onClick={(e) => {
                                    e.stopPropagation(); // Ngăn chặn event "onClick" trên cha
                                    handleDetail();}}
                            >
                                <p>Chi tiết</p>
                            </button>
                        </div>
                    </div>
                </div>
                <img className="img_prod_el" src={prop.img}  />
            </div>
        );
    }else{
        return(
            <div className="wrap-product" data-id={prop.id}>
                <div className="wrap-prod-info">
                    <div className="product-topinf">{prop.type} / {prop.length}</div>
                    <div className="product-name">{prop.name}</div>
                    <div className="wrap-product-user">
                        <div className="wrap-btn-action">
                            <button className="btn_cus btn_film" style={{"backgroundColor":"red"}} onClick={(e) => {
                                e.stopPropagation(); // Ngăn chặn event "onClick" trên cha
                                handleBooking();
                            }}><p>Đặt vé ngay</p></button>
                            
                            <button 
                                className="btn_cus btn_film" 
                                style={{ border: "1px solid white", backgroundColor: "transparent" }}
                                onClick={(e) => {
                                    e.stopPropagation(); // Ngăn chặn event "onClick" trên cha
                                    handleDetail();}}
                            >
                                <p>Chi tiết</p>
                            </button>
                        </div>
                    </div>
                </div>
                <img className="img_prod_el" src={prop.img}  />
            </div>
        );
    }



}

export default Product;