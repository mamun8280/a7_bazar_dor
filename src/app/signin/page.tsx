
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const SignInPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading || socialLoading) return;

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (!email || !password) {
      toast.error("ইমেইল ও পাসওয়ার্ড লিখুন");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("সাইন ইন করা হচ্ছে...");

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        toast.update(toastId, {
          render: error.message || "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        return;
      }

      if (data) {
        toast.update(toastId, {
          render: "সফলভাবে সাইন ইন হয়েছে!",
          type: "success",
          isLoading: false,
          autoClose: 1500,
        });

        setTimeout(() => {
          router.replace("/");
          router.refresh();
        }, 1000);
      }
    } catch (error) {
      console.error(error);

      toast.update(toastId, {
        render: "সমস্যা হয়েছে। আবার চেষ্টা করুন।",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (
    provider: "google" | "github"
  ) => {
    if (loading || socialLoading) return;

    setSocialLoading(provider);

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "সোশ্যাল সাইন ইন করা যায়নি");
        setSocialLoading("");
      }
    } catch (error) {
      console.error(error);
      toast.error("সাইন ইন করতে সমস্যা হয়েছে");
      setSocialLoading("");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f7f1] px-4 py-8">
      <div className="w-full max-w-[400px]">
        {/* Header */}
        <div className="mb-5 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
          সাইন ইন
          </h1>

          <p className="mt-1.5 text-sm leading-6 text-gray-500">
           বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        {/* Sign In Card */}
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
          <form onSubmit={onSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                ইমেইল
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="আপনার ইমেইল লিখুন"
                autoComplete="email"
                required
                className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#28734d] focus:ring-2 focus:ring-[#28734d]/10"
              />
            </div>

            {/* Password */}
            <div>
              <div className="mb-1.5 flex items-center justify-between gap-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  পাসওয়ার্ড
                </label>

               
              </div>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="আপনার পাসওয়ার্ড লিখুন"
                  autoComplete="current-password"
                  required
                  className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 pr-16 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#28734d] focus:ring-2 focus:ring-[#28734d]/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 text-xs font-medium text-gray-500 hover:text-[#245c40]"
                  aria-label={showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"}
                >
                  {showPassword ? "লুকান" : "দেখুন"}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || Boolean(socialLoading)}
              className="mt-2 h-11 w-full rounded-lg bg-[#245c40] px-4 text-sm font-semibold text-white transition hover:bg-[#19482f] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "সাইন ইন হচ্ছে..." : "সাইন ইন করুন"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-400">অথবা</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Social Sign In */}
          <div className="flex space-y-3">
            <button
              type="button"
              disabled={loading || Boolean(socialLoading)}
              onClick={() => handleSocialLogin("google")}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FcGoogle size={20} />
              {socialLoading === "google"
                ? "অপেক্ষা করুন..."
                : "Google দিয়ে চালিয়ে যান"}
            </button>

            <button
              type="button"
              disabled={loading || Boolean(socialLoading)}
              onClick={() => handleSocialLogin("github")}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FaGithub size={20} />
              {socialLoading === "github"
                ? "অপেক্ষা করুন..."
                : "GitHub দিয়ে চালিয়ে যান"}
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="mt-5 text-center text-sm text-gray-600">
            নতুন এখানে?
            <Link
              href="/signup"
              className="ml-1 font-semibold text-[#245c40] hover:underline"
            >
              অ্যাকাউন্ট তৈরি করুন
            </Link>
          </p>
        </div>

        {/* Back Home */}
        <div className="mt-5 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#245c40] transition hover:text-[#19482f]"
          >
            <span aria-hidden="true">←</span>
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
};

export default SignInPage;

