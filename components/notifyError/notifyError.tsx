'use client';

import axios from "axios";
import toast from "react-hot-toast";

const notifyError= (error: any) => {
    let errorMessage;
  
    // 判斷error是否為axios產生的錯誤
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data || '請求錯誤';
    } else {
      errorMessage = error.message || '未知的錯誤';
    }
  
    toast.error(errorMessage);
  };
  
  export default notifyError;