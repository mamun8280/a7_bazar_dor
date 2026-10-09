"use client"

import { authClient } from "@/lib/auth-client";

import Link from "next/link";
import Image from "next/image";


const UserInfo = () => {
    const {data: session} = authClient.useSession();
    const user = session?.user;
    console.log(user);
    const handleSignout = async() =>{
        await authClient.signOut();
    }

    return (
        <div className="absolute right-0 items-center gap-4 hidden md:flex">
            {
                user ? <div className="flex flex-col items-center ">
                        <div className="avatar">
                            <div className="ring-primary ring-offset-base-100 w-10 mt-5 rounded-full ring-2 ring-offset-2">
                                <img
                                    alt="Tailwind-CSS-Avatar-component"
                                    src={user?.image as string}
                                    width={40}
                                    height={40}
                                />
                            </div>
                            </div>
                            <h2 className="mt-2 text-xl text-blue-500">{user.name}</h2>
                            <button onClick={handleSignout} className="btn btn-error btn-xs">Signout</button>

                </div> :    <div>
         <Link href="/signin">
                 <button className="text-sm font-semibold text-gray-600 hover:text-red-700 transition">
            সাইন ইন
          </button>
         </Link>
        <Link href="/signup">
                  <button className="bg-red-700 text-white text-xs font-semibold px-4 py-2 rounded hover:bg-red-800 transition">
            সাইন আপ
          </button>
        </Link>
        </div>
            }

         
        </div>
    );
};

export default UserInfo;