"use client";

import { use, useEffect, useState } from "react";
import { Heart, Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";


async function fetcher(pathname: string) {
    const token = localStorage.getItem("authtoken") || "";
  
    const data = await fetch(`https://e-commerce-service-api.vercel.app${pathname}`, {
      headers: {
        authtoken: token,
      },
    }).then((res) => res.json());
  
    return data;
  }


  const Header= () => {
    const [auth, setAuth] = useState<string | null>(null);

    useEffect(() => {
        fetcher("/auth")
            .then((data) => setAuth(data))
            .catch((error) => console.error(error));
    }, []);
    const [savedCount, setSavedCount] = useState("0")

    useEffect(() => {
        const handleStorageChange = () => {
            const count = localStorage.getItem("savedCount");
            if (count !== null) {
                setSavedCount(count);
            }
        };
        window.addEventListener('storageChange', handleStorageChange);
        return () => {
            window.removeEventListener('storageChange', handleStorageChange);
        };
    }, []);

    

    return (
        <header className="w-full bg-black text-white p-[16px_24px] mx-auto">
            <div className="max-w-[1392px] mx-auto flex justify-between h-9">
                <div className="flex gap-80">
                <div className="flex items-center gap-8">
                    <Link href={"/"}><div className="flex gap-2 items-center cursor-pointer">
                        <svg
                            width="32"
                            height="28"
                            viewBox="0 0 32 28"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            href="/"
                            aria-hidden="true"
                        >
                            <path
                                d="M5.11038 2.72127L0.806264 10.7774C0.269142 11.7856 0 12.8922 0 14.0002C0 15.1084 0.269142 16.2147 0.806264 17.223L5.11038 25.2793C5.9037 26.7673 7.45516 27.6967 9.14352 27.6967H13.7153V25.4145H13.7138C12.8704 25.4145 12.0946 24.9505 11.6979 24.2065L7.39543 16.1488C7.03585 15.4771 6.85665 14.7395 6.85665 14.0002C6.85665 13.2609 7.03585 12.5233 7.39543 11.8518L11.6979 3.794C12.0946 3.0499 12.8704 2.58604 13.7138 2.58604H13.7153V0.303711H9.14352C7.45516 0.303711 5.9037 1.23325 5.11038 2.72127Z"
                                fill="white"
                            />
                            <path
                                d="M31.1937 10.7774L26.8898 2.72133C26.0963 1.23314 24.545 0.30377 22.8567 0.30377H18.2847V2.58593H18.2864C19.1298 2.58593 19.9055 3.04996 20.3021 3.79389L24.6046 11.8517C24.9643 12.5233 25.1432 13.261 25.1432 14.0002C25.1432 14.7395 24.9643 15.4772 24.6046 16.1488L20.3021 24.2064C19.9055 24.9505 19.1298 25.4144 18.2864 25.4144H18.2847V27.6967H22.8567C24.545 27.6967 26.0963 26.7674 26.8898 25.2792L31.1937 17.2231C31.7307 16.2148 32 15.1083 32 14.0002C32 12.8922 31.7307 11.7857 31.1937 10.7774Z"
                                fill="white"
                            />
                        </svg>
                        <p className="text-sm">ECOMMERCE</p>
                    </div></Link>
                    <Link href={"/category"}>
                    <div className="text-sm font-normal">Ангилал</div></Link>
                </div>
                <div className="rounded-full p-[8px_16px] bg-[#18181B] w-[300px] h-10">
                    <div className="flex gap-2 items-center">
                    <div className="size-6 flex justify-center items-center"><Search strokeWidth={1} size={20}/></div>
                    <input type="search" placeholder="Бүтээгдэхүүн хайх" className="bg-transparent outline-none"/>
                    </div>
                </div>
                </div>
                <div className="flex gap-6 items-center">
                        <Link href={"/saved"} className="relative"><Heart strokeWidth={1}/>{savedCount === "0"  ? null : <div className="absolute rounded-full size-4 bg-[#2563EB] top-[-6px] right-[-8px] text-[10px] leading-4 font-normal text-center">{savedCount}</div>}</Link>
                        <Link href={"/order"}><ShoppingCart strokeWidth={1} /></Link>        
                    {auth ? 
                        <div>
                            <Link href={"/user"}>
                                <User strokeWidth={1}/>
                            </Link>
                        </div> 
                        :    
                        <div className="flex gap-2 text-sm font-medium">
                            <Link href={"/signup"}>
                                <button className="rounded-full p-2 border border-blue-900 hover:opacity-85 duration-150 h-9">
                                    Бүртгүүлэх
                                </button>
                            </Link>
                            <Link href={"/login"}>
                                <button className="bg-blue-600 rounded-3xl hover:opacity-85 p-[8px_12px] h-9">
                                    Нэвтрэх
                                </button>
                            </Link>
                        </div>
                    }
                </div>
            </div>
        </header>
    );
};

export default Header;