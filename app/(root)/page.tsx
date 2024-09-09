"use client";

import Modal from "@/components/modal/Modal";
import FoodLottery from "./components/FoodLottery";
import LocationMap from "./components/LocationMap";

import {
  AlertDialog,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useGetAllStoresQuery } from "@/redux/services/storeServices";
import { useEffect, useState } from "react";
import { KeySquareIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";

export default function Home() {
  const [open, setOpen] = useState(false);
  //抓出全部的店家資料
  const { data, error, isLoading } = useGetAllStoresQuery("all");

  const allStores = data || [];
  
  const router = useRouter();

  const fetchUpdatedSession = async () => {
    const session = await getSession();

    return session;
  };

  useEffect(() => {
    const loginModalOpen = async () => {
      const session = await fetchUpdatedSession();

      if (!session) {
        setOpen(true);
      }
    };

    loginModalOpen();
  }, []);
  
  return (
    <>
      <div className="flex flex-col items-center w-full">
        <h2 className="text-2xl md:text-3xl head-text tracking-widest mb-6">
          NCKU Food Draw
        </h2>
        <div className="text-light-1 w-full flex flex-col items-center">
          <FoodLottery allStores={allStores} isLoading={isLoading} />
          <LocationMap setOpen={setOpen} />
        </div>
      </div>
      <AlertDialog open={open}>
        <AlertDialogTrigger asChild>
        </AlertDialogTrigger>
        <Modal
          title="你尚未登入"
          content={[
            `登入後即可把店家收藏起來哦哦`
          ]}
          icon={<KeySquareIcon size={18} className="mr-1" />}
          handleOk={() => router.push("/auth")}
          handleCancel={() => setOpen(false)}
          modalType="Login"
        />
      </AlertDialog>
    </>
  );
}
