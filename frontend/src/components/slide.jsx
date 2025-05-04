import { useRef, useState, useEffect } from "react";
import { slideData } from "../constants/slideData";
import React from 'react'; 
/**
 * Slide component for displaying video carousel
 */
function Slide() {
    // State for video playback control
    const [playing, setPlaying] = useState(true);
    // Track current slide index
    const [currentSlide, setCurrentSlide] = useState(0);
    // Track slide position for transform
    const [position, setPosition] = useState(0);
    // Create array of refs for each video
    const videoRefs = [useRef(null), useRef(null), useRef(null)];
    // State for mute control
    const [isMuted, setIsMuted] = useState(true);

    // Control all videos based on active slide
    useEffect(() => {
        videoRefs.forEach((ref, index) => {
            if (ref.current) {
                if (index === currentSlide) {
                    if (playing) {
                        ref.current.play();
                    } else {
                        ref.current.pause();
                    }
                } else {
                    ref.current.pause();
                }
            }
        });
    }, [currentSlide, playing]);

    /**
     * Handle slide movement
     * @param {number} direction - 1 for right, -1 for left
     */
    const moveSlide = (direction) => {
        const newPosition = position + (direction * 100);
        const maxPosition = -(slideData.length - 1) * 100;
        
        if (direction > 0 && position === 0) return; // Prevent moving right at first slide
        if (direction < 0 && position === maxPosition) return; // Prevent moving left at last slide

        setPosition(newPosition);
        
        // Update current slide index based on position
        const newSlideIndex = Math.abs(newPosition / 100);
        setCurrentSlide(newSlideIndex);
    };

    /**
     * Toggle video play/pause state
     */
    const togglePlay = () => {
        setPlaying(!playing);
    };

    /**
     * Toggle mute state
     */
    const toggleMute = () => {
        videoRefs.forEach(ref => {
            if (ref.current) {
                ref.current.muted = !isMuted;
            }
        });
        setIsMuted(!isMuted);
    };

    const VolumeIcon = isMuted ? (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
        </svg>
    ) : (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
        </svg>
    );

    return (
        <div className="slider-container">
            {/* Navigation buttons outside slider-wrapper */}
            <button className="slide-btn left" onClick={() => moveSlide(1)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" width="45" height="45" viewBox="0 0 24 24" stroke="#ffffff" transform="matrix(-1, 0, 0, 1, 0, 0)">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                    <g id="SVGRepo_iconCarrier">
                    <path d="M5.536 21.886a1.004 1.004 0 0 0 1.033-.064l13-9a1 1 0 0 0 0-1.644l-13-9A1 1 0 0 0 5 3v18a1 1 0 0 0 .536.886z"/>
                    </g>
                </svg>
            </button>
            <button className="slide-btn right" onClick={() => moveSlide(-1)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" width="45" height="45" viewBox="0 0 24 24" stroke="#ffffff" >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0" fill="rgb(187, 151, 93)"/>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" fill="#ffffff"/>
                    <g id="SVGRepo_iconCarrier" fill="#ffffff">
                    <path d="M5.536 21.886a1.004 1.004 0 0 0 1.033-.064l13-9a1 1 0 0 0 0-1.644l-13-9A1 1 0 0 0 5 3v18a1 1 0 0 0 .536.886z" fill="#ffffff"/>
                    </g>
                </svg>
            </button>

            <div className="slider-wrapper" style={{ transform: `translateX(${position}%)` }}>
                {slideData.map((slide, index) => (
                    <div key={slide.id} className="slide">
                        <div className="content-wrapper">
                            <div className="text-content">
                                <h1>{slide.title}</h1>
                                <p>{slide.description}</p>
                                <div className="buttons">
                                    <button className="btn-book">Đặt vé ngay</button>
                                    <button className="btn-more">Xem thêm</button>
                                </div>
                            </div>
                            
                            <div className="video-container">
                                <video
                                    ref={videoRefs[index]}
                                    className="video-player"
                                    autoPlay={index === 0}
                                    muted
                                    loop
                                    playsInline
                                >
                                    <source src={slide.videoUrl} type="video/mp4" />
                                </video>
                                <div className="video-overlay" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="controls-group">
                <button className="control-btn play-pause" onClick={togglePlay}>
                    {playing ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                        </svg>
                    ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                    )}
                    {playing ? 'Tạm dừng' : 'Phát'}
                </button>

                <button className="control-btn volume" onClick={toggleMute}>
                    {VolumeIcon}
                    {isMuted ? 'Bật âm' : 'Tắt âm'}
                </button>
            </div>

            {/* Updated indicators */}
            <div className="slide-indicators">
                {slideData.map((_, i) => (
                    <div
                        key={i}
                        className={`indicator ${i === Math.abs(position / 100) ? 'active' : ''}`}
                        onClick={() => {
                            setPosition(-i * 100);
                            setCurrentSlide(i);
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

export default Slide;