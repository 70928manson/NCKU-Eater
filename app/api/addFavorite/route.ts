import User from "@/models/User";
import connect from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    const body = await request.json();
    const { email, store } = body;

    if (!email || !store) {
        return new NextResponse('Missing info', { status: 400 });
    };

    await connect();

    try {
        // 查找用戶
        const user = await User.findOne({ email });

        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }

        // 檢查並初始化 favoriteStores
        if (!user.favoriteStores) {
            user.favoriteStores = [];
        }

        // 檢查 store 是否已經在 favoriteStores 中
        const isAlreadyFavorite = user.favoriteStores.some(
            (favoriteStore: any) => favoriteStore.id === store.id
        );

        if (isAlreadyFavorite) {
            return new NextResponse("Store already in favorites", { status: 400 });
        }

        // 將 store 添加到 favoriteStores 中
        user.favoriteStores.push(store);

        // 保存更新後的用戶
        try {
            await user.save();
        } catch (err) {
            console.log("SAVE_ERROR", err);
        }

        return NextResponse.json(user);
    } catch (err: any) {
        console.log("ADD_FAVORITE_ERROR", err);

        return new NextResponse(err.message, {
            status: 500
        });
    };
};
