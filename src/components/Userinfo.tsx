"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { FiUser } from "react-icons/fi";
import { LuLogOut } from "react-icons/lu";

const UserInfo = () => {
    // isPending ebong refetch add kora holo jate session load howar somoy proper state thake
    const { data: session, isPending, refetch } = authClient.useSession();
    const user = session?.user;
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleSignout = async () => {
        await authClient.signOut();
        setIsOpen(false);
        refetch();
    };

    // Baire click korle dropdown bondho hoye jabe
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Session pending thakle ba load howar somoy jump avoid korar jonno
    if (isPending) {
        return <div className="h-9 w-24 animate-pulse rounded-lg bg-gray-100" />;
    }

    return (
        <div className="relative flex items-center" ref={dropdownRef}>
            {user ? (
                <div className="relative">
                    {/* Trigger Button (Name and Profile Image) */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center gap-2 rounded-full py-1.5 px-2 transition hover:bg-gray-100 cursor-pointer"
                    >
                        <div className="avatar">
                            <div className="w-9 h-9 rounded-full ring-1 ring-gray-300 overflow-hidden">
                                <img
                                    alt={user.name || "User Avatar"}
                                    src={(user.image as string) || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        <span className="text-sm font-medium text-gray-800">{user.name}</span>
                        <span className={`text-xs text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}>▼</span>
                    </button>

                    {/* Dropdown Menu */}
                    {isOpen && (
                        <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-gray-100 bg-white p-4 shadow-lg ring-1 ring-black/5 z-50">
                            {/* User Info with exact name & email */}
                            <div className="border-b border-gray-100 pb-3">
                                <p className="font-semibold text-gray-900">{user.name}</p>
                                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                            </div>

                            {/* Menu Options */}
                            <div className="mt-2 space-y-1">
                                <Link
                                    href="/profile"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
                                >
                                    <FiUser className="text-gray-500 text-base" />
                                    <span>আমার প্রোফাইল</span>
                                </Link>

                                <button
                                    onClick={handleSignout}
                                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-red-600 transition hover:bg-red-50 text-left"
                                >
                                    <LuLogOut className="text-base" />
                                    <span>সাইন আউট</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex items-center gap-2 sm:gap-3">
                    <Link
                        href="/signin"
                        className="text-xs sm:text-sm font-semibold text-black hover:text-green-700 transition"
                    >
                        সাইন ইন
                    </Link>

                    <Link
                        href="/signup"
                        className="bg-green-700 text-white text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2 rounded-xl hover:bg-green-800 transition"
                    >
                        সাইন আপ
                    </Link>
                </div>
            )}
        </div>
    );
};

export default UserInfo;