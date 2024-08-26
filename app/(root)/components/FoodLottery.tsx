"use client";

import React, { useState } from 'react'
import FoodSelector from './FoodSelector'

const FoodLottery = () => {
    const [drawCheck, setDrawCheck] = useState(false);

    const slotAnimationHandler = () => {
        console.log("check")
        const list = document.querySelectorAll('#store-title > h5');
        Array.prototype.forEach.call(list, item => item.classList.add(`span`));
        const duration = 1500; // 拉霸效果執行多久
        setTimeout(() => {
            console.log("檢查")
            // 停止拉霸動畫
            Array.prototype.forEach.call(list, item => item.removeAttribute('class'));
            setDrawCheck(false);
        }, duration);
    }

    return (
        <div className="text-light-1 w-full flex flex-col items-center">
            <FoodSelector />
            <div className="lottery">
                {/* 滾輪title區 */}
                <div className="lottery-roll-title" id="store-title">
                    {/* { stores ? stores.map : '今天吃什麼' } */}
                    <h5>今天吃什麼</h5>
                    <h5>1</h5>
                    <h5>2</h5>
                    <h5>3</h5>
                    <h5>4</h5>
                    <h5>5</h5>
                    <h5>6</h5>
                </div>
                {/* 抽獎按鈕 */}
                <div className="lottery-button" onClick={slotAnimationHandler}>
                    點我開抽
                </div>
            </div>

            {/* <h5>今天吃什麼(roll)</h5> */}

        </div>
    )
}

export default FoodLottery
