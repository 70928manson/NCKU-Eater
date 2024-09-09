"use client";

import { sidebarLinks } from "@/constants/links";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOutIcon } from 'lucide-react';
import { signOut, useSession } from "next-auth/react";

const Sidebar = () => {
    const pathname = usePathname();

    const session = useSession();
    const isUserLogIn = session?.status === "authenticated";
 
    return (
        <section className="custom-scrollbar sidebar">
            <div className="flex w-full flex-1 flex-col gap-6 px-6">
                {sidebarLinks.map((link) => {
                    const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;
                    return (
                        <Link
                            href={link.route}
                            key={link.label}
                            className={`sidebar-link ${isActive && 'bg-primary-500'}`}
                        >
                            <Image
                                src={link.imgURL}
                                alt={link.label}
                                width={24}
                                height={24}
                            />
                            <p className="text-light-1 max-lg:hidden">{link.label}</p>
                        </Link>
                    )
                })}
            </div>

            <div className="mt-10 px-6">
                {
                    isUserLogIn && (
                        <div className="sidebar-link cursor-pointer" onClick={() => signOut()}>
                            <LogOutIcon color="white" size={24} />
                            <p className="text-light-2 max-lg:hidden">Sign Out</p>
                        </div>
                    )
                }
            </div>
        </section>
    )
}

export default Sidebar