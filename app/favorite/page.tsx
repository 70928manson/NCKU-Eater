"use client";

import { stores } from "@/constants/stores";

export default function Favorite() {
    return (
        <div className="flex flex-col items-center w-full">
            <h2 className="text-2xl md:text-3xl head-text tracking-widest mb-6">
                My Favorite
            </h2>
            <div className="w-[80%] bg-[#3f3f3f] text-white font-sans">
                {
                    stores.map((store) => {
                        return (
                            <div className="p-4" key={store._key}>
                                {store.name}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}
