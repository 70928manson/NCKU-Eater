"use client";

import React, { useEffect, useState } from 'react'
import FoodSelector from './FoodSelector'
import { getRandomNum } from '@/app/utils';
import { Store } from '@/app/types/store';
import { updateStore } from '@/redux/slices/lotterySlices';
import { useDispatch } from 'react-redux';

interface FoodLotteryProps {
    stores: Store[];
}

const FoodLottery: React.FC<FoodLotteryProps> = ({ stores }) => {
    const [drawCheck, setDrawCheck] = useState(true);

    const [allStores, setAllStores] = useState(stores);

    const dispatch = useDispatch();

    const slotAnimationHandler = () => {
        const list = document.querySelectorAll('#store-title > h5');
        Array.prototype.forEach.call(list, item => item.classList.add(`span`));
        const duration = 1500; // 拉霸效果執行多久
        setTimeout(() => {
            // 停止拉霸動畫
            Array.prototype.forEach.call(list, item => item.removeAttribute('class'));
            setDrawCheck(false);
        }, duration);
    };

    // 亂數抽獎, 將陣列中隨機選到的店家與第一個店家互換
    const getDrawShop = (stores: Store[], randomNum: number) => {
        const tempStores = [...allStores]

        // 儲存原來的 stores[0]
        const firstStore = tempStores[0];

        // 從 stores 中移除 stores[randomNum]，並將 stores[0] 放在該位置
        // splice 返回被移除的元素 (splice 回傳陣列，所以取出第一個元素)
        const removedStore = tempStores.splice(randomNum, 1, firstStore)[0];

        // 將被移除的元素 (stores[randomNum] 原本的值) 賦值給 stores[0]
        tempStores[0] = removedStore;

        setAllStores(tempStores);

        // 將被抽中的店家資訊給 redux state, 給其他 component 使用
        dispatch(updateStore(tempStores[0]));
    };

    const handleClick = () => {
        const storesLength = stores.length;
        const randomNum = getRandomNum(storesLength);

        getDrawShop(stores, randomNum);

        slotAnimationHandler();
    };

    useEffect(() => {
        if (stores) {
            setAllStores(stores);
        };
    }, [stores]);

    return (
        <div className="text-light-1 w-full flex flex-col items-center">
            <FoodSelector />
            <div className="lottery">
                {/* 滾輪title區 */}
                <div className="lottery-roll-title font-sans" id="store-title">
                    {
                        drawCheck ? <h5>今天吃什麼</h5> : null
                    }
                    {
                        allStores.map((store) => {
                            return (
                                <h5 key={store.id}>{store.title}</h5>
                            )
                        })
                    }
                </div>
                {/* 抽獎按鈕 */}
                <button className="lottery-button" onClick={handleClick} disabled={stores.length === 0}>
                    點我開抽
                </button>
            </div>
        </div>
    )
}

export default FoodLottery
