import { faCamera, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useEffect, useState } from "react";
import { useMediaQuery } from 'react-responsive';
import { useLocation, useNavigate } from "react-router";
import { get, postWithFile } from "../api/api";
import {BookingContext} from "../BookingFlow_components/Context"

const MENU_ITEMS = [
    { name: 'info', label: 'Thông tin cá nhân' },
    { name: 'history', label: 'Lịch sử đặt vé' },
    { name: 'myorder', label: 'Vé của tôi' },
    { name: 'notify', label: 'Thông báo' }
];

function MenuProfile() {
    const {user, setUser} = useContext (BookingContext);
    const [isUploading, setIsUploading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    
    // Enhanced responsive breakpoints
    const isSmallMobile = useMediaQuery({ maxWidth: 480 });
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });

    const styles = {
        menuItem: {
            fontSize: isSmallMobile ? "14px" : isMobile ? "16px" : "18px",
            color: "white",
            padding: isMobile ? "10px 0" : isTablet ? "5px 0" : "0",
            transition: "all 0.3s ease",
            textAlign: isMobile ? "center" : "left",
            margin: isMobile ? "0" : "0 15px 0 0",
            cursor: "pointer",
            whiteSpace: isTablet || isMobile ? "normal" : "nowrap",
            fontWeight: 500,
            letterSpacing: "0.2px",
        },
        avatarUploadButton: {
            position: "absolute",
            bottom: isSmallMobile ? "0" : isMobile ? "5px" : "10px",
            right: isSmallMobile ? "5px" : isMobile ? "10px" : "20px",
            background: "white",
            borderRadius: "50%",
            padding: isSmallMobile ? "6px" : isMobile ? "8px" : "10px",
            cursor: "pointer",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: 2,
        },
        profileContainer: {
            transform: `translateY(${isSmallMobile ? "-60px" : isMobile ? "-80px" : "-120px"})`,
            position: "relative", 
            padding: isSmallMobile ? "0 3%" : "0 5%",
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
        },
        userInfoContainer: {
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            gap: isSmallMobile ? "5px" : isMobile ? "10px" : "20px",
            width: "100%",
            justifyContent: isMobile ? "center" : "flex-start",
        },
        userName: {
            fontSize: isSmallMobile ? "20px" : isMobile ? "24px" : "30px",
            marginTop: isMobile ? "10px" : "0",
            textAlign: isMobile ? "center" : "left",
            width: isMobile ? "100%" : "auto",
            overflowWrap: "break-word",
            wordWrap: "break-word",
            maxWidth: "100%",
            lineHeight: 1.2,
            textShadow: "0px 1px 2px rgba(0,0,0,0.3)",
            fontWeight: 600,
        },
        avatarSize: {
            width: isSmallMobile ? "120px" : isMobile ? "150px" : "200px",
            height: isSmallMobile ? "120px" : isMobile ? "150px" : "200px",
        },
        menuContainer: {
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "center" : "normal",
            justifyContent: isMobile ? "center" : "space-between",
            marginTop: isMobile ? "15px" : "0",
            width: "100%",
            flexWrap: isTablet ? "wrap" : "nowrap",
            gap: isTablet ? "10px" : "0",
        },
        backgroundImage: {
            height: isSmallMobile ? "25dvh" : isMobile ? "30dvh" : "40dvh",
            objectFit: "cover",
            width: "100%",
        }
    };

    const fetchProfile = useCallback(async () => {
        try {
            const profileData = await get("/account/profile");
            setUser({
                name: profileData.name || "User",
                avatar: profileData.avatar || "https://via.placeholder.com/200",
            });
        } catch (error) {
            console.error("Lỗi khi lấy thông tin hồ sơ:", error);
        }
    }, []);

    const handleMenuClick = useCallback((name) => {
        navigate(`/profile/${name}`);
    }, [navigate]);

    const handleAvatarUpload = async (file) => {
        if (!file || isUploading) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append("avatar", file);

        try {
            const response = await postWithFile("/account/update-avatar", formData);
            setUser(prev => ({ ...prev, avatar: response.avatar }));
        } catch (error) {
            console.error("Lỗi khi cập nhật avatar:", error);
            alert("Cập nhật avatar thất bại!");
        } finally {
            setIsUploading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
        const currentPath = location.pathname.split("/")[2];
        document.querySelector(`.menu_profile[data-name='${currentPath}']`)?.classList.add("menu_profile_active");
        
        return () => {
            // Cleanup if needed
        };
    }, [fetchProfile, location.pathname]);

    return (
        <section>
            <div className="w-100" style={{ height: styles.backgroundImage.height }}>
                <img
                    className="w-100 h-100"
                    style={styles.backgroundImage}
                    src="https://images.lomediehus.se/app/uploads/sites/7/2024/01/25094554/salongsbild1.jpg?auto=format&crop=faces&facepad=10&fit=crop&q=50&w=1600"
                    alt="Background"
                />
            </div>
            <div className="flex f-col" style={styles.profileContainer}>
                <div className="flex cenhor gap20" style={styles.userInfoContainer}>
                    <div style={{ position: 'relative' }}>
                        <img
                            style={{ 
                                objectFit: "cover", 
                                borderRadius: "50%",
                                opacity: isUploading ? 0.7 : 1,
                                transition: 'opacity 0.3s',
                                ...styles.avatarSize
                            }}
                            src={user.avatar}
                            alt="User Avatar"
                        />
                        <label 
                            htmlFor="upload-avatar" 
                            style={{
                                ...styles.avatarUploadButton,
                                cursor: isUploading ? 'not-allowed' : 'pointer'
                            }}
                        >
                            <FontAwesomeIcon 
                                icon={isUploading ? faSpinner : faCamera} 
                                style={{ 
                                    fontSize: isSmallMobile ? "12px" : isMobile ? "14px" : "18px",
                                    animation: isUploading ? 'spin 1s linear infinite' : 'none'
                                }} 
                            />
                        </label>
                        <input
                            type="file"
                            id="upload-avatar"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={(e) => handleAvatarUpload(e.target.files[0])}
                            disabled={isUploading}
                        />
                        {isUploading && (
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                color: '#fff',
                                backgroundColor: 'rgba(0,0,0,0.7)',
                                padding: isSmallMobile ? '5px 8px' : '10px 12px',
                                borderRadius: '5px',
                                fontSize: isSmallMobile ? '12px' : '14px',
                                fontWeight: '500',
                                letterSpacing: '0.5px',
                            }}>
                                Đang tải ảnh...
                            </div>
                        )}
                    </div>

                    <h1 className="p-0 product-name mb-5 m-0" style={styles.userName}>
                        {user.name}
                    </h1>
                </div>

                <div className="w-100 flex f-col cenhor" 
                    style={{ 
                        padding: isSmallMobile ? "8% 2%" : isMobile ? "5% 2%" : "3% 2%",
                        marginTop: isSmallMobile ? "5px" : "10px"
                    }}
                >
                    <div className={`flex w-100 mb-10`} style={styles.menuContainer}>
                        {MENU_ITEMS.map(item => (
                            <p
                                key={item.name}
                                data-name={item.name}
                                className="menu_profile"
                                style={styles.menuItem}
                                onClick={() => handleMenuClick(item.name)}
                            >
                                {item.label}
                            </p>
                        ))}
                    </div>
                    <div className="line w-100 mt-10" style={{ 
                        height: "2px", 
                        backgroundColor: "white",
                        alignContent: "center",
                        margin: isMobile ? "5px 0 0" : "10px 0 0"
                    }}></div>
                </div>
            </div>

            {/* Global responsive styles */}
            <style jsx>{`
                @media (max-width: 480px) {
                    .menu_profile {
                        margin-bottom: 5px;
                        font-size: 0.9rem;
                    }
                }
                
                @media (max-width: 767px) {
                    .menu_profile_active {
                        font-weight: 700;
                        background-color: rgba(255, 255, 255, 0.1);
                        border-radius: 5px;
                        padding: 5px 10px;
                        margin: 5px 0;
                    }
                    .menu_profile {
                        letter-spacing: 0.3px;
                        text-shadow: 0px 1px 1px rgba(0,0,0,0.2);
                    }
                }
                
                @media (min-width: 768px) {
                    .menu_profile:hover {
                        opacity: 0.8;
                        transform: translateY(-1px);
                    }
                    
                    .menu_profile_active {
                        font-weight: 700;
                        background-color: rgba(255, 255, 255, 0.1);
                        border-radius: 5px;
                        padding: 5px 10px;
                        margin: 5px 0;
                    }
                }
                
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </section>
    );
}

export default MenuProfile;
