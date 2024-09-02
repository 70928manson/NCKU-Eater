"use client";

import FoodLottery from "./components/FoodLottery";
import LocationMap from "./components/LocationMap";

import { useGetAllStoresQuery } from "@/redux/services/storeServices";

export default function Home() {
  //抓出全部的店家資料
  const { data, error, isLoading } = useGetAllStoresQuery("all");
  console.log("rtk data", data)

  const stores = data || [];
  
  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-2xl md:text-3xl head-text tracking-widest mb-6">
        NCKU Food Draw
      </h2>
      <div className="text-light-1 w-full flex flex-col items-center">
        <FoodLottery stores={stores}/>
        <LocationMap />
      </div>
    </div>
  );
}
