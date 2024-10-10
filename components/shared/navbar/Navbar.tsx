"use client";

import Link from 'next/link';

import { Bird, HeartIcon, Loader2Icon, LogOutIcon } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
    const { data: session, status } = useSession();
    const isUserLogIn = status === "authenticated";

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
                            {/* <LogOutIcon className="md:hidden" color="white" size={24} /> */}
                            {/* <p className="text-light-1"></p> */}
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Avatar>
                                        <AvatarImage src={session?.user?.image || "https://github.com/shadcn.png"} alt="user picture" />
                                        <AvatarFallback>...</AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>{session?.user?.username ? session?.user?.username : 'Account'}</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="cursor-pointer">
                                        <Link
                                            href="/favorite"
                                            className="flex items-center"
                                        >
                                            <HeartIcon className="mr-2" size={16} /> Favorite
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
                                        <LogOutIcon className="mr-2 h-4 w-4" />Sign Out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    ) : (
                        status === "loading" ? (
                            <div className="flex justify-center items-center text-white">
                                <Loader2Icon className="animate-loading" size={30} />
                            </div>
                        ) : (
                            <Link
                                href="/auth"
                                className="font-light flex gap-2 text-dark-1 text-sm tracking-widest border bg-white rounded px-4 py-1 cursor-pointer hover:bg-light-2"
                            >
                                登入
                            </Link>
                        )
                    )
                }
            </nav>
        </header>
    )
}

export default Navbar
