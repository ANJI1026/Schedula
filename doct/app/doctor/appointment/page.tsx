"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";

export default function DoctorDashboard() {
  const [showMenu, setShowMenu] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [appointmentStatuses, setAppointmentStatuses] = useState<{
    [time: string]: string;
  }>({});
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const router = useRouter();

  // Appointments by date
  const appointmentDates: { [key: string]: string[] } = {
    "2025-08-16": ["09:00 AM", "09:15 AM", "09:30 AM", "10:45 AM", "11:30 AM"],
    "2025-08-17": ["10:00 AM", "11:30 AM", "12:00 PM", "01:15 PM"],
  };

  const allAppointments = Object.values(appointmentDates).flat();

  const handleStatusChange = (value: string, time: string) => {
    setAppointmentStatuses((prev) => ({ ...prev, [time]: value }));
    setStatusMessage(`Marked ${time} as ${value}`);
    setTimeout(() => setStatusMessage(""), 3000);
  };

  // Filter appointments based on tab and/or selected date
  const filteredAppointments = allAppointments.filter((time) => {
    const status = appointmentStatuses[time]?.toLowerCase();
    if (!activeTab) return true;
    return status === activeTab;
  });

  const filteredByDate = selectedDate
    ? appointmentDates[format(selectedDate, "yyyy-MM-dd")] || []
    : filteredAppointments;

  const tabButtonStyle = (tab: string) =>
    `px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
      activeTab === tab
        ? "bg-sky-500 text-white"
        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
    }`;

  return (
    <main className="min-h-screen w-full bg-gray-100 flex justify-center font-sans">
      <div className="w-[390px] bg-white min-h-screen rounded-3xl shadow-xl overflow-hidden relative flex flex-col">
        {/* ✅ Toast */}
        {statusMessage && (
          <div className="fixed bottom-24 right-4 z-50">
            <div className="flex items-center gap-2 bg-white border-l-4 border-blue-500 shadow-lg rounded-lg px-4 py-3 text-sm text-gray-700 max-w-xs font-medium">
              <div className="bg-blue-100 p-1 rounded-full">
                <span className="text-blue-600 text-lg">✔️</span>
              </div>
              <span>{statusMessage}</span>
              <button
                onClick={() => setStatusMessage("")}
                className="ml-auto text-gray-400 hover:text-gray-600"
                aria-label="Close notification"
              >
                ✖
              </button>
            </div>
          </div>
        )}

        {/* 🔷 Header */}
        <div className="bg-cyan-400 rounded-b-3xl px-4 pt-4 pb-20 relative font-semibold">
          <div className="w-24 h-5 bg-white rounded-b-full mx-auto absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <div className="flex justify-between items-center">
            {/* Menu Icon with animation */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowMenu(!showMenu)}
              aria-label="Toggle menu"
            >
              <Image src="/nav.png" alt="Menu" width={24} height={24} />
            </motion.button>

            {/* Prescription Icon with animation */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => router.push("/doctor/appointment/prescription")}
              aria-label="Go to prescriptions"
            >
              <Image
                src="/prescription.png"
                alt="Prescription"
                width={26}
                height={26}
              />
            </motion.button>
          </div>

          {/* Menu animation */}
          <AnimatePresence>
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-12 left-4 right-4 bg-white rounded-xl p-4 shadow-lg z-50"
              >
                <p className="text-black font-medium">Navigation Drawer</p>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-white text-lg font-extrabold leading-snug mt-3">
            My Appointments
          </p>

          {/* Tabs */}
          <div className="absolute left-4 right-4 top-28 bg-white rounded-2xl p-3 shadow-md font-semibold">
            <div className="flex space-x-1 items-center px-1 py-1 ">
              {activeTab && (
                <button
                  onClick={() => setActiveTab(null)}
                  className="text-gray-500 text-lg mr-2 font-semibold"
                >
                  ←
                </button>
              )}
              <button
                onClick={() => setActiveTab("completed")}
                className={tabButtonStyle("completed")}
              >
                Completed
              </button>
              <button
                onClick={() => setActiveTab("rescheduled")}
                className={tabButtonStyle("rescheduled")}
              >
                Reschedule
              </button>
              <button
                onClick={() => setActiveTab("cancelled")}
                className={tabButtonStyle("cancelled")}
              >
                Cancelled
              </button>
            </div>
          </div>
        </div>

        <div className="h-4" />

        {/* Calendar + Appointments */}
        <div className="mx-4 mt-4 mb-20 font-medium relative">
          <div className="flex items-center justify-between mb-2">
            <p className="text-black text-lg font-semibold">
              {selectedDate
                ? `Appointments on ${format(selectedDate, "dd MMM yyyy")}`
                : "All Appointments"}
            </p>
            <button
              onClick={() => setShowCalendar((prev) => !prev)}
              className="text-cyan-600 hover:text-cyan-800 text-xl"
            >
              📅
            </button>
          </div>

          {/* Calendar Dropdown */}
          {showCalendar && (
            <div className="absolute z-50">
              <Calendar
                onChange={(date) => {
                  setSelectedDate(date as Date);
                  setShowCalendar(false);
                }}
                value={selectedDate || new Date()}
                tileClassName={({ date }) => {
                  const key = format(date, "yyyy-MM-dd");
                  return appointmentDates[key]?.length
                    ? "bg-cyan-200 rounded-full"
                    : "";
                }}
              />
            </div>
          )}

          {/* Appointment List */}
          <div className="bg-white rounded-lg p-3 shadow-sm max-h-96 overflow-y-auto hide-scrollbar mt-2">
            {filteredByDate.length > 0 ? (
              filteredByDate.map((time, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center py-2 border-b last:border-b-0"
                >
                  <div>
                    <p className="text-sm text-black font-semibold">{time}</p>
                    <p className="text-xs text-gray-500 font-normal">
                      Back, Dr. Smith
                    </p>
                  </div>
                  <select
                    className="text-xs border border-gray-500 text-gray-600 rounded px-2 py-1 bg-white focus:outline-none"
                    value={appointmentStatuses[time] || ""}
                    onChange={(e) =>
                      handleStatusChange(e.target.value, time)
                    }
                  >
                    <option value="" disabled>
                      Mark
                    </option>
                    <option value="Completed">✅ Completed</option>
                    <option value="Cancelled">❌ Cancelled</option>
                    <option value="Rescheduled">🕒 Rescheduled</option>
                  </select>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400 text-center font-normal">
                No appointments
              </p>
            )}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[390px] z-50">
          <div className="bg-white rounded-t-2xl shadow-lg py-3 px-6 flex rounded-3xl shadow-xl overflow-hidden justify-between items-center">
            {[
              { href: "/doctor/dashboard", label: "Home", src: "/home.png" },
              {
                href: "/doctor/appointment",
                label: "Appointments",
                src: "/schedule.png",
              },
              { href: "/doctor/consultation", label: "Consult", src: "/consult.png" },
              { href: "/doctor/profile", label: "Profile", src: "/profile.png" },
            ].map((nav, idx) => (
              <motion.div
                key={idx}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
              >
                <Link
                  href={nav.href}
                  className="flex flex-col items-center text-gray-600 hover:text-blue-500"
                >
                  <Image src={nav.src} width={28} height={28} alt={nav.label} />
                  <span className="text-xs">{nav.label}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );

  function capitalizeFirst(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
