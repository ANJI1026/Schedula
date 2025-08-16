"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CancelAppointment() {
  const [gender, setGender] = useState("Male");
  const [age, setAge] = useState(22);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  return (
    <main className="min-h-screen flex justify-center bg-cyan-50">
      <div className="w-[390px] bg-white min-h-screen rounded-3xl shadow-xl overflow-hidden relative flex flex-col">
        {/* Header */}
        <div className="bg-cyan-400 rounded-b-3xl px-4 pt-4 pb-20 relative font-semibold">
          <div className="w-24 h-5 bg-white rounded-b-full mx-auto absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <div className="flex items-center pt-6">
            <button
              className="text-white-600 text-xl mr-2"
              onClick={() => router.back()}
            >
              &larr;
            </button>
            <h1 className="text-white text-xl font-extrabold leading-snug">
              Cancel Appointment
            </h1>
          </div>

          {/* Doctor Card */}
          <div className="absolute left-4 right-4 top-[80px] bg-white rounded-2xl p-4 shadow-lg border border-cyan-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-cyan-800">
                  Dr. Kumar Das
                </h2>
                <p className="text-xs text-gray-400">
                  Cardiologist - Dombivli
                </p>
                <p className="text-xs text-gray-400">
                  MBBS, MD (Internal Medicine)
                </p>
              </div>
              <Image
                src="/dr.png"
                alt="Doctor"
                width={60}
                height={60}
                className="rounded-xl object-cover shadow-md"
              />
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 px-4 pt-[70px] pb-4">
          {/* Consulting time */}
          <p className="text-sm font-semibold text-cyan-800 mb-2">
            Consulting time
          </p>
          <div className="flex items-center border border-cyan-200 rounded-lg px-3 py-2 mb-4 bg-white">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="MMMM d, yyyy"
              className="w-full text-sm text-cyan-800 font-medium focus:outline-none"
            />
          </div>

          {/* Patient Details */}
          <p className="text-sm font-semibold text-cyan-800 mb-3">
            Patient Details
          </p>

          {/* Full name */}
          <div className="mb-4">
            <label className="text-xs font-medium text-cyan-700">
              Full name
            </label>
            <input
              type="text"
              defaultValue="Sudharkar Murti"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1 text-sm bg-gray-50 text-cyan-900"
              readOnly
            />
          </div>

          {/* Age & Gender */}
          <div className="flex gap-4 mb-4">
            {/* Age Stepper */}
            <div className="flex-1">
              <label className="text-xs font-medium text-cyan-700">Age</label>
              <div className="flex items-center justify-between border border-gray-200 rounded-lg px-2 py-2 mt-1 bg-white">
                <button
                  onClick={() => setAge((prev) => Math.max(1, prev - 1))}
                  className="px-3 py-1 text-cyan-500 text-lg font-bold"
                >
                  −
                </button>
                <span className="text-cyan-800 font-medium">{age}</span>
                <button
                  onClick={() => setAge((prev) => Math.min(120, prev + 1))}
                  className="px-3 py-1 text-cyan-500 text-lg font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Gender */}
            <div className="flex-1">
              <label className="text-xs font-medium text-cyan-700">Gender</label>
              <div className="flex gap-2 mt-1">
                {["Male", "Female", "Other"].map((g) => (
                  <button
                    key={g}
                    onClick={() => setGender(g)}
                    className={`flex-1 px-3 py-2 text-sm rounded-lg border ${
                      gender === g
                        ? "bg-gray-500 text-white border-gray-500"
                        : "bg-gray-50 text-cyan-800 border-gray-200"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Problem */}
          <div className="mb-4">
            <label className="text-xs font-medium text-cyan-700">
              Write your problem
            </label>
            <textarea
              className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1 text-sm bg-gray-50 text-cyan-900"
              rows={3}
              defaultValue="Having a headache from last 3 days"
              readOnly
            />
          </div>

          {/* Cancel reason */}
          <div className="mb-6">
            <label className="text-xs font-medium text-red-500">
              Please specify the reason for cancelling
            </label>
            <textarea
              className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1 text-sm placeholder-gray-250 text-gray-900 bg-white"
              placeholder="Please write a reason for cancelling the appointment"
              rows={2}
            />
          </div>

          {/* Cancel button */}
          <button
            onClick={() => setShowModal(true)}
            className="w-full bg-cyan-400 hover:bg-red-600 text-white py-3 rounded-lg text-sm font-semibold"
          >
            Cancel
          </button>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-80 rounded-2xl p-6 text-center shadow-lg animate-fadeIn">
              <Image
                src="/cancel.png"
                alt="Cancelled"
                width={120}
                height={120}
                className="mx-auto mb-4"
              />
              <h2 className="text-lg font-semibold text-cyan-800 mb-2">
                Appointment Cancelled Successfully
              </h2>
              <p className="text-sm text-cyan-600 mb-4">
                If you want to book again then please go to booking section
                again. Thank you.
              </p>
              <button
                onClick={() => router.push("/patient/home")}
                className="bg-cyan-500 text-white px-6 py-2 rounded-lg hover:bg-cyan-600 transition"
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

