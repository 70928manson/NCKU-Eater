import Link from "next/link";

export default function NotFound() {
    return (
        <>
            <div className="w-screen h-screen bg-black text-white p-2.5 flex flex-col items-center justify-center">
                <div className="flex text-center items-center mb-5">
                    <h1 className="border-r-2 border-white inline-block mr-5 px-5 text-3xl font-bold align-top leading-[56px]">
                        404
                    </h1>
                    <p className="text-xl ">This page could not be found.</p>
                </div>
                <Link href="/" className="border-2 border-white p-3 rounded hover:bg-white hover:text-black">
                    回到首頁
                </Link>
            </div>
        </>
    );
}