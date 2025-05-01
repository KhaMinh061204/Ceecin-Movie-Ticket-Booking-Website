import { useNavigate } from "react-router-dom";
import { post } from "../api/api";
import React from 'react'; 

function DropDownMenu() {
    const navigate = useNavigate();

    // const logout = () => {
    //     alert("Đăng xuất thành công")
    //     localStorage.removeItem('token');
    //     sessionStorage.removeItem('token');
    //     sessionStorage.removeItem('expires');

    //     navigate("/")
    // }
    const logout = async () => {
        try {
            // Gọi API logout
            await post("/account/logout", {});

            // Xóa token khỏi localStorage và sessionStorage
            localStorage.removeItem("token");
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("expires");

            // alert("Đăng xuất thành công")
            // Chuyển hướng về trang chủ
            navigate("/");
        } catch (error) {
            console.error("Error during logout:", error);
            alert("Đăng xuất thất bại. Vui lòng thử lại.");
        }
    };
    return (
        <div className="hide" style={{ position: "absolute", backgroundColor: "black", borderRadius: "5px", right: "1%", width: "200px" }}>
            <ul>
                {/* Chuyển hướng tới trang profile/info */}
                <li className="flex cenhor startver gap10 hover_li" onClick={() => navigate("/profile/info")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p style={{ color: "white" }}>Thông tin cá nhân</p>
                </li>

                {/* Đăng xuất */}
                <li className="flex cenhor startver gap10 hover_li" onClick={logout}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M16 16.9998L21 11.9998M21 11.9998L16 6.99982M21 11.9998H9M12 16.9998C12 17.2954 12 17.4432 11.989 17.5712C11.8748 18.9018 10.8949 19.9967 9.58503 20.2571C9.45903 20.2821 9.31202 20.2985 9.01835 20.3311L7.99694 20.4446C6.46248 20.6151 5.69521 20.7003 5.08566 20.5053C4.27293 20.2452 3.60942 19.6513 3.26118 18.8723C3 18.288 3 17.5161 3 15.9721V8.02751C3 6.48358 3 5.71162 3.26118 5.12734C3.60942 4.3483 4.27293 3.75442 5.08566 3.49435C5.69521 3.29929 6.46246 3.38454 7.99694 3.55503L9.01835 3.66852C9.31212 3.70117 9.45901 3.71749 9.58503 3.74254C10.8949 4.00297 11.8748 5.09786 11.989 6.42843C12 6.55645 12 6.70424 12 6.99982" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p style={{ color: "white" }}>Đăng xuất</p>
                </li>
            </ul>
        </div>
    );
}

export default DropDownMenu;