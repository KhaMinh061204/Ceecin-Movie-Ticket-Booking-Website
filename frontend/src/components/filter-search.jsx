import { useEffect, useState,useContext } from "react";        
import search from "../assets/icon/search.png";
import { getMoviesInHomepage, getAllTheater, getShowtimesByTheaterAndMovie } from '../api/api';
import { BookingContext } from "../BookingFlow_components/Context";
import { useNavigate } from "react-router-dom";
import $ from 'jquery'
import React from 'react'; 
  
function FilterSearch(prop) {
    const navigate = useNavigate();
    const { setMovie_id, setSelectedDate,setSelectedTime, setSelectedTheater,selectedRoomId,setSelectedRoomId, setSelectedShowtimeId} = useContext(BookingContext);
    const [selected1, setSelected1] = useState(""); // Trạng thái của dropdown 1
    const [selected2, setSelected2] = useState(""); // Trạng thái của dropdown 2
    const [selected3, setSelected3] = useState(""); // Trạng thái của dropdown 3 (lưu trữ ngày dưới dạng Date object UTC)
    const [selected4, setSelected4] = useState(""); // Trạng thái của dropdown 4

    const [movies, setMovies] = useState([]); 
    const [theaters, setTheaters] = useState([]); 
    const days = [
        { day: "Thứ 2", date: "2024-12-13" },
        { day: "Thứ 3", date: "2024-12-14" },
        { day: "Thứ 4", date: "2024-12-15" },
        { day: "Thứ 5", date: "2024-12-16" },
        { day: "Thứ 6", date: "2024-12-17" },
        { day: "Thứ 7", date: "2024-12-18" },
        { day: "Chủ Nhật", date: "2024-12-19" },
    ];
    const [times, setTimes] = useState([]); 
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        // Trả về chỉ ngày/tháng (dùng toLocaleDateString để định dạng)
        return date
        .toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" })
        .replace(/-/g, "/"); // Thay đổi mọi dấu '-' thành '/'
      };

      const formatTime = (dateString) => {
        const hours = dateString.substring(11, 13); // Lấy giờ từ vị trí thứ 11 đến 13
        const minutes = dateString.substring(14, 16); // Lấy phút từ vị trí thứ 14 đến 16
        return `${hours}:${minutes}`;
    };
    const handleBooking = () => {
        const isAuthenticated = !!localStorage.getItem("token"); // Example: Check token in localStorage

        if (!isAuthenticated) {
            $('#authpopup').removeClass('hide'); // Show the login popup if not authenticated
            return;
        }
        if (selected1 && selected2 && selected3 && selected4) {
            setMovie_id(selected1);
            setSelectedTheater(selected2.name);
            setSelectedDate(selected3);
            setSelectedTime(selected4.time); 
            setSelectedShowtimeId(selected4.showtimeId); 
            setSelectedRoomId(selected4.screening_room_id);

            navigate(`/selectseats/${selected4.screening_room_id}`)
        } else {
            console.error("Vui lòng chọn đủ thông tin trước khi đặt vé!");
        }
    };

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const data = await getMoviesInHomepage();
                setMovies(data);
            } catch (err) {
                console.error("Error fetching movies:", err);
            }
        };

        fetchMovies();
    }, []);

    useEffect(() => {
        if (selected1) {
            const fetchTheaters = async () => {
                try {
                    const data = await getAllTheater();
                    setTheaters(data); // Cập nhật dữ liệu rạp
                } catch (error) {
                    console.error("Lỗi khi lấy danh sách rạp:", error);
                }
            }
            fetchTheaters();
        }
    }, [selected1]);

    useEffect(() => {
        if (selected3 && selected1 && selected2) {
            const fetchTimes = async () => {
                try {
                    // Ensure selected3 is a valid Date object
                    const dateString = selected3.date ? new Date(selected3.date).toISOString() : null;
                    
                    const showtimesData = await getShowtimesByTheaterAndMovie({
                        theaterId: selected2._id,
                        movieId: selected1,
                        date: dateString,
                    });
                    if (showtimesData) {
                        setTimes(showtimesData.map(showtime => ({
                            time: formatTime(showtime.date),
                            showtimeId: showtime._id, // Add showtimeId to each time object
                            screening_room_id: showtime.screening_room_id._id,

                        })).sort((a, b) => a.time.localeCompare(b.time))); // Sort times by time property
                    }
                } catch (error) {
                    console.error("Lỗi khi lấy danh sách suất:", error);
                }
            };

            fetchTimes();
        } else {
            setTimes([]); // Reset times if date or selection changes
        }
    }, [selected3, selected1, selected2]);

    return (
        <section className="center_ul" id="filter-search">
            <div className="select_option">
                <div className="wrap_search_at_filter" style={{ display: "none" }}>
                    <div className="center_ul" id="search_center">
                        <input
                            className="inp_search input_data"
                            data-name="searchKey"
                            type="text"
                            id="search_post_filter"
                        />
                        <button className="search_btn" id="search_post_btn">
                            <img className="icon" src={search} alt="" />
                        </button>
                    </div>
                </div>
                <div>
                    <h3 className="text_upper" style={{ color: "white" }}>
                        Đặt vé nhanh
                    </h3>
                </div>

                {/* Label for Dropdown 1 */}
                <select
                    id="dropdown1"
                    className="input_data text_upper"
                    data-name="id01"
                    value={selected1}
                    onChange={(e) => setSelected1(e.target.value)}
                >
                    <option value="" disabled>
                        1. Chọn phim
                    </option>
                    {movies.map((movie) => (
                        <option key={movie._id} value={movie._id}>
                            {movie.title}
                        </option>
                    ))}
                </select>

                {/* Label for Dropdown 2 */}
                <select
                    id="dropdown2"
                    className="input_data text_upper"
                    data-name="id02"
                    value={selected2?._id || ""} // Show the selected date
                    onChange={(e) => {
                        const selectedOption = theaters.find(theater => theater._id === e.target.value);
                        setSelected2(selectedOption); // Set both day and date
                    }}
                    disabled={!selected1}
                >
                    <option value="" disabled>
                        2. Chọn rạp
                    </option>
                    {theaters.map((theater) => (
                        <option key={theater._id} value={theater._id}>
                            {theater.name}
                        </option>
                    ))}
                </select>

                {/* Label for Dropdown 3 */}
                <select
                    id="dropdown3"
                    className="input_data text_upper"
                    data-name="id03"
                    value={selected3?.date || ""} // Show the selected date
                    onChange={(e) => {
                        const selectedOption = days.find(day => day.date === e.target.value);
                        setSelected3(selectedOption); // Set both day and date
                    }}
                    disabled={!selected2}
                >
                    <option value="" disabled>
                        3. Chọn ngày
                    </option>
                    {days.map((day, index) => (
                        <option key={index} value={day.date}>
                            {formatDate(day.date)}
                        </option>
                    ))}
                </select>

                {/* Label for Dropdown 4 */}
                <select
                    id="dropdown4"
                    className="input_data text_upper"
                    data-name="id04"
                    value={selected4?.showtimeId || ""}
                    onChange={(e) => {
                        const selectedTime = times.find(time => time.showtimeId === e.target.value);
                        setSelected4(selectedTime); // Set the selected time object
                    }}
                    disabled={!selected3}
                >
                    <option value="" disabled>
                        4. Chọn suất
                    </option>
                    {times.map((time, index) => (
                        <option key={index} value={time.showtimeId}>
                            {time.time}
                        </option>
                    ))}
                </select>

                {/* Button */}
                <button
                    className="btn-save-filter btn_cus"
                    disabled={!selected4}
                    onClick={handleBooking}
                >
                    <p style={{ color: "red" }} className="text_upper">
                        Đặt ngay
                    </p>
                </button>
            </div>
        </section>
    );
}

export default FilterSearch;
