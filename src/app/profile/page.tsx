"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const UserProfile = () => {
    const router = useRouter();
    const { data: session, refetch } = authClient.useSession();
    const user = session?.user;

    const [name, setName] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSignout = async () => {
        await authClient.signOut();
        refetch();
        router.push("/signin");
        router.refresh();
    };

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();

        const updatedName = (name ?? user?.name ?? "").trim();

        if (!updatedName) {
            toast.error("নাম খালি রাখা যাবে না");
            return;
        }

        setLoading(true);
        const toastId = toast.loading("প্রোফাইল আপডেট করা হচ্ছে...");

        try {
            const { error } = await authClient.updateUser({
                name: updatedName,
            });

            if (error) {
                toast.update(toastId, {
                    render: error.message || "নাম আপডেট করা যায়নি",
                    type: "error",
                    isLoading: false,
                    autoClose: 3000,
                });
                return;
            }

            toast.update(toastId, {
                render: "সফলভাবে নাম আপডেট হয়েছে!",
                type: "success",
                isLoading: false,
                autoClose: 2000,
            });

            refetch();
            router.refresh();
        } catch (err) {
            console.error(err);
            toast.update(toastId, {
                render: "কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#f4f7f1] px-4 py-8">
            <div className="mx-auto max-w-3xl space-y-6">
                {/* Header Title */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">আমার প্রোফাইল</h1>
                    <p className="text-sm text-gray-500 mt-0.5">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
                </div>

                {/* Top User Info Card */}
                <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full overflow-hidden border border-gray-200">
                            <img
                                alt={user?.name || "User Avatar"}
                                src={(user?.image as string) || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <h2 className="font-bold text-gray-900 text-base">{user?.name}</h2>
                            <p className="text-xs text-gray-500">{user?.email}</p>
                        </div>
                    </div>

                    <button
                        onClick={handleSignout}
                        className="flex items-center gap-1.5 rounded-lg border border-red-200 px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 cursor-pointer"
                    >
                        <span>↪</span>
                        <span>সাইন আউট</span>
                    </button>
                </div>

                {/* Information / Edit Card */}
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                    <h3 className="text-base font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">তথ্য</h3>

                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                                নাম
                            </label>
                            <input
                                type="text"
                                value={name ?? user?.name ?? ""}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="আপনার নাম লিখুন"
                                required
                                className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-4 h-11 w-full rounded-lg bg-[#0E833C] px-4 text-sm font-semibold text-white transition hover:bg-[#0b6a30] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                        >
                            {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default UserProfile;