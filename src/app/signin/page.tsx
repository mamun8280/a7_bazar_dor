"use client";

import React, { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const SignInPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    const form = e.currentTarget;
    const formData = new FormData(form);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      toast.error("ইমেইল এবং পাসওয়ার্ড দিন");
      return;
    }

    setLoading(true);

    const loadingToast = toast.loading("লগইন করা হচ্ছে...");

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        toast.update(loadingToast, {
          render: error.message || "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়",
          type: "error",
          isLoading: false,
          autoClose: 3500,
        });

        return;
      }

      if (data) {
        toast.update(loadingToast, {
          render: "✅ সফলভাবে লগইন হয়েছে!",
          type: "success",
          isLoading: false,
          autoClose: 1800,
        });

        setTimeout(() => {
          router.push("/");
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 via-base-100 to-base-300 px-4 py-10">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-2xl"
      >
        <fieldset className="fieldset bg-base-100 border border-base-300 rounded-3xl shadow-2xl p-7 sm:p-10">
          {/* Header */}
          <div className="text-center mb-7">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-700 text-2xl text-white shadow-lg">
              🔐
            </div>

            <h2 className="text-3xl font-bold text-base-content">
              সাইন ইন করুন
            </h2>

            <p className="mt-2 text-sm text-base-content/60">
              আপনার অ্যাকাউন্টে প্রবেশ করতে লগইন করুন
            </p>
          </div>

          {/* Email */}
          <label className="label font-medium">
            ইমেইল
          </label>

          <input
            name="email"
            type="email"
            className="input input-bordered w-full rounded-xl focus:outline-none focus:border-red-600"
            placeholder="আপনার ইমেইল লিখুন"
          />

          {/* Password */}
          <label className="label font-medium mt-4">
            পাসওয়ার্ড
          </label>

          <input
            name="password"
            type="password"
            className="input input-bordered w-full rounded-xl focus:outline-none focus:border-red-600"
            placeholder="••••••••"
          />

          {/* Forgot Password */}
          <div className="text-right mt-2">
            <Link
              href="/forgot-password"
              className="text-sm text-red-700 hover:underline"
            >
              পাসওয়ার্ড ভুলে গেছেন?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn w-full mt-6 rounded-xl border-0 bg-red-700 text-white text-base font-semibold hover:bg-red-800 hover:shadow-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "লগইন হচ্ছে..." : "সাইন ইন করুন"}
          </button>

          {/* Register */}
          <p className="text-center text-sm text-base-content/60 mt-5">
            নতুন ব্যবহারকারী?
            <Link
              href="/signup"
              className="ml-1 font-semibold text-red-700 hover:underline"
            >
              অ্যাকাউন্ট তৈরি করুন
            </Link>
          </p>
        </fieldset>
      </form>
    </div>
  );
};

export default SignInPage;