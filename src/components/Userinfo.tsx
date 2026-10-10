"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { FiUser } from "react-icons/fi";
import { LuLogOut } from "react-icons/lu";
import { toast } from "react-toastify";

const UserInfo = () => {
    const { data: session, isPending, refetch } = authClient.useSession();
    const user = session?.user;

    const [isOpen, setIsOpen] = useState(false);
    const [isSigningOut, setIsSigningOut] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleSignout = async () => {
        if (isSigningOut) return;

        setIsSigningOut(true);

        const toastId = toast.loading("সাইন আউট করা হচ্ছে...");

        try {
            const { error } = await authClient.signOut();

            if (error) {
                toast.update(toastId, {
                    render: error.message || "সাইন আউট করা যায়নি!",
                    type: "error",
                    isLoading: false,
                    autoClose: 3000,
                });

                return;
            }

            setIsOpen(false);

            await refetch();

            toast.update(toastId, {
                render: "সফলভাবে সাইন আউট হয়েছে!",
                type: "success",
                isLoading: false,
                autoClose: 2500,
            });
        } catch (error) {
            console.error("Sign out error:", error);

            toast.update(toastId, {
                render: "সাইন আউট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
        } finally {
            setIsSigningOut(false);
        }
    };

    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

  
    if (isPending) {
        return (
            <div className="h-10 w-28 animate-pulse rounded-xl bg-gray-100" />
        );
    }

    return (
        <div className="relative flex items-center" ref={dropdownRef}>
            {user ? (
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-expanded={isOpen}
                        className="flex cursor-pointer items-center gap-2.5 rounded-full px-2 py-1.5 transition hover:bg-gray-100"
                    >
                        <div className="h-10 w-10 overflow-hidden rounded-xl border border-gray-200 bg-gray-100">
                            <img
                                alt={user.name || "User Avatar"}
                                src={
                                    user.image ||
                                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                }
                                className="h-full w-full object-cover"
                            />
                        </div>

                        <span className="text-base font-semibold text-gray-900">
                            {user.name}
                        </span>

                        <span
                            className={`text-[10px] text-gray-500 transition-transform ${
                                isOpen ? "rotate-180" : ""
                            }`}
                        >
                            ▼
                        </span>
                    </button>

                    {isOpen && (
                        <div className="absolute right-0 z-50 mt-2 w-64 rounded-2xl border border-gray-100 bg-white p-4 shadow-lg ring-1 ring-black/5">
                            <div className="border-b border-gray-100 pb-3">
                                <p className="font-semibold text-gray-900">
                                    {user.name}
                                </p>

                                <p className="truncate text-xs text-gray-500">
                                    {user.email}
                                </p>
                            </div>

                            <div className="mt-2 space-y-1">
                                <Link
                                    href="/profile"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
                                >
                                    <FiUser className="text-base text-gray-500" />
                                    <span>আমার প্রোফাইল</span>
                                </Link>

                                <button
                                    type="button"
                                    onClick={handleSignout}
                                    disabled={isSigningOut}
                                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    <LuLogOut className="text-base" />

                                    <span>
                                        {isSigningOut
                                            ? "সাইন আউট হচ্ছে..."
                                            : "সাইন আউট"}
                                    </span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex items-center gap-2 sm:gap-3">
                    <Link
                        href="/signin"
                        className="text-xs font-semibold text-black transition hover:text-green-700 sm:text-sm"
                    >
                        সাইন ইন
                    </Link>

                    <Link
                        href="/signup"
                        className="rounded-xl bg-green-700 px-3 py-2 text-xs font-semibold text-white transition hover:bg-green-800 sm:px-4 sm:text-sm"
                    >
                        সাইন আপ
                    </Link>
                </div>
            )}
        </div>
    );
};

export default UserInfo;
