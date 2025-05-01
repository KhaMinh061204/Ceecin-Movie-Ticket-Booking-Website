import Cinema from "./cinema";
import React from 'react'; 

function OrderSchedule(){
    return(
        <section>
            <div className="flex w-100 f-col cenver mt-50" style={{"position":"relative","padding":"0 5%","gap":"10px", "transform":"translateY(-60px)"}}>
                <div className="flex cenhor gap10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 60 60" fill="none">
                        <path d="M20 5V12.5M40 5V12.5M8.75 22.725H51.25M39.2368 34.25H39.2592M39.2368 41.75H39.2592M29.9887 34.25H30.0112M29.9887 41.75H30.0112M20.7358 34.25H20.7582M20.7358 41.75H20.7582M52.5 21.25V42.5C52.5 50 48.75 55 40 55H20C11.25 55 7.5 50 7.5 42.5V21.25C7.5 13.75 11.25 8.75 20 8.75H40C48.75 8.75 52.5 13.75 52.5 21.25Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <h1 className="product-name" style={{"fontSize":"30px"}}>Lịch chiếu</h1>
                </div>
                <div className="line w-100" style={{"height":"1px", "backgroundColor":"white"}}></div>
                    <div className="flex cenhor spa-bet-ver gap20 w-100">
                        <div style={{"border":"1px solid white","borderRadius":"5px","fontSize":"14px","color":"white","backgroundColor":"#ffffff3d", "padding":"1%"}} className="flex cenhor cenver gap20">
                            <span className="text-center">
                                <p>Thứ 2</p>
                                <p>2/12</p>
                            </span>
                            <span className="text-center">
                                <p>Thứ 3</p>
                                <p>2/12</p>
                            </span>
                            <span className="text-center">
                                <p>Thứ 4</p>
                                <p>2/12</p>
                            </span>
                            <span className="text-center">
                                <p>Thứ 5</p>
                                <p>2/12</p>
                            </span>
                            <span className="text-center">
                                <p>Thứ 6</p>
                                <p>2/12</p>
                            </span>
                            <span className="text-center">
                                <p>Thứ 7</p>
                                <p>2/12</p>
                            </span>
                            <span className="text-center">
                                <p>Chủ Nhật</p>
                                <p>2/12</p>
                            </span>
                        </div>
                        <div className="flex gap20">
                            <div className="flex cenhor cenver">
                                <span className="text-badge flex gap10 cenhor cenver" style={{"padding":"2px 20px","backgroundColor":"#D9D9D9"}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="33" viewBox="0 0 22 33" fill="none">
                                    <g clipPath="url(#clip0_10_1738)">
                                    <path d="M2.00452 22.5387V20.5387H20.0045V22.5387H2.00452ZM2.00452 17.5387V15.5387H20.0045V17.5387H2.00452ZM2.00452 12.5387V10.5387H20.0045V12.5387H2.00452Z" fill="#49454F"/>
                                    </g> 
                                    <defs>
                                    <clipPath id="clip0_10_1738">
                                    <rect x="0.60199" y="0.448853" width="20.8051" height="32.1798" rx="10.4025" fill="white"/>
                                    </clipPath>
                                    </defs>
                                </svg>
                                    <p style={{"color":"black"}}>Toàn quốc</p>
                                </span>
                            </div>
                            <div className="flex cenhor cenver">
                                <span className="text-badge flex gap10 cenhor cenver" style={{"padding":"2px 20px","backgroundColor":"#D9D9D9"}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="33" viewBox="0 0 22 33" fill="none">
                                    <g clipPath="url(#clip0_10_1738)">
                                    <path d="M2.00452 22.5387V20.5387H20.0045V22.5387H2.00452ZM2.00452 17.5387V15.5387H20.0045V17.5387H2.00452ZM2.00452 12.5387V10.5387H20.0045V12.5387H2.00452Z" fill="#49454F"/>
                                    </g>
                                    <defs>
                                    <clipPath id="clip0_10_1738">
                                    <rect x="0.60199" y="0.448853" width="20.8051" height="32.1798" rx="10.4025" fill="white"/>
                                    </clipPath>
                                    </defs>
                                </svg>
                                    <p style={{"color":"black"}}>Tất cả các loại rạp</p>
                                </span>
                            </div>
                        </div>
                        
                        
                    </div>
                    <div className="flex f-col mt-10 gap20">
                    <Cinema/>
                    <Cinema/>
                    <Cinema/>
                    <Cinema/>
                </div>
                </div>
                
        </section>
    )
}

export default OrderSchedule;