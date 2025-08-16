"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from 'next/navigation';

export default function DoctorDashboard() {
  const [showMenu, setShowMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeTab, setActiveTab] = useState("completed");
  const [checkedAppointments, setCheckedAppointments] = useState<string[]>([]);

  const videoTimes = ["09:00 AM", "09:15 AM", "09:30 AM", "10:45 AM"];
  const chatTimes = ["09:00 AM", "09:30 AM", "10:30 AM"];

  const toggleCheckbox = (key: string) => {
    setCheckedAppointments((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const markAllAppointmentsCompleted = () => {
    const allKeys = [
      ...videoTimes.map((t) => `video-${t}`),
      ...chatTimes.map((t) => `chat-${t}`),
    ];
    setCheckedAppointments(allKeys);

    toast.success(
      "🎉 All appointments for today are marked as completed. Have a great day, doctor!",
      {
        position: "bottom-center",
        duration: 4000,
        style: {
          background: "#0f766e",
          color: "#fff",
          borderRadius: "10px",
          fontSize: "14px",
        },
      }
    );

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const tabButtonStyle = (tab: string) =>
    `px-4 py-2 text-sm rounded-full font-medium ${
      activeTab === tab ? "bg-cyan-500 text-white" : "bg-gray-100 text-gray-600"
    }`;
    const router = useRouter();

  return (
    <main className="min-h-screen w-full bg-gray-100 flex justify-center">
      <Toaster />
      <div className="w-[390px] bg-white min-h-screen rounded-3xl shadow-xl overflow-hidden relative flex flex-col">
        {/* Cyan Header */}
        <div className="bg-cyan-400 rounded-b-3xl px-4 pt-4 pb-20 relative">
          <div className="w-24 h-5 bg-white rounded-b-full mx-auto absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <div className="flex justify-between items-center">
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={() => setShowMenu(!showMenu)}
            >
              <Image src="/nav.png" alt="Menu" width={24} height={24} />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Image
                src="/chat.png"
                alt="Notifications"
                width={24}
                height={24}
              />
            </motion.button>
          </div>

          {/* Dropdowns */}
          <AnimatePresence>
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-12 left-4 right-4 bg-white rounded-xl p-4 shadow-lg z-50"
              >
                <p className="text-black">Navigation Drawer (Add links here)</p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-12 right-4 w-64 bg-white rounded-xl p-4 shadow-lg z-50"
              >
                <p className="text-black">No new messages</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-2">
            <p className="text-white text-lg font-extrabold leading-snug mt-3">
              Welcome Back, Dr. Smith
            </p>
          </div>

          {/* Button Cards */}
          <div className="absolute left-4 right-4 top-24 bg-white rounded-2xl p-4 shadow-md">
            <div className="flex justify-around items-center gap-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                onClick={markAllAppointmentsCompleted}
                className="flex flex-col items-center justify-center bg-[#E0F7FA] rounded-xl p-3 w-32 h-24 shadow hover:shadow-lg"
              >
                <span className="text-[13px] font-medium text-center text-gray-800 font-semibold">
                  Mark All Appointment As Completed
                </span>
              </motion.button>

              <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onClick={() => router.push('/doctor/consultation/review')} // 👈 your target route
      className="flex flex-col items-center justify-center bg-[#E0F7FA] rounded-xl p-3 w-32 h-24 shadow hover:shadow-lg"
    >
      <span className="text-[13px] font-medium text-center text-gray-800 font-semibold">
        Review List Of Patient’s
      </span>
    </motion.button>
            </div>
          </div>
        </div>

        {/* Spacer */}
        <div className="h-14" />

        {/* Video Consultation */}
        <div className="mx-4 mt-6">
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold text-black">Video Consultation</p>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            {videoTimes.map((time, idx) => {
              const key = `video-${time}`;
              return (
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
                  <input
                    type="checkbox"
                    className="w-5 h-5 accent-green-600"
                    checked={checkedAppointments.includes(key)}
                    onChange={() => toggleCheckbox(key)}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Chat Consultation */}
        <div className="mx-4 mt-6 mb-20">
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold text-black">Chat Consultation</p>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            {chatTimes.map((time, idx) => {
              const key = `chat-${time}`;
              return (
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
                  <input
                    type="checkbox"
                    className="w-5 h-5 accent-green-600"
                    checked={checkedAppointments.includes(key)}
                    onChange={() => toggleCheckbox(key)}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[390px] z-50">
          <div className="bg-white rounded-t-2xl shadow-lg py-3 px-6 flex rounded-3xl shadow-xl overflow-hidden justify-between items-center">
            <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }}>
              <Link
                href="/doctor/dashboard"
                className="flex flex-col items-center text-gray-600 hover:text-blue-500"
              >
                <Image src="/home.png" width={28} height={28} alt="Home" />
                <span className="text-xs">Home</span>
              </Link>
            </motion.div>
            <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }}>
              <Link
                href="/doctor/appointment"
                className="flex flex-col items-center text-gray-600 hover:text-blue-500"
              >
                <Image
                  src="/schedule.png"
                  width={28}
                  height={28}
                  alt="Appointments"
                />
                <span className="text-xs">Appointments</span>
              </Link>
            </motion.div>
            <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }}>
              <Link
                href="/doctor/consultation"
                className="flex flex-col items-center text-gray-600 hover:text-blue-500"
              >
                <Image
                  src="/consult.png"
                  width={28}
                  height={28}
                  alt="Consult"
                />
                <span className="text-xs">Consult</span>
              </Link>
            </motion.div>
            <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }}>
              <Link
                href="/doctor/profile"
                className="flex flex-col items-center text-gray-600 hover:text-blue-500"
              >
                <Image
                  src="/profile.png"
                  width={28}
                  height={28}
                  alt="Profile"
                />
                <span className="text-xs">Profile</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
