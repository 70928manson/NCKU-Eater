"use client";

import { updateStore } from "@/redux/slices/lotterySlices";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { Trash2Icon } from 'lucide-react';
import { getSession } from "next-auth/react";
import { Store } from "../../types/store";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import toast from "react-hot-toast";

export default function Favorite() {
    const [favoriteStores, setFavoriteStores] = useState<Store[]>([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const dispatch = useDispatch();

    const getFavoriteStores = async () => {
        const session = await fetchUpdatedSession();
        if (session?.user?.favoriteStores) {
            setFavoriteStores(session?.user?.favoriteStores)
        };
        setIsDataLoaded(true);
    };

    // 找到所有 tags 中最長的標籤
    const getMaxTagLength = (tags: string[]) => {
        return Math.max(...tags.map(tag => tag.length));
    };

    const fetchUpdatedSession = async () => {
        const session = await getSession();

        return session;
    };

    const handleDelete = async (store: Store) => {
        const session = await fetchUpdatedSession();

        if (session?.user?.email && store?.title.length > 0) {
            if (session?.user?.favoriteStores) {
                const favoriteStore = session.user.favoriteStores.find(
                    (favoriteStore) => favoriteStore.id === store.id
                );

                const data = {
                    email: session?.user?.email,
                    storeId: favoriteStore?.id
                };

                axios.post('api/removeFavorite', data)
                    .then((res) => {
                        console.log("res", res);
                        getFavoriteStores();
                    })
                    .catch((err) => {
                        console.log("err", err)
                        toast.error(err.response.data);
                    })
            };
        };
    };

    useEffect(() => {
        dispatch(updateStore({
            id: '',
            title: '',
            src: '',
            tags: []
        }));
    }, [dispatch]);

    useEffect(() => {
        getFavoriteStores();
    }, []);

    return (
        <div className="flex flex-col items-center w-full">
            <h2 className="text-2xl md:text-3xl head-text tracking-widest mb-6">
                My Favorite
            </h2>
            {
                !isDataLoaded &&
                <p className="text-lg text-gray-400">資料載入中</p>
            }
            {
                isDataLoaded && favoriteStores.length === 0 ? (
                    <p className="text-lg text-gray-400">你還沒有最愛的店家，快去添加吧！</p>
                ) : (
                    <div className="flex flex-wrap gap-6 w-[80%]">
                        {favoriteStores.map((store) => {
                            const maxTagLength = getMaxTagLength(store.tags); // 取得該店家 tags 最長的長度

                            return (
                                <div key={store.id} className="bg-[#3f3f3f] text-white p-4 rounded-md shadow-md hover:shadow-lg transition-shadow font-sans">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-xl font-semibold truncate mr-1" title={store.title}>
                                            {/* <a href={store.src}> */}
                                            {store.title}
                                            {/* </a> */}
                                        </h3>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                {/* <Trash2Icon size={24} className="cursor-pointer hover:text-red-500 transition-colors" /> */}
                                                <button className="p-2 bg-dark-1 rounded-full hover:bg-dark-4 transition-colors">
                                                    <Trash2Icon size={24} className="text-white" />
                                                </button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent className="font-sans">
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>是否確認刪除 ?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        <span className="font-bold">{store.title}</span>即將從我的最愛移除,
                                                    </AlertDialogDescription>
                                                    <AlertDialogDescription>
                                                        刪了就無法復原哦 OAO
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>取消</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => handleDelete(store)}>
                                                        <Trash2Icon size={18} className="mr-1" />刪除
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                    {/* Tag 列表，使用標籤樣式，並根據最長的標籤設定寬度 */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {store.tags.length > 0 && store.tags[0] !== "" && store.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="bg-gray-300 text-gray-700 px-2 py-1 rounded-full text-sm inline-flex justify-center"
                                                style={{ minWidth: `${maxTagLength}ch` }} // 依據最長的標籤寬度設置
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    {/* <img src={store.src} alt={store.title} className="rounded-md" /> */}
                                </div>
                            )
                        })}
                    </div>
                )}
        </div>
    );
}
