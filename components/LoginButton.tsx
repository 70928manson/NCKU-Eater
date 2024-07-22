"use client";

import { signOut } from 'next-auth/react';
import Link from 'next/link';

const LoginButton = () => {
  // Navbar的
  return (
    <>
      <div className="md:flex hidden gap-5 items-center">
        <Link href="/login">Login</Link>
        <Link href="/login" onClick={() => signOut()}>log out</Link>
      </div>
    </>
  )
}

export default LoginButton
