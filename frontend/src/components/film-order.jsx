import React from 'react'; 
function FilmOrder({showtime, seats}) {
    if (!showtime || !showtime.movie_id || !showtime.screening_room_id || !showtime.screening_room_id.theater_id) {
        return null;
    }
   
    const dateTime = new Date(showtime.date);
    const formattedTime = `${dateTime.getUTCHours()}h${dateTime.getUTCMinutes().toString().padStart(2, "0")}' - ${dateTime.getUTCDate()}/${dateTime.getUTCMonth() + 1}/${dateTime.getUTCFullYear()}`;
    const seatNames = seats.map(seat => `${seat.row}${seat.number}`).join(", ");
    
    return(
        <div className="film-order-container flex w-100 gap10 mt-30" style={{
            border: "1px solid white",
            borderRadius: "5px",
            fontSize: "14px",
            color: "white",
            backgroundColor: "#ffffff3d", 
            padding: "clamp(0.5rem, 2vw, 1rem)",
            flexDirection: "row",
            flexWrap: "wrap"
        }}>
            <div className="poster-container" style={{
                flex: "0 1 200px",
                minWidth: "150px",
                margin: "0 auto"
            }}>
                <img className="movie-poster" 
                    style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "10px",
                        objectFit: "cover"
                    }} 
                    src={showtime.movie_id.poster_url} 
                    alt={showtime.movie_id.title}
                />
            </div>
            <div className="order-details" style={{
                flex: "1 1 300px",
                backgroundColor: "#00000099",
                padding: "clamp(0.5rem, 3%, 15px)",
                borderRadius: "10px"
            }}>
                <div className="flex spa-bet-ver cenhor title-container" style={{
                    flexWrap: "wrap",
                    gap: "0.5rem"
                }}>
                    <h1 className="product-name" style={{
                        fontSize: "clamp(1.5rem, 5vw, 2.5rem)"
                    }}>{showtime.movie_id.title}</h1> 
                    <p className="text-badge" style={{
                        backgroundColor: "#B28FFF",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "4px"
                    }}>{showtime.movie_id.limit_age}</p> 
                </div>
                <div className="flex f-col gap20" style={{padding: "5px"}}>
                    <div className="flex startver cenhor gap20" style={{
                        flexWrap: "wrap"
                    }}>
                        <div className="flex cenhor gap10">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 36 36" fill="none" style={{
                                minWidth: "24px"
                            }}>
                                <path d="M23.4963 22.3237C24.0202 22.4983 24.5865 22.2152 24.7612 21.6912C24.9358 21.1673 24.6527 20.601 24.1287 20.4263L23.4963 22.3237ZM18.75 19.6875H17.75C17.75 20.1179 18.0254 20.5001 18.4338 20.6362L18.75 19.6875ZM19.75 12.6313C19.75 12.079 19.3023 11.6313 18.75 11.6313C18.1977 11.6313 17.75 12.079 17.75 12.6313H19.75ZM24.1287 20.4263L19.0662 18.7388L18.4338 20.6362L23.4963 22.3237L24.1287 20.4263ZM19.75 19.6875V12.6313H17.75V19.6875H19.75ZM31.25 18C31.25 24.9036 25.6536 30.5 18.75 30.5V32.5C26.7581 32.5 33.25 26.0081 33.25 18H31.25ZM18.75 30.5C11.8464 30.5 6.25 24.9036 6.25 18H4.25C4.25 26.0081 10.7419 32.5 18.75 32.5V30.5ZM6.25 18C6.25 11.0964 11.8464 5.5 18.75 5.5V3.5C10.7419 3.5 4.25 9.99187 4.25 18H6.25ZM18.75 5.5C25.6536 5.5 31.25 11.0964 31.25 18H33.25C33.25 9.99187 26.7581 3.5 18.75 3.5V5.5Z" fill="white"/>
                            </svg>
                            <p style={{fontSize: "clamp(0.9rem, 2vw, 1rem)", color: "white"}}><b>{showtime.movie_id.duration} phút</b></p>
                        </div>
                        <div className="flex cenhor gap10">
                            <p style={{fontSize: "clamp(0.9rem, 2vw, 1rem)", color: "white"}}>2D Phụ đề</p>
                        </div>
                    </div>

                    <div className="flex cenhor gap10">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 33 33" fill="none" style={{
                            minWidth: "24px"
                        }}>
                            <path d="M16.5001 29.7C16.5001 29.7 26.8306 20.5174 26.8306 13.6304C26.8306 7.92508 22.2055 3.29999 16.5001 3.29999C10.7948 3.29999 6.16968 7.92508 6.16968 13.6304C6.16968 20.5174 16.5001 29.7 16.5001 29.7Z" stroke="white" strokeWidth="2"/>
                            <path d="M19.8005 13.2002C19.8005 15.0227 18.3231 16.5002 16.5005 16.5002C14.678 16.5002 13.2005 15.0227 13.2005 13.2002C13.2005 11.3777 14.678 9.9002 16.5005 9.9002C18.3231 9.9002 19.8005 11.3777 19.8005 13.2002Z" stroke="white" strokeWidth="2"/>
                        </svg>
                        <p style={{fontSize: "clamp(0.9rem, 2vw, 1rem)", color: "white"}}>{showtime.screening_room_id.theater_id.name}</p>
                    </div>

                    <div className="flex cenhor gap10">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 60 60" fill="none" style={{
                            minWidth: "24px"
                        }}>
                            <path d="M20 5V12.5M40 5V12.5M8.75 22.725H51.25M39.2368 34.25H39.2592M39.2368 41.75H39.2592M29.9887 34.25H30.0112M29.9887 41.75H30.0112M20.7358 34.25H20.7582M20.7358 41.75H20.7582M52.5 21.25V42.5C52.5 50 48.75 55 40 55H20C11.25 55 7.5 50 7.5 42.5V21.25C7.5 13.75 11.25 8.75 20 8.75H40C48.75 8.75 52.5 13.75 52.5 21.25Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <p style={{fontSize: "clamp(0.9rem, 2vw, 1rem)", color: "white"}}><b>{formattedTime}</b></p>
                    </div>

                    <div className="flex cenhor gap10">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 26 26" fill="none" style={{
                            minWidth: "24px"
                        }}>
                            <path d="M24.7932 11.3575H22.2264V7.15553C22.2264 3.43359 19.1179 0.405518 15.2971 0.405518H9.81003C5.98927 0.405518 2.88069 3.43359 2.88069 7.15553V11.3575H0.313924C0.140563 11.3575 0 11.4985 0 11.6727V25.2797C0 25.4535 0.140563 25.5944 0.313924 25.5944H3.78243C3.95579 25.5944 4.09635 25.4535 4.09635 25.2797V21.0036H21.0108V25.2797C21.0108 25.4535 21.1514 25.5944 21.3247 25.5944H24.7932C24.9666 25.5944 25.1071 25.4535 25.1071 25.2797V11.6727C25.1071 11.4985 24.9666 11.3575 24.7932 11.3575ZM21.5189 20.3736H3.5882C3.1073 20.3736 2.71585 19.9809 2.71585 19.4987V17.5645C2.71585 17.0814 3.1073 16.6887 3.5882 16.6887H21.5189C21.9998 16.6887 22.3913 17.0814 22.3913 17.5645V19.4987C22.3913 19.9809 21.9998 20.3736 21.5189 20.3736ZM3.50812 7.15553C3.50812 3.78074 6.33514 1.03507 9.81003 1.03507H15.2971C18.772 1.03507 21.599 3.78074 21.599 7.15553V11.3575H21.3247C21.1514 11.3575 21.0108 11.4985 21.0108 11.6727V16.0591H4.09635V11.6727C4.09635 11.4985 3.95579 11.3575 3.78243 11.3575H3.50812V7.15553ZM0.627849 24.9649V11.9875H3.4685V16.0711C2.69796 16.1337 2.088 16.7756 2.088 17.5645V19.4987C2.088 20.2875 2.69796 20.929 3.4685 20.9912V24.9649H0.627849ZM24.4793 24.9649H21.6386V20.9912C22.4092 20.929 23.0191 20.2875 23.0191 19.4987V17.5645C23.0191 16.7756 22.4092 16.1337 21.6386 16.0711V11.9875H24.4793V24.9649Z" fill="white"/>
                        </svg>
                        <p style={{
                            fontSize: "clamp(0.9rem, 2vw, 1rem)", 
                            color: "white",
                            wordBreak: "break-word"
                        }}>
                            {seats.length} ghế: {seatNames}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilmOrder;