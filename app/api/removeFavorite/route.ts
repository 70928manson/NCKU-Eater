import User from "@/models/User";
import connect from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    const body = await request.json();
    const { email, storeId } = body;

    if (!email || !storeId) {
        return new NextResponse('Missing info', { status: 400 });
    };

    await connect();

    try {
        // 查找用戶
        const user = await User.findOne({ email });

        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }

        const storeIndex = user.favoriteStores.findIndex(
            (favoriteStore: any) => favoriteStore.id === storeId
        );

        if (storeIndex === -1) {
            return new NextResponse("Store not found in favorites", { status: 404 });
        }

        // 從 favoriteStores 中移除該 store
        user.favoriteStores.splice(storeIndex, 1);

        // 保存更新後的用戶
        await user.save();

        return NextResponse.json(user);
    } catch (err: any) {
        console.log("REMOVE_FAVORITE_ERROR", err);

        return new NextResponse(err.message, {
            status: 500
        });
    };
};
