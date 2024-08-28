//取得隨機亂數
export const getRandomNum = (arrayLength: number) => {
    // 陣列的最大、小值
    let max = arrayLength - 1;
    let min = 0;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}