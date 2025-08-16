"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";

export default function AppointmentHistory() {
  const [activeTab, setActiveTab] = useState<"Upcoming" | "Completed" | "Canceled">("Upcoming");
  const tabs = ["Upcoming", "Completed", "Canceled"];
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Example appointment data
  const appointments = {
    Upcoming: [],
    Completed: [
      {
        id: 2,
        name: "Dr. Divya Das",
        token: 12,
        time: "12:30 PM",
        payment: "Not paid",
        status: "Completed",
        img: "/fdr.png",
      },
    ],
    Canceled: [
      {
        id: 3,
        name: "Dr. Divya Das",
        token: 12,
        time: "12:30 PM",
        payment: "Not paid",
        status: "Canceled",
        reason: "You didn’t come for the appointment",
        img: "/fdr.png",
      },
    ],
  };

  // Filtered appointments
  const currentAppointments = appointments[activeTab].filter(appt =>
    appt.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="h-screen bg-gray-100 flex justify-center relative overflow-hidden">
      <div className="w-[390px] bg-white min-h-screen rounded-3xl shadow-xl overflow-hidden relative flex flex-col">
        
        {/* Cyan Header with curve */}
        <div className="bg-cyan-400 rounded-b-3xl px-4 pt-4 pb-20 relative font-semibold">
         <div className="w-24 h-5 bg-white rounded-b-full mx-auto absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 pt-4 relative">
          <p className="text-white text-xl font-extrabold leading-snug">
              My Appointments
            </p>
            <div className="flex items-center gap-3 text-black relative">
              {!searchOpen ? (
                <button onClick={() => setSearchOpen(true)}>
                  <FiSearch size={20} className="text-black" />
                </button>
              ) : (
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="border border-gray-300 rounded-lg px-2 py-1 text-sm outline-none text-black"
                />
              )}
              {/* 3 Dots Menu */}
              <div className="relative">
                <button onClick={() => setMenuOpen(prev => !prev)} className="text-black text-lg">
                  ⋯
                </button>
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                    <button
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        window.location.href = "/patient/profile";
                        setMenuOpen(false);
                      }}
                    >
                      Profile
                    </button>
                    <button
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        window.location.href = "/patient/H&S";
                        setMenuOpen(false);
                      }}
                    >
                      Help & Support
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          

          {/* Tabs */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[90%] bg-white rounded-2xl shadow-md flex justify-around py-2 px-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as typeof activeTab)}
                className={`flex-1 mx-1 py-2 text-sm font-medium rounded-xl transition ${
                  activeTab === tab
                    ? "bg-cyan-500 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content (scrollable only inside this div) */}
        <div className="flex-1 px-4 pt-10 pb-28 overflow-y-auto hide-scrollbar">
          {currentAppointments.length > 0 ? (
            currentAppointments.map((appt) => (
              <div
                key={appt.id}
                className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl p-3 mb-4 shadow-sm"
              >
                <Image
                  src={appt.img}
                  alt={appt.name}
                  width={64}
                  height={64}
                  className="rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h2 className="text-sm font-semibold text-gray-800">{appt.name}</h2>
                  <p className="text-xs text-gray-500">Token no - {appt.token}</p>
                  <p className="text-xs text-gray-500">
                    Today |{" "}
                    <span className="text-cyan-500 font-medium">{appt.time}</span>
                  </p>
                  <p className="text-xs text-gray-500">
                    Payment | <span className="text-gray-700">{appt.payment}</span>
                  </p>

                  {/* Status */}
                  <p
                    className={`text-xs mt-1 ${
                      appt.status === "Completed"
                        ? "text-green-500"
                        : appt.status === "Canceled"
                        ? "text-red-500"
                        : "text-gray-600"
                    }`}
                  >
                    {appt.status}
                    {appt.reason && (
                      <span className="text-gray-500 ml-1">{`| ${appt.reason}`}</span>
                    )}
                  </p>

                  {/* Action button */}
                  <button
                    onClick={() => {
                      if (appt.status === "Canceled") {
                        window.location.href = "/patient/reschedule";
                      } else if (appt.status === "Completed") {
                        window.location.href = "/patient/book";
                      } else {
                        alert("Joining consultation...");
                      }
                    }}
                    className={`mt-2 px-4 py-1 border rounded-lg text-xs font-medium w-full
                      ${
                        appt.status === "Canceled"
                          ? "border-cyan-500 text-cyan-500 hover:bg-cyan-50"
                          : appt.status === "Completed"
                          ? "border-cyan-500 text-cyan-500 hover:bg-cyan-50"
                          : "bg-cyan-500 text-white hover:bg-cyan-600 border-transparent"
                      }
                    `}
                  >
                    {appt.status === "Completed"
                      ? "Book Again"
                      : appt.status === "Canceled"
                      ? "Reschedule Appointment"
                      : "Join Now"}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <EmptyState type={activeTab} />
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[390px] z-50">
          <div className="bg-white rounded-t-2xl shadow-lg py-3 px-6 flex rounded-3xl shadow-xl overflow-hidden justify-between items-center">
            <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }}>
              <Link href="/patient/home" className="flex flex-col items-center text-gray-600 hover:text-cyan-500">
                <Image src="/find.png" width={28} height={28} alt="Home" />
                <span className="text-xs">Find a Doctor</span>
              </Link>
            </motion.div>
            <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }}>
              <Link href="/patient/appointment" className="flex flex-col items-center text-gray-600 hover:text-cyan-500">
                <Image src="/schedule.png" width={28} height={28} alt="Appointments" />
                <span className="text-xs">Appointments</span>
              </Link>
            </motion.div>
            <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }}>
              <Link href="/patient/record" className="flex flex-col items-center text-gray-600 hover:text-cyan-500">
                <Image src="/record.png" width={28} height={28} alt="Consult" />
                <span className="text-xs">Record</span>
              </Link>
            </motion.div>
            <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }}>
              <Link href="/patient/profile" className="flex flex-col items-center text-gray-600 hover:text-cyan-500">
                <Image src="/profile.png" width={28} height={28} alt="Profile" />
                <span className="text-xs">Profile</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Hide scrollbar */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </main>
  );
}

function EmptyState({ type }: { type: string }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-12 text-center h-full">
      <Image
        src="/appoi.png"
        alt="No appointments"
        width={140}
        height={140}
        className="mb-4"
      />
      <h2 className="text-base font-semibold text-gray-800">
        You don’t have an appointment yet
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Please click the button below to book an appointment.
      </p>

      {type === "Upcoming" && (
        <button
          className="mt-6 w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-xl text-sm shadow-md"
          onClick={() => {
            window.location.href = "/patient/book";
          }}
        >
          Book appointment
        </button>
      )}
    </div>
  );
}
