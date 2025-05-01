import { useEffect, useState } from "react";
import { useMediaQuery } from 'react-responsive';
import { get, put } from "../api/api";
import React from 'react'; 

function ProfileForm() {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });

    const [profile, setProfile] = useState({
        name: "",
        dateOfBirth: "",
        phone: "",
        email: "",
        gender: "",
    });

    // Responsive styles
    const styles = {
        formSection: {
            transform: `translateY(${isMobile ? "-50px" : "-100px"})`,
            padding: isMobile ? "0 5%" : "0 7%"
        },
        formRow: {
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? "20px" : "20px",
            marginBottom: isMobile ? "15px" : "30px"
        },
        input: {
            padding: isMobile ? "10px" : "2%",
            border: "1px solid transparent",
            borderRadius: "7px",
        },
        buttonContainer: {
            marginTop: isMobile ? "30px" : "50px"
        }
    };

    // Fetch dữ liệu từ API khi component render
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const data = await get("/account/profile");

                const formattedDob =
                    data.dateOfBirth && !isNaN(new Date(data.dateOfBirth).getTime())
                        ? new Date(data.dateOfBirth).toISOString().split("T")[0]
                        : "";

                setProfile({
                    name: data.name || "",
                    dateOfBirth: formattedDob || "",
                    phone: data.phone || "",
                    email: data.email || "",
                    gender: data.gender || "",
                });

            } catch (error) {
                console.error("Lỗi khi fetch profile:", error);
            }
        };

        fetchProfileData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedProfile = {
                name: profile.name,
                phone: profile.phone,
                dateOfBirth: profile.dateOfBirth,
                email: profile.email,
                gender: profile.gender,
            };

            const response = await put("/account/update-profile", updatedProfile);
            alert(response.message || "Cập nhật thành công!"); // Hiển thị thông báo thành công
        } catch (error) {
            console.error("Lỗi khi cập nhật profile:", error);
            alert("Cập nhật thất bại!");
        }
    };

    // Hàm xử lý khi người dùng thay đổi thông tin
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <section style={styles.formSection}>
            <div className="flex cenhor cenver w-100" style={styles.formRow}>
                <div className="flex f-col w-100 gap10">
                    <label style={{ color: "white" }}>Họ và tên</label>
                    <input
                        style={styles.input}
                        placeholder="Họ tên"
                        className="w-100"
                        name="name"
                        value={profile.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex f-col w-100 gap10">
                    <label style={{ color: "white" }}>Ngày sinh</label>
                    <input
                        style={styles.input}
                        type="date"
                        className="w-100"
                        name="dateOfBirth"
                        value={profile.dateOfBirth}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="flex cenhor cenver w-100" style={styles.formRow}>
                <div className="flex f-col w-100 gap10">
                    <label style={{ color: "white" }}>Số điện thoại</label>
                    <input
                        style={styles.input}
                        placeholder="Số điện thoại"
                        className="w-100"
                        name="phone"
                        value={profile.phone}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex f-col w-100 gap10">
                    <label style={{ color: "white" }}>Email</label>
                    <input
                        style={styles.input}
                        placeholder="Email"
                        className="w-100"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="flex cenhor cenver w-100" style={styles.formRow}>
                <div className="flex f-col w-100 gap10">
                    <label style={{ color: "white" }}>Giới tính</label>
                    <div className={`flex w-100 ${isMobile ? "f-col" : ""} gap20`}>
                        <div className="flex gap10">
                            <input
                                type="radio"
                                name="gender"
                                value="Name"
                                checked={profile.gender === "Name"}
                                onChange={handleChange}
                            />
                            <label style={{ color: "white" }}>Nam</label>
                        </div>
                        <div className="flex gap10">
                            <input
                                type="radio"
                                name="gender"
                                value="Nữ"
                                checked={profile.gender === "Nữ"}
                                onChange={handleChange}
                            />
                            <label style={{ color: "white" }}>Nữ</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex cenhor cenver w-100 gap20" style={styles.buttonContainer}>
                <button 
                    onClick={handleSubmit} 
                    className="btn_cus" 
                    id="more_films"
                    style={{ width: isMobile ? "100%" : "auto" }}
                >
                    <p className="text_upper">Cập nhật</p>
                </button>
            </div>
        </section>
    );
}

export default ProfileForm;
