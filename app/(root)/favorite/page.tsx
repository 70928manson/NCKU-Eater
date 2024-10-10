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
                                <div key={store.id} className="bg-[#3f3f3f] text-white p-4 rounded-md shadow-md hover:shadow-lg transition-shadow font-sans w-full">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-xl font-semibold truncate mr-1" title={store.title}>
                                            {store.title}
                                        </h3>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <button className="p-2 bg-dark-1 rounded-full hover:bg-dark-4 transition-colors">
                                                    <Trash2Icon size={24} className="text-white" />
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
                                    <TagList tags={store.tags} maxTagLength={maxTagLength} />
                                </div>
                            )
                        })}
                    </div>
                )
            }
        </div>
    );
}
