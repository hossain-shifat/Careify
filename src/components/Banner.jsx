'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import banner1 from '@/assets/banner1.jpg';
import banner2 from '@/assets/banner2.jpg';
import banner3 from '@/assets/banner3.jpg';
import banner4 from '@/assets/banner4.jpg';

const Banner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState(0);
    const [currentTranslate, setCurrentTranslate] = useState(0);
    const [prevTranslate, setPrevTranslate] = useState(0);
    const sliderRef = useRef(null);

    const banners = [banner1, banner2, banner3, banner4];

    useEffect(() => {
        const timer = setInterval(() => {
            if (!isDragging) {
                setCurrentSlide((prev) => (prev + 1) % banners.length);
            }
        }, 2000);

        return () => clearInterval(timer);
    }, [banners.length, isDragging]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const handleStart = (clientX) => {
        setIsDragging(true);
        setStartPos(clientX);
        if (sliderRef.current) {
            sliderRef.current.style.cursor = 'grabbing';
        }
    };

    const handleMove = (clientX) => {
        if (!isDragging) return;
        const currentPosition = clientX;
        const diff = currentPosition - startPos;
        setCurrentTranslate(prevTranslate + diff);
    };

    const handleEnd = () => {
        setIsDragging(false);
        if (sliderRef.current) {
            sliderRef.current.style.cursor = 'grab';
        }

        const movedBy = currentTranslate - prevTranslate;

        if (movedBy < -50) {
            setCurrentSlide((prev) => (prev + 1) % banners.length);
        } else if (movedBy > 50) {
            setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
        }

        setCurrentTranslate(0);
        setPrevTranslate(0);
    };

    const handleMouseDown = (e) => {
        e.preventDefault();
        handleStart(e.clientX);
    };

    const handleMouseMove = (e) => {
        handleMove(e.clientX);
    };

    const handleMouseUp = () => {
        handleEnd();
    };

    const handleMouseLeave = () => {
        if (isDragging) {
            handleEnd();
        }
    };

    const handleTouchStart = (e) => {
        handleStart(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
        handleMove(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
        handleEnd();
    };

    return (
        <div className="relative max-w-[90vw] mx-auto h-[20vh] md:h-[70vh] lg:h-[70vh] overflow-hidden cursor-grab select-none rounded-2xl">
            <div ref={sliderRef}  onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseLeave} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} >
                {banners.map((banner, index) => (
                    <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`} style={{ pointerEvents: index === currentSlide ? 'auto' : 'none' }} >
                        <Image src={banner} alt={`Banner ${index + 1}`} fill className="w-full h-full object-cover object-center" priority={index === 0} sizes="100vw" quality={90} draggable={false} />
                    </div>
                ))}
                <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 md:gap-3 z-10">
                    {banners.map((_, index) => (
                        <button key={index} onClick={() => goToSlide(index)} className={`h-2 sm:h-2.5 md:h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white w-6 sm:w-8 md:w-10' : 'bg-white/50 hover:bg-white/75 w-2 sm:w-2.5 md:w-3'}`} aria-label={`Go to slide ${index + 1}`} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Banner;
