"use client";

import React, { useEffect, useMemo, useState } from 'react'
import FoodSelector from './FoodSelector'
import { getRandomNum } from '@/app/utils';
import { Store } from '@/app/types/store';
import { updateIsDrawing, updateStore } from '@/redux/slices/lotterySlices';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Loader2Icon } from 'lucide-react';

interface FoodLotteryProps {
    allStores: Store[];
    isLoading: boolean;
}

const FoodLottery: React.FC<FoodLotteryProps> = ({ allStores, isLoading }) => {
    const [statusText, setStatusText] = useState("今天吃什麼");

    const [stores, setStores] = useState(allStores);

    const visibleStores = stores.slice(0, 8); // 只渲染前 8 個 store

    const selectedTags = useSelector((state: RootState) => state.lottery.selectedTags);
    const isDrawing = useSelector((state: RootState) => state.lottery.isDrawing);

    const dispatch = useDispatch();

    const slotAnimationHandler = async () => {
        const list = document.querySelectorAll('#store-title > h5');
        Array.prototype.forEach.call(list, item => item.classList.add(`span`));
        const duration = 1500; // 拉霸效果執行多久
        setTimeout(() => {
            // 停止拉霸動畫
            Array.prototype.forEach.call(list, item => item.removeAttribute('class'));
            setStatusText("");
            dispatch(updateIsDrawing(false));
        }, duration);
    };

    const getDrawShops = () => {
        const tempStores = [...stores];
        const drawCount = tempStores.length >= 8 ? 8 : tempStores.length; // 抽取的數量, 實際滾動的 stores
    
        // 抽取 8 個隨機店家並與前 8 個位置互換
        for (let i = 0; i < drawCount; i++) {
            // 隨機選取一個店家，範圍是從 i 到 stores 長度之間
            
            const randomIndex = getRandomNum(i, tempStores.length);
    
            // 儲存原來的 tempStores[i] 位置上的店家
            const tempStore = tempStores[i];
    
            // 將 tempStores[randomIndex] 移到 tempStores[i] 的位置
            tempStores[i] = tempStores[randomIndex];
    
            // 將原來的 tempStores[i] 放到 randomIndex 位置
            tempStores[randomIndex] = tempStore;
        }
    
        setStores(tempStores);
    
        dispatch(updateStore(tempStores.slice(0, drawCount)[0]));
    };

    const handleClick = async () => {
        dispatch(updateIsDrawing(true));
    
        getDrawShops(); // 抽取 8 個店家，並更新 stores 狀態
    
        setTimeout(() => {
            // 等待 React 渲染 DOM 完成後再執行動畫
            slotAnimationHandler();
        }, 0);
    };

    const filteredStores = useMemo(() => {
        return allStores.filter(store =>
            selectedTags.every(tag => store.tags.includes(tag))
        );
    }, [allStores, selectedTags]);

    useEffect(() => {
        setStores(filteredStores);

        if (filteredStores.length === 0) {
            setStatusText("無資料");
        } else {
            setStatusText("今天吃什麼");
        }
    }, [filteredStores]);

    return (
        <div className="text-light-1 w-full flex flex-col items-center">
            <FoodSelector />
            <div className="lottery">
                {/* 滾輪title區 */}
                <div className="lottery-roll-item font-sans" id="store-title">
                    {isLoading && (
                        <h5 className="flex justify-center items-center">
                            <Loader2Icon className="animate-loading" size={30} />
                        </h5>
                    )}
                    {!isLoading && statusText && (
                        <h5 className="flex justify-center items-center">
                            {statusText}
                        </h5>
                    )}
                    {
                        visibleStores.map((store) => {
                            return (
                                <h5 key={store.id}>{store.title}</h5>
                            )
                        })
                    }
                </div>
                {/* 抽獎按鈕 */}
                <button
                    className="lottery-button disabled:bg-gray-700 disabled:border-gray-700 disabled:cursor-not-allowed"
                    onClick={handleClick}
                    disabled={isDrawing || stores.length === 0}
                >
                    點擊抽獎
                </button>
            </div>
        </div>
    )
}

export default FoodLottery
