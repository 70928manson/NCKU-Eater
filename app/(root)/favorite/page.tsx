"use client";

import { updateStore } from "@/redux/slices/lotterySlices";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { Trash2Icon } from 'lucide-react';
import { getSession } from "next-auth/react";
import { Store } from "../../types/store";

import {
    AlertDialog,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import toast from "react-hot-toast";
import Modal from "@/components/modal/Modal";
import TagList from "@/components/tagList/tagList";

export default function Favorite() {
    const [favoriteStores, setFavoriteStores] = useState<Store[]>([{
        id: "1",
        title: "test",
        src: "test",
        tags: ["test"]
    }, {
        id: "2",
        title: "體育場樺哥土s121212999999999999",
        src: "test2",
        tags: ["test2"]
    },{
        id: "3",
        title: "test3",
        src: "test3",
        tags: ["test3"]
    }]);
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
                        toast.success("Delete Success!");
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
        <div className="flex flex-col items-center w-full pb-4 pt-20">
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-[80%] mx-auto">
                        {favoriteStores.map((store) => {
                            const maxTagLength = getMaxTagLength(store.tags); // 取得該店家 tags 最長的長度

                            return (
                                <div key={store.id} className="group relative bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700 text-white p-6 rounded-xl shadow-xl hover:shadow-2xl hover:shadow-white/5 transition-all duration-300 ease-out hover:scale-[1.02] hover:border-neutral-600 font-sans w-full overflow-hidden">
                                    {/* 頂部細線裝飾 */}
                                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                                    <div className="relative">
                                        <div className="flex justify-between items-center mb-4">
                                            <div className="flex-1 mr-3 min-w-0">
                                                <h3 className="text-xl font-bold text-white group-hover:text-gray-100 transition-colors duration-200 leading-tight truncate" title={store.title}>
                                                    {store.title}
                                                </h3>
                                            </div>
                                            
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <button className="relative p-2.5 bg-neutral-700/80 hover:bg-red-500/20 border border-neutral-600/50 hover:border-red-400/30 rounded-lg transition-all duration-200 group/button backdrop-blur-sm">
                                                        <Trash2Icon 
                                                            size={20} 
                                                            className="text-neutral-400 group-hover/button:text-red-400 transition-colors duration-200" 
                                                        />
                                                    </button>
                                                </AlertDialogTrigger>
                                                <Modal
                                                    title="是否確認刪除"
                                                    content={[
                                                        <><span className="font-bold text-[#f0bbbb]">{store.title} </span>即將從我的最愛移除</>,
                                                        `刪了就無法復原哦 OAO`
                                                    ]}
                                                    icon={<Trash2Icon size={18} className="mr-1" />}
                                                    handleOk={() => handleDelete(store)}
                                                    handleCancel={() => { }}
                                                    modalType="Delete"
                                                />
                                            </AlertDialog>
                                        </div>
                                        
                                        {/* 分隔線 */}
                                        <div className="h-px bg-gradient-to-r from-transparent via-neutral-600 to-transparent mb-4 group-hover:via-neutral-500 transition-colors duration-300"></div>
                                        
                                        <TagList tags={store.tags} maxTagLength={maxTagLength} />
                                    </div>


                                </div>
                            )
                        })}
                    </div>
                )
            }
        </div>
    );
}
