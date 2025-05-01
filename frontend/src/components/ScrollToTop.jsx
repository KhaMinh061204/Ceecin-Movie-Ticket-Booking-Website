import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import React from 'react'; 
const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Cuộn lên đầu trang ngay lập tức khi pathname thay đổi
        window.scrollTo(0, 0);
    }, [pathname]); // Khi pathname thay đổi, thực thi

    return null;
};

export default ScrollToTop;
