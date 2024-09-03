import React, { useEffect, useRef } from 'react'
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

const LocationMap = () => {
    const store = useSelector((state: RootState) => state.lottery.store);
    const mapSrc = store.src;
    const mapRef = useRef<HTMLIFrameElement>(null);

    const getGoogleMapContent = (src: string) => {
        const duration = 1500; // 拉霸效果執行多久
        setTimeout(() => {
            if (mapRef.current) {
                mapRef.current.src = src;
            }
        }, duration);
    };

    useEffect(() => {
        getGoogleMapContent(mapSrc);
    }, [store]);

    return (
        <div className="w-full h-[25vh] xs:h-[40vh] md:h-[50vh] bg-white text-dark-1 relative">
            <div className={clsx("w-full h-full absolute bg-dark-4", mapSrc && 'hidden')}>
                <div className="w-full h-full flex justify-center items-center text-gray-1">Google map 顯示區</div>
            </div>
            <iframe
                title="googleMap"
                ref={mapRef} 
                loading="lazy"
                className="transition-all duration-500 ease-in-out w-full h-full"
                src=""
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade">
            </iframe>
        </div>
    )
}

export default LocationMap
