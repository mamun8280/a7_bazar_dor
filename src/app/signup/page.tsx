"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const SignUpPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading || socialLoading) return;

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();

    if (!name || !email || !password || !confirmPassword) {
      toast.error("সব প্রয়োজনীয় তথ্য পূরণ করুন");
      return;
    }

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("দুটি পাসওয়ার্ড মিলছে না");
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading("অ্যাকাউন্ট তৈরি করা হচ্ছে...");

    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        toast.update(loadingToast, {
          render: error.message || "অ্যাকাউন্ট তৈরি করা যায়নি",
          type: "error",
          isLoading: false,
          autoClose: 3500,
        });
        return;
      }

      if (data) {
        toast.update(loadingToast, {
          render: "অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!",
          type: "success",
          isLoading: false,
          autoClose: 1800,
        });

        form.reset();
        setPassword("");
        setConfirmPassword("");

        setTimeout(() => {
          router.replace("/");
          router.refresh();
        }, 1200);
      }
    } catch (error) {
      console.error(error);

      toast.update(loadingToast, {
        render: "কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।",
        type: "error",
        isLoading: false,
        autoClose: 3500,
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
        toast.error(error.message || "সোশ্যাল লগইন করা যায়নি");
        setSocialLoading("");
      }
    } catch (error) {
      console.error(error);
      toast.error("লগইন করতে সমস্যা হয়েছে");
      setSocialLoading("");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f7f1] px-4 py-8">
      <div className="w-full max-w-[400px]">
        {/* Header */}
        <div className="mb-5 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="mt-1.5 text-sm leading-6 text-gray-500">
            বাজারের সর্বশেষ দাম জানতে যোগ দিন।
          </p>
        </div>

        {/* Signup Card */}
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
          <form onSubmit={onSubmit} className="space-y-3.5">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                আপনার নাম
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="আপনার পুরো নাম লিখুন"
                autoComplete="name"
                required
                className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#28734d] focus:ring-2 focus:ring-[#28734d]/10"
              />
            </div>

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
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                পাসওয়ার্ড
              </label>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="কমপক্ষে ৮ অক্ষর"
                autoComplete="new-password"
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#28734d] focus:ring-2 focus:ring-[#28734d]/10"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                পাসওয়ার্ড নিশ্চিত করুন
              </label>

              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="আবার পাসওয়ার্ড লিখুন"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#28734d] focus:ring-2 focus:ring-[#28734d]/10"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || Boolean(socialLoading)}
              className="mt-2 h-11 w-full rounded-lg bg-[#245c40] px-4 text-sm font-semibold text-white transition hover:bg-[#19482f] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "অ্যাকাউন্ট তৈরি হচ্ছে..."
                : "অ্যাকাউন্ট তৈরি করুন"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-400">অথবা</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Google Login */}
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

            {/* GitHub Login */}
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

          {/* Sign In Link */}
          <p className="mt-5 text-center text-sm text-gray-600">
            ইতিমধ্যে অ্যাকাউন্ট আছে?
            <Link
              href="/signin"
              className="ml-1 font-semibold text-[#245c40] hover:underline"
            >
              সাইন ইন করুন
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

export default SignUpPage;
