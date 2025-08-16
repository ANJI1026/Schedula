"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function BookAppointmentPage() {
  const router = useRouter();
  const [selectedSlot, setSelectedSlot] = useState({
    date: "10 Oct, 2023",
    time: "11:30 AM",
  });
  

  return (
    <main className="min-h-screen bg-gray-50 flex justify-center ">
      <div className="w-[390px] bg-white min-h-screen rounded-3xl shadow-xl overflow-hidden relative flex flex-col">
        {/* Header */}
        <div className="bg-cyan-400 rounded-b-3xl px-4 pt-4 pb-20 relative font-semibold">
          {/* notch effect */}
          <div className="w-24 h-5 bg-white rounded-b-full mx-auto absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <div className="flex items-center gap-3">
          <button
              onClick={() => router.back()}
              className="text-xl font-bold"
            >
              &larr;
            </button>
            <h1 className="text-white text-lg font-semibold">
              Book Appointment
            </h1>
          </div>

          {/* Doctor Card */}
          <div className="absolute left-4 right-4 top-20 bg-white rounded-2xl p-4 shadow-md">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <p className="text-black font-bold text-lg">Dr. Kumar Das</p>
                <p className="text-xs text-gray-500 -mt-1">Ophthalmologist</p>
                <p className="text-sm text-cyan-500 mt-2 font-medium">
                  MBBS, MS (Surgeon)
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Fellow of Sanskara netralaya, Chennai
                </p>
              </div>
              <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src="/dr.png"
                  alt="Doctor"
                  width={80}
                  height={80}
                  className="object-cover"
                />
              </div>
            </div>
            <Link href="/patient/drDetail">
              <button className="mt-3 bg-gray-100 text-xs text-gray-800 px-3 py-1 rounded-md">
                View Profile
              </button>
            </Link>
          </div>
        </div>

        {/* Body */}
        <div className="pt-32 pb-6 px-4">
          {/* Speciality Chips */}
          <section>
            <h3 className="text-sm text-gray-700 font-semibold mb-2">
              Speciality
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Cataract specialist",
                "Eye diabetes",
                "Conjunctivitis",
                "Pre cataract",
                "Foreign body",
                "Eye check up",
                "Refraction",
              ].map((s, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1 rounded-full border border-gray-200 bg-white text-gray-700"
                >
                  {s}
                </span>
              ))}
            </div>
          </section>

          {/* About Doctor */}
          <section className="mt-5">
            <h3 className="text-sm text-gray-700 font-semibold mb-2">
              About Doctor
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              15+ years of experience in all aspects of ophthalmology, including
              non-invasive and interventional procedures.
            </p>
          </section>

          {/* Availability */}
          <section className="mt-5">
            <h3 className="text-sm text-gray-700 font-semibold mb-2">
              Availability For Consulting
            </h3>
            <div className="text-sm text-gray-500 space-y-1">
              <p>Monday to Friday | 10 PM to 1 PM</p>
              <p>Saturday | 2 PM to 5 PM</p>
            </div>
          </section>

          {/* Earliest Appointment Card */}
          <div className="mt-6">
            <div className="bg-white rounded-lg p-3 shadow-sm flex items-center justify-between border">
              <div>
                <p className="text-xs text-gray-500">
                  Earliest Available Appointment
                </p>
                <p className="text-sm text-gray-700 font-medium mt-1">
                  {selectedSlot.date} | {selectedSlot.time}
                </p>
              </div>
              <button
      onClick={() => router.push("/patient/book2")}
      className="inline-flex items-center gap-2 px-3 py-2 border rounded-full text-sm"
    >
      <Image src="/arrow.png" alt=">" width={14} height={14} />
    </button>
            </div>
          </div>

          {/* Book Button */}
          <div className="mt-6 pb-6 px-2">
            <button
              onClick={() =>
                router.push(
                  `/patient/book2?date=${encodeURIComponent(
                    selectedSlot.date
                  )}&time=${encodeURIComponent(selectedSlot.time)}`
                )
              }
              className="w-full bg-cyan-400 text-white py-3 rounded-xl font-semibold shadow-md"
            >
              Book appointment
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

