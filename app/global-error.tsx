'use client' // Error boundaries must be Client Components

import Link from 'next/link'

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        // global-error must include html and body tags
        <html>
            <body>
                <div className="w-full max-w-4xl h-full mx-auto main-container">
                    <div className="m-auto flex flex-col justify-center items-center gap-8">
                        <div className="rounded-[36px] text-xs bg-slate-50 text-black-1 text-primary-600 px-2 py-0.5">
                            ERROR
                        </div>
                        <h2 className=" text-5xl font-bold text-slate-50">系統發生錯誤，請稍後再試</h2>
                        <p className=" text-xl text-gray-500">
                            Something went wrong, so this page is broken.
                        </p>
                        <div className="flex gap-4">
                            <Link
                                href="/"
                                className=" px-6 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
                            >
                                回到首頁
                            </Link>
                            <button
                                onClick={() => reset()}
                                className=" px-6 py-2 bg-white text-gray-500 border-gray-400 border rounded-md hover:bg-gray-200"
                            >
                                重新整理
                            </button>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    )
}