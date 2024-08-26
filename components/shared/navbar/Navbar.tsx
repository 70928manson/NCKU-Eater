"use client";

import Link from 'next/link';

import { Bird, LogOutIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Navbar = () => {
    const session = useSession();
    const isUserLogIn = session?.status === "authenticated";

    console.log("session", session)

    return (
        <header>
            <nav className="navbar">
                <Link href="/" className="flex items-center gap-4">
                    <Bird color="white" size={36} />
                    <p className="text-heading3-bold text-light-1 max-xs:hidden">NCKU Eater</p>
                </Link>
                {
                    isUserLogIn ? (
                        <div className="flex cursor-pointer gap-2 items-center">
                            <LogOutIcon className="md:hidden" color="white" size={24} />
                            <p className="text-light-1">你好!~ {session?.data?.user?.username}</p>
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </div>
                    ) : (
                            <div className="font-light flex gap-2 text-dark-1 text-sm tracking-widest border bg-white rounded px-4 py-1 cursor-pointer hover:bg-light-2">
                                <Link href="/auth">登入</Link>
                            </div>
                    )
                }
            </nav>
        </header>
    )
}

export default Navbar
