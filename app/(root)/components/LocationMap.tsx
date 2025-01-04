import React, { useEffect, useRef, useState } from 'react'
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { Store } from '@/app/types/store';
import { HeartIcon } from 'lucide-react';
import { getSession, useSession } from 'next-auth/react';
import axios from 'axios';
import toast from 'react-hot-toast';

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface LocationMapProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
};

const LocationMap: React.FC<LocationMapProps> = ({ setOpen }) => {
    const [mapSrc, setMapSrc] = useState("");
    const [isFavorite, setIsFavorite] = useState(false);

    const store = useSelector((state: RootState) => state.lottery.store);
    const selectedTags = useSelector((state: RootState) => state.lottery.selectedTags);

    const mapRef = useRef<HTMLIFrameElement>(null);

    const getGoogleMapContent = (store: Store) => {
        const src = store.src;
        const duration = 1500; // 拉霸效果執行多久
        setTimeout(() => {
            setMapSrc(src);
            checkIfStoreIsFavorite();
        }, duration);
    };

    const handleFavorite = async () => {
        const session = await fetchUpdatedSession();

        if (session?.user?.email && store?.title.length > 0) {
            if (isFavorite && session?.user?.favoriteStores) {
                const favoriteStore = session.user.favoriteStores.find(
                    (favoriteStore) => favoriteStore.title === store.title
                );

                const data = {
                    email: session?.user?.email,
                    storeId: favoriteStore?.id
                };

                axios.post('api/removeFavorite', data)
                    .then((res) => {
                        console.log("res", res);
                        toast.success("Removed from Favorites Successfully!");
                        checkIfStoreIsFavorite()
                    })
                    .catch((err) => {
                        console.log("err", err)
                        toast.error(err.response.data);
                    })
            } else {
                const data = {
                    email: session?.user?.email,
                    store: store
                };
                axios.post('api/addFavorite', data)
                    .then((res) => {
                        console.log("res", res);
                        toast.success("Added to Favorites Successfully!");
                        checkIfStoreIsFavorite()
                    })
                    .catch((err) => {
                        console.log("err", err)
                        toast.error(err.response.data);
                    })
            }
        } else {
            setOpen(true);
        }
    };

    const fetchUpdatedSession = async () => {
        const session = await getSession();

        return session;
    };

    const checkIfStoreIsFavorite = async () => {
        // 這邊需要最新的session資料比對

        const session = await fetchUpdatedSession();

        if (session?.user?.favoriteStores) {
            const isAlreadyFavorite = session.user.favoriteStores.find(
                (favoriteStore) => favoriteStore.title === store.title
            );

            if (isAlreadyFavorite) {
                setIsFavorite(true);
            } else {
                setIsFavorite(false)
            }
        }
    }

    useEffect(() => {
        getGoogleMapContent(store);
    }, [store]);

    useEffect(() => {
        setIsFavorite(false);
    }, [selectedTags])

    return (
        <div className="flex w-full h-full items-start">
            <div className="w-full h-[25vh] xs:h-[40vh] md:h-[47vh] bg-white text-dark-1 relative mr-1">
                <div className={clsx("w-full h-full absolute bg-dark-4", mapSrc && 'hidden')}>
                    <div className="w-full h-full flex justify-center items-center text-gray-1">Google map 顯示區</div>
                </div>
                <iframe
                    title="googleMap"
                    ref={mapRef}
                    loading="lazy"
                    className="transition-all duration-500 ease-in-out w-full h-full"
                    src={mapSrc}
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <HeartIcon onClick={handleFavorite} color={isFavorite ? 'red' : 'white'} size={24} />
                    </TooltipTrigger>
                    <TooltipContent>
                        {isFavorite ? <p>移除我的最愛</p> : <p>加入我的最愛</p>}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    )
}

export default LocationMap
