"use client";

import React, { useEffect, useMemo, useState, useRef, useCallback } from 'react'
import FoodSelector from './FoodSelector'
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
    const [displayStores, setDisplayStores] = useState<Store[]>([]);  // 僅用於顯示動畫的8個店家
    const [isAnimating, setIsAnimating] = useState(false);
    const [lastWinner, setLastWinner] = useState<Store | null>(null); // 記錄上次抽到的店家
    const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const selectedTags = useSelector((state: RootState) => state.lottery.selectedTags);
    const isDrawing = useSelector((state: RootState) => state.lottery.isDrawing);

    const dispatch = useDispatch();

    // 使用 Fisher-Yates 洗牌算法完整打亂數組
    const shuffleArray = useCallback((array: Store[]): Store[] => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }, []);

    // 計算當前可用的店家（根據篩選 tags條件）
    const filteredStores = useMemo(() => {
        return allStores.filter(store =>
            selectedTags.every(tag => store.tags.includes(tag))
        );
    }, [allStores, selectedTags]);

    // 每次從完整列表中抽取，避免重複
    const drawRandomStore = useCallback(() => {
        try {
            if (filteredStores.length === 0) {
                throw new Error('沒有可選擇的店家');
            }

            // 如果有上次抽到的店家，創建不包含該店家的列表
            let candidateStores = filteredStores;
            if (lastWinner && filteredStores.length > 1) {
                candidateStores = filteredStores.filter(store => store.id !== lastWinner.id);
            }

            // 如果過濾後沒有候選者（只有1個店家的情況），使用全部列表
            if (candidateStores.length === 0) {
                candidateStores = filteredStores;
            }

            // 完整洗牌候選店家
            const shuffledStores = shuffleArray(candidateStores);
            
            // 選擇第一個作為抽到的店家
            const winner = shuffledStores[0];
            
            // 為動畫效果 animationStores 準備8個店家
            const animationStores = shuffleArray(filteredStores).slice(0, Math.min(8, filteredStores.length));
            // 確保抽到的店家在 animationStores 的第一個位置
            const displayStoresForAnimation = [winner, ...animationStores.filter(store => store.id !== winner.id)].slice(0, 8);
            
            return {
                displayStores: displayStoresForAnimation,
                winner
            };
        } catch (error) {
            console.error('抽獎過程發生錯誤:', error);
            return null;
        }
    }, [filteredStores, lastWinner, shuffleArray]);

    // 優化的動畫處理
    const startSlotAnimation = useCallback(() => {
        setIsAnimating(true);
        
        // 使用固定時長，可以考慮設為可配置
        const ANIMATION_DURATION = 1500;
        
        animationTimeoutRef.current = setTimeout(() => {
            setIsAnimating(false);
            dispatch(updateIsDrawing(false));
        }, ANIMATION_DURATION);
    }, [dispatch]);

    // 主要抽獎處理函數
    const handleClick = useCallback(async () => {
        // 防止重複點擊
        if (isDrawing || isAnimating) {
            return;
        }

        try {
            dispatch(updateIsDrawing(true));
            // 立即清除狀態文字，開始抽獎
            setStatusText("");
            
            // 檢查篩選條件是否有匹配的店家
            if (filteredStores.length === 0) {
                dispatch(updateIsDrawing(false));
                setStatusText("無符合條件的店家");
                return;
            }

            const drawResult = drawRandomStore();
            
            if (!drawResult) {
                // 抽獎失敗的處理
                dispatch(updateIsDrawing(false));
                setStatusText("抽獎失敗，請重試");
                return;
            }

            const { displayStores, winner } = drawResult;
            
            // 更新顯示的店家（用於動畫效果）
            setDisplayStores(displayStores);
            // 記錄這次抽到的店家，避免下一次重複抽到
            setLastWinner(winner);
            
            // 使用 requestAnimationFrame 確保 DOM 更新後再開始動畫
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    startSlotAnimation();
                    // 更新Redux中的選中店家
                    dispatch(updateStore(winner));
                });
            });
            
        } catch (error) {
            console.error('點擊抽獎發生錯誤:', error);
            dispatch(updateIsDrawing(false));
            setStatusText("發生錯誤，請重試");
        }
    }, [isDrawing, isAnimating, drawRandomStore, startSlotAnimation, dispatch]);

    // 僅在初始化時設置顯示內容，篩選條件變化不影響顯示
    useEffect(() => {
        // 只在初始化時設置顯示店家和狀態文字
        if (displayStores.length === 0 && allStores.length > 0) {
            setStatusText("今天吃什麼");
            setDisplayStores(allStores.slice(0, Math.min(8, allStores.length)));
        }
    }, [allStores, displayStores.length]);

    // 清理定時器
    useEffect(() => {
        return () => {
            if (animationTimeoutRef.current) {
                clearTimeout(animationTimeoutRef.current);
            }
        };
    }, []);

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
                        displayStores.map((store: Store) => {
                            return (
                                <h5 
                                    key={store.id}
                                    className={isAnimating ? 'span' : ''}
                                >
                                    {store.title}
                                </h5>
                            )
                        })
                    }
                </div>
                {/* 抽獎按鈕 */}
                <button
                    className="lottery-button disabled:bg-gray-700 disabled:border-gray-700 disabled:cursor-not-allowed"
                    onClick={handleClick}
                    disabled={isDrawing || filteredStores.length === 0 || isAnimating}
                    aria-label="開始抽獎"
                >
                    {isDrawing ? '抽獎中...' : '點擊抽獎'}
                </button>
            </div>
        </div>
    )
}

export default FoodLottery
