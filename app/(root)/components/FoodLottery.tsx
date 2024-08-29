"use client";

import React, { useState } from 'react'
import FoodSelector from './FoodSelector'
import { Store } from '@/constants/stores';
import { getRandomNum } from '@/app/utils';

interface FoodLotteryProps {
    stores: Store[];
}

const FoodLottery: React.FC<FoodLotteryProps> = ({ stores }) => {
    const [drawCheck, setDrawCheck] = useState(false);

    const [tempStores, setTempStores] = useState(stores);

    const slotAnimationHandler = () => {
        const list = document.querySelectorAll('#store-title > h5');
        Array.prototype.forEach.call(list, item => item.classList.add(`span`));
        const duration = 1500; // 拉霸效果執行多久
        setTimeout(() => {
            console.log("檢查")
            // 停止拉霸動畫
            Array.prototype.forEach.call(list, item => item.removeAttribute('class'));
            setDrawCheck(false);
        }, duration);
    };

    // 亂數抽獎
    const getDrawShop = (stores: Store[], randomNum: number) => {
        //將陣列中隨機選到的店家與第一個店家互換

        const test = [...tempStores]

        // 1. 儲存原來的 stores[0]
        const firstStore = test[0];

        // 2. 從 stores 中移除 stores[randomNum]，並將 stores[0] 放在該位置
        // splice 返回被移除的元素 (splice 回傳陣列，所以取出第一個元素)
        const removedStore = test.splice(randomNum, 1, firstStore)[0];

        console.log("removedStore", removedStore);
        

        // 3. 將被移除的元素 (stores[randomNum] 原本的值) 賦值給 stores[0]
        test[0] = removedStore;

        setTempStores(test);
    };

    const handleClick = () => {
        const storesLength = stores.length;
        const randomNum = getRandomNum(storesLength);

        getDrawShop(stores, randomNum);

        slotAnimationHandler();
    };

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
                        tempStores.map((store) => {
                            return (
                                <h5 key={store._key}>{store.name}</h5>
                            )
                        })
                    }
                </div>
                {/* 抽獎按鈕 */}
                <div className="lottery-button" onClick={handleClick}>
                    點我開抽
                </div>
            </div>

            {/* <h5>今天吃什麼(roll)</h5> */}

        </div>
    )
}

export default FoodLottery
