import React, { useEffect, useRef, useState } from 'react'
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { Store } from '@/app/types/store';

const LocationMap = () => {
    const [mapSrc, setMapSrc] = useState("");
    const store = useSelector((state: RootState) => state.lottery.store);
    const mapRef = useRef<HTMLIFrameElement>(null);

    const getGoogleMapContent = (store: Store) => {
        const src = store.src;
        const duration = 1500; // 拉霸效果執行多久
        setTimeout(() => {
            setMapSrc(src);
        }, duration);
    };

    useEffect(() => {
        getGoogleMapContent(store);
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
                className={clsx("transition-all duration-500 ease-in-out w-full h-full")}
                src={mapSrc}
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade">
            </iframe>
        </div>
    )
}

export default LocationMap
