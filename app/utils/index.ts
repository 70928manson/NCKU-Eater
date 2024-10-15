// 生成 min 到 max 之間的隨機數 (包含 min，不包含 max)
// 取得隨機亂數 index
export  const getRandomNum = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
}