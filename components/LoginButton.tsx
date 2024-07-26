"use client";

import { MenuIcon, SquareMenuIcon } from 'lucide-react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';

const LoginButton = () => {
  // Navbar的
  return (
    <>
      <div className="md:flex hidden gap-5 items-center">
        <Link href="/login">Login</Link>
        <Link href="/login" onClick={() => signOut()}>log out</Link>
      </div>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <MenuIcon />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="font-normal">這個是 Header Title</SheetTitle>
              <SheetDescription>
                Header說明
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col">
              <Link href="/login">Login</Link>
              <Link href="/login" onClick={() => signOut()}>log out</Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}

export default LoginButton
