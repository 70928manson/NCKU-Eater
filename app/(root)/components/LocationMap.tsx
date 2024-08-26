import React from 'react'

const LocationMap = () => {
    // const { mapSrc, vageMapSrc } = useSelector((state) => state.draw);

    // const getGoogleMapContent = (src) => {
    //     const duration = 1500; // 拉霸效果執行多久
    //     setTimeout(() => {
    //         mapRef.current.src = src;
    //     }, duration);
    // }

    // useEffect(() => {
    //     if (!initText) {
    //         if (vageCheck) {
    //             getGoogleMapContent(vageMapSrc[0])
    //         } else if (!vageCheck) {
    //             getGoogleMapContent(mapSrc[0])
    //         }
    //     }
    // }, [mapSrc, vageMapSrc])

    return (
        <div className="w-full bg-white text-dark-1">
            Mappppp
            <iframe
                title="googleMap"
                // ref={mapRef} 
                loading="lazy"
                className="transition-all duration-500 ease-in-out"
                src=""
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade">
            </iframe>
        </div>
    )
}

export default LocationMap
