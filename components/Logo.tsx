"use client";

import Link from 'next/link';

import { Bird } from 'lucide-react';

const Logo = () => {
    return (
        <Link href="/">
            <h1 className="flex">
                <Bird className="mr-1" />
                NCKU Eater
            </h1>
        </Link>
    )
}

export default Logo
