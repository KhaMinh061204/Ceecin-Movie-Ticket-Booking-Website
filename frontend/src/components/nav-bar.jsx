import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import $ from 'jquery';
import { Menu } from 'lucide-react';
import logo from '../assets/img/logo.png';
import DropDownMenu from '../components/drop-down-menu';
import SearchBar from './SearchBar';
import { get } from '../api/api';
import React from 'react'; 

function Navbar() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => { }, [location]);
    const locat = useLocation();
    const token = localStorage.getItem('token');
    const expires = sessionStorage.getItem('expires');
    const [user, setUser] = useState({ avatar: '' });

    const nav_config = () => {
        if (locat.pathname === "/") {
            $("#home").addClass("nav_link_active");
            return;
        }
        const path = locat.pathname.split("/")[1];
        $("#" + path).addClass("nav_link_active");
    };

    const handleSearch = searchTerm => {
        if (searchTerm) {
            navigate(`/search?title=${searchTerm}`);
        }
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                if (token && expires) {
                    const currentTime = Date.now();
                    if (currentTime < expires) {
                        const profileData = await get('/account/profile');
                        setUser({
                            avatar: profileData.avatar,
                        });
                        $('#login').addClass('hide');
                        $('#img_account_top').removeClass('hide');
                    } else {
                        localStorage.removeItem('token');
                        sessionStorage.removeItem('token');
                        sessionStorage.removeItem('expires');
                        $('#login').removeClass('hide');
                        $('#img_account_top').addClass('hide');
                    }
                } else {
                    $('#login').removeClass('hide');
                    $('#img_account_top').addClass('hide');
                }
            } catch (error) {
                console.error('Lỗi khi lấy thông tin hồ sơ:', error);
                $('#login').removeClass('hide');
                $('#img_account_top').addClass('hide');
            }
        };

        fetchProfile();
        nav_config();
    }, [token, expires, locat.pathname]);

    return (
        <header className="header">
            <div className="wrap_header_nav">
                <div className="wrap_right_nav">
                    <div onClick={() => {
                        navigate('/');
                        window.location.reload();
                    }}>
                        <img id="logo-trans" src={logo} width={150} alt="Logo" />
                    </div>
                </div>

                {/* Desktop Menu */}
                <div className="wrap_center_ul hidden md:block">
                    <ul className="center_ul" id="nav-center">
                        <li className="nav_link nav_header" id="home" onClick={() => navigate('/')}>
                            Trang chủ
                        </li>
                        <li className="nav_link nav_header" id="filmlist" onClick={() => navigate('/filmlist')}>
                            Phim
                        </li>
                        <li className="nav_link nav_header" id="cinemalist" onClick={() => navigate('/cinemalist')}>
                            Rạp chiếu
                        </li>
                        <li className="nav_link nav_header" id="promotion" onClick={() => navigate('/promotion')}>
                            Khuyến mãi
                        </li>
                    </ul>
                </div>

                <div className="wrap_auth_btn" id="auth_btn">
                    <div className="hidden md:block">
                        <SearchBar onSearch={handleSearch} />
                    </div>
                    <button
                        onClick={() => $('#authpopup').removeClass('hide')}
                        className="btn nav_header hidden md:block"
                        id="login"
                    >
                        <p>Đăng nhập</p>
                    </button>
                    <div
                        id="img_account_top"
                        className="wrap_img_account_top hide hidden md:block"
                        style={{ position: 'relative' }}
                    >
                        <img
                            src={user.avatar}
                            alt="User Avatar"
                            className="userimg-prod"
                            style={{ width: '35px', height: '35px', marginRight: '5px' }}
                        />
                        <DropDownMenu />
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="mobile-menu-button md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${isMenuOpen ? 'show' : ''}`}>
                <ul className="mobile-menu-items">
                    <li onClick={() => { navigate('/'); setIsMenuOpen(false); }}>
                        Trang chủ
                    </li>
                    <li onClick={() => { navigate('/filmlist'); setIsMenuOpen(false); }}>
                        Phim
                    </li>
                    <li onClick={() => { navigate('/cinemalist'); setIsMenuOpen(false); }}>
                        Rạp chiếu
                    </li>
                    <li onClick={() => { navigate('/promotion'); setIsMenuOpen(false); }}>
                        Khuyến mãi
                    </li>
                    {/* <li className="mobile-search">
                        <SearchBar onSearch={handleSearch} />
                    </li> */}
                    <li>
                        <button
                            onClick={() => {
                                $('#authpopup').removeClass('hide');
                                setIsMenuOpen(false);
                            }}
                            className="mobile-login-btn"
                        >
                            Đăng nhập
                        </button>
                    </li>
                </ul>
            </div>
        </header>
    );
}

export default Navbar;