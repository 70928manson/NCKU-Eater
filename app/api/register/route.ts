import User from "@/models/User";

import connect from "@/lib/db";

import bcrypt from "bcrypt";

import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    const body = await request.json();
    const { username, email, password } = body;

    if (!username || !email || !password) {
        return new NextResponse('Missing info', { status: 400 });
    };

    await connect();

    const existingUser = await User.findOne({email});

    if (existingUser) {
        return new NextResponse("Email is already in use", { status: 400 });
    };

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        privilege: 'user',
        favoriteStores: []
    });

    try { 
        await newUser.save();
        return NextResponse.json(newUser);
    }catch(err: any) {
        console.log("REGISTER_ERROR", err);

        return new NextResponse(err, {
            status: 500
        });
    };
};