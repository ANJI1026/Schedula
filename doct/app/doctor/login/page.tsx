"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Field, Form } from "formik";
import Image from "next/image";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const [showForgot, setShowForgot] = useState(false);
  const router = useRouter();

  const allowedEmail = "test@gmail.com";

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-cyan-100 to-blue-100 flex justify-center items-center px-4">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-cyan-400 px-6 pt-8 pb-16 rounded-b-3xl relative">
          <div className="w-20 h-1 bg-white opacity-40 rounded-full mx-auto absolute top-2 left-1/2 -translate-x-1/2" />
          <div className="flex justify-center mb-3">
            <Image
              src="/dr.png"
              alt="Doctor Illustration"
              width={100}
              height={100}
              className="rounded-full border-4 border-white shadow-md"
            />
          </div>
          <h2 className="text-center text-white text-2xl font-bold mb-1">
            Welcome Back
          </h2>
          <p className="text-center text-white text-sm">
            Log in to <span className="font-semibold">Shedula</span>
          </p>
        </div>

        {/* Login Form */}
        <div className="px-6 py-8">
          <Formik
            initialValues={{ identifier: "", remember: true }}
            onSubmit={(values) => {
              if (!values.identifier) {
                toast.error("Please enter your email");
                return;
              }
              if (values.identifier !== allowedEmail) {
                toast.error("Invalid email, please use test@gmail.com");
                return;
              }
              toast.success("Login successful!");
              router.push("/doctor/dashboard");
            }}
          >
            {() => (
              <Form className="space-y-5">
                <div>
                  <label className="text-gray-700 font-medium text-sm">
                    Email
                  </label>
                  <Field
                    name="identifier"
                    type="email"
                    placeholder="Enter your email"
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-black"
                  />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center text-gray-600">
                    <Field name="remember" type="checkbox" className="mr-2" />
                    Remember Me
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowForgot(true)}
                    className="text-rose-500 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full bg-cyan-500 hover:bg-cyan-600 transition-all text-white py-3 rounded-lg font-semibold shadow-md"
                >
                  Continue
                </button>
              </Form>
            )}
          </Formik>

          <div className="flex items-center gap-2 my-5">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="text-sm text-gray-400">or login with</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          <button className="w-full flex items-center justify-center border border-gray-300 hover:border-gray-400 transition py-3 rounded-lg text-gray-700 font-medium shadow-sm">
            <Image
              src="/google.png"
              alt="Google"
              width={20}
              height={20}
              className="mr-2"
            />
            Continue with Google
          </button>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don’t have an account?{" "}
            <Link
              href="/register"
              className="text-cyan-500 font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgot && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-[320px] rounded-2xl p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-gray-800 text-center mb-3">
              Reset Password
            </h2>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-black"
            />
            <button
              onClick={() => {
                toast.success("Password reset successful!");
                setShowForgot(false);
              }}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded-lg"
            >
              Reset Password
            </button>
            <button
              onClick={() => setShowForgot(false)}
              className="w-full mt-3 text-gray-500 hover:underline text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
