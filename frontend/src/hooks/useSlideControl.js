import { useState, useCallback } from 'react';
import React from 'react'; 

// Constants for slide configuration
const SLIDE_COUNT = 3;  // Total number of slides
const POSITION_INCREMENT = 100;  // Percentage to move for each slide

/**
 * Custom hook to manage slide control functionality
 * @returns {Object} Object containing position, currentSlide and moveSlide function
 */
export const useSlideControl = () => {
    // Track the X translation percentage
    const [position, setPosition] = useState(0);
    // Track the current active slide index (0-2)
    const [currentSlide, setCurrentSlide] = useState(0);

    /**
     * Move slide in specified direction
     * @param {number} direction - 1 for right, -1 for left
     */
    const moveSlide = useCallback((direction) => {
        const newPosition = position + (direction * POSITION_INCREMENT);
        // Ensure position stays within bounds
        if (newPosition <= 0 && newPosition >= -(POSITION_INCREMENT * (SLIDE_COUNT - 1))) {
            setPosition(newPosition);
            
            // Update current slide index with wraparound
            let newSlide = currentSlide + direction;
            if (newSlide < 0) newSlide = SLIDE_COUNT - 1;
            if (newSlide >= SLIDE_COUNT) newSlide = 0;
            setCurrentSlide(newSlide);
        }
    }, [position, currentSlide]);

    return {
        position,
        currentSlide,
        moveSlide
    };
};
