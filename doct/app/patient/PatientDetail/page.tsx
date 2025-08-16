"use client";

import React, { useState } from "react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

type Gender = "Male" | "Female" | "Other";

export default function PatientDetailsOptional() {
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState<string>("22");
  const [gender, setGender] = useState<Gender>("Male");
  const [problem, setProblem] = useState("");
  const [relation, setRelation] = useState("");
  const [mobile, setMobile] = useState("");

  const [showSuccess, setShowSuccess] = useState(false);
  const [showAppointmentSuccess, setShowAppointmentSuccess] = useState(false);
  const router = useRouter();

  const onMakePayment = () => {
    setShowSuccess(true);
  };

  const onAddDetails = () => {
    if (!fullName || !age || !problem || !relation || !mobile) {
      toast.error("Enter your details first");
      return;
    }
    toast.success("Details added successfully");
  };

  return (
    <main className="min-h-screen bg-gray-200 flex justify-center py-4 relative">
      <Toaster position="top-center" />

      {/* Main content */}
      <div className="w-[390px] bg-white min-h-screen rounded-3xl shadow-xl overflow-hidden relative flex flex-col">
        {/* Notch + Header */}
        <div className="bg-cyan-500 rounded-b-[90px] px-6 pt-4 pb-5 relative shadow-lg flex items-center">
          <div className="px-4 pt-6 pb-4 flex items-center gap-3">
          <button
              className="text-white-600 text-xl mr-2"
              onClick={() => router.back()}
            >
              &larr;
            </button>
            <h1 className="text-white text-xl font-extrabold leading-snug">
              Patient Details 
            </h1>
          </div>
        </div>

        <div className="h-[14px] w-full bg-white" />

        {/* Form */}
        <form
          className="px-4 pb-6 pt-4 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            onAddDetails();
          }}
        >
          <h2 className="text-[14px] font-semibold text-gray-800">
            Patient Details
          </h2>

          {/* Full name */}
          <div className="space-y-1">
            <label className="text-sm text-gray-600">Full name</label>
            <input
              type="text"
              placeholder="Patient Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-sm text-black placeholder-gray-400 outline-none focus:bg-white focus:border-cyan-400 transition"
            />
          </div>

          {/* Age + Gender */}
          <div className="grid grid-cols-5 gap-2 items-start">
            <div className="col-span-2 space-y-1">
              <label className="text-sm text-gray-600">Age</label>
              <input
                inputMode="numeric"
                pattern="[0-9]*"
                value={age}
                onChange={(e) => {
                  const v = e.target.value.replace(/\D/g, "");
                  setAge(v);
                }}
                className="w-full text-center rounded-xl border border-gray-200 bg-gray-100 px-0 py-3 text-sm text-black placeholder-gray-400 outline-none focus:bg-white focus:border-cyan-400 transition"
                placeholder="22"
              />
            </div>

            <div className="col-span-3 space-y-1">
              <label className="text-sm text-gray-600">Gender</label>
              <div className="flex items-center gap-2">
                <GenderPill
                  active={gender === "Male"}
                  onClick={() => setGender("Male")}
                >
                  M
                </GenderPill>
                <GenderPill
                  active={gender === "Female"}
                  onClick={() => setGender("Female")}
                >
                  F
                </GenderPill>
                <GenderPill
                  active={gender === "Other"}
                  onClick={() => setGender("Other")}
                >
                  Other
                </GenderPill>
              </div>
            </div>
          </div>

          {/* Problem */}
          <div className="space-y-1">
            <label className="text-sm text-gray-600">Write your problem</label>
            <textarea
              rows={4}
              placeholder="write your problem"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-sm text-black placeholder-gray-400 outline-none focus:bg-white focus:border-cyan-400 transition resize-none"
            />
          </div>

          {/* Relation */}
          <div className="space-y-1">
            <label className="text-sm text-gray-600">Relation with Patient</label>
            <input
              type="text"
              placeholder="Brother/sister/mother"
              value={relation}
              onChange={(e) => setRelation(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-sm text-black placeholder-gray-400 outline-none focus:bg-white focus:border-cyan-400 transition"
            />
          </div>

          {/* Mobile */}
          <div className="space-y-1">
            <label className="text-sm text-gray-600">Patient Mobile Number</label>
            <input
              inputMode="tel"
              placeholder="Mobile number"
              value={mobile}
              onChange={(e) =>
                setMobile(e.target.value.replace(/[^\d+]/g, ""))
              }
              className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-sm text-black placeholder-gray-400 outline-none focus:bg-white focus:border-cyan-400 transition"
            />
          </div>

          {/* Buttons */}
          <div className="pt-2 space-y-3">
            <button
              type="button"
              onClick={onMakePayment}
              className="w-full rounded-xl border border-cyan-500 text-cyan-600 py-3 text-[15px] font-semibold bg-white hover:bg-cyan-50 active:scale-[.99] transition"
            >
              Make Payment
            </button>

            <button
              type="submit"
              className="w-full rounded-xl bg-cyan-500 text-white py-3 text-[15px] font-semibold shadow-sm hover:bg-cyan-600 active:scale-[.99] transition"
            >
              Add Patient Details
            </button>
          </div>
        </form>
      </div>

      {/* Payment Success Modal */}
      {showSuccess && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-[300px] rounded-2xl p-6 text-center shadow-lg relative">
            <Image
              src="/payment.png"
              alt="Success"
              width={80}
              height={80}
              className="mx-auto mb-3"
            />
            <h2 className="text-lg font-semibold text-gray-800">
              Payment Successful!
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Your payment has been processed successfully.
            </p>
            <button
              onClick={() => {
                setShowSuccess(false);
                setShowAppointmentSuccess(true);
              }}
              className="mt-5 bg-cyan-500 text-white px-6 py-2 rounded-xl hover:bg-cyan-600"
            >
              Okay
            </button>
          </div>
        </div>
      )}

      {/* Appointment Success Modal */}
      {showAppointmentSuccess && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-[300px] rounded-2xl p-6 text-center shadow-lg relative">
            <Image
              src="/success.png"
              alt="Success"
              width={80}
              height={80}
              className="mx-auto mb-3"
            />
            <h2 className="text-lg font-semibold text-gray-800">
              Appointment Successful!
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Your appointment has been booked successfully.
            </p>
            <button
              onClick={() => setShowAppointmentSuccess(false)}
              className="mt-5 bg-cyan-500 text-white px-6 py-2 rounded-xl hover:bg-cyan-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

/** Gender Toggle Pill */
function GenderPill({
  active,
  children,
  onClick,
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-xl text-sm transition border ${
        active
          ? "bg-cyan-500 text-white border-cyan-500 shadow-sm"
          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
      }`}
    >
      {children}
    </button>
  );
}

