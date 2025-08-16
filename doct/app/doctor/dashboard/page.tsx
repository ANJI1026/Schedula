"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function DoctorDashboard() {
  const [showMenu, setShowMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const router = useRouter();

  return (
    <main className="min-h-screen w-full bg-gray-100 flex justify-center">
      <div className="w-[390px] bg-white min-h-screen rounded-3xl shadow-xl overflow-hidden relative flex flex-col">
        {/* Cyan Background Header */}
        <div className="bg-cyan-400 rounded-b-3xl px-4 pt-4 pb-20 relative">
          <div className="w-24 h-5 bg-white rounded-b-full mx-auto absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <div className="flex justify-between items-center">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowMenu(!showMenu)}
            >
              <Image src="/nav.png" alt="Menu" width={24} height={24} />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Image
                src="/bell.png"
                alt="Notifications"
                width={24}
                height={24}
              />
            </motion.button>
          </div>

          {/* Animated Dropdown Menus */}
          <AnimatePresence>
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
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
                transition={{ duration: 0.3 }}
                className="absolute top-12 right-4 w-64 bg-white rounded-xl p-4 shadow-lg z-50"
              >
                <p className="text-black">No new notifications</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-2">
            <p className="text-white text-lg font-extrabold leading-snug mt-3">
              Welcome Back, Dr. Smith
            </p>
          </div>

          <div className="absolute left-4 right-4 top-24 bg-white rounded-2xl p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-black font-semibold text-lg">Dr. Smith</p>
                <p className="text-sm text-gray-500 -mt-1">Cardiologist</p>
              </div>
              <Image
                src="/dr.png"
                alt="Doctor"
                width={60}
                height={60}
                className="rounded-xl object-cover"
              />
            </div>
            <button className="bg-gray-100 text-xs text-black px-2 py-1 mt-1 rounded-md">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Spacer */}
        <div className="h-20" />

        {/* Stats Section */}
        <div className="pt-4 flex justify-between px-4">
          {[
            { count: 220, label: "Total Appointments" },
            { count: 20, label: "Patients This Week" },
            { count: 8, label: "Upcoming Bookings" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
              className="bg-cyan-400 text-white text-center rounded-lg flex-1 mx-1 py-3 shadow-sm cursor-pointer"
            >
              <p className="font-bold text-xl">{stat.count}</p>
              <p className="text-xs">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Today's Appointment */}
        <div className="mx-4 mt-6">
          <div className="flex justify-between items-center mb-2 ">
            <p className="font-semibold text-black">Today's Appointment</p>
            <Link href="/doctor/appointment">
              <Image
                src="/arrow.png"
                width={20}
                height={20}
                alt="View More"
                className="cursor-pointer"
              />
            </Link>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-md ">
            {["09:00 AM", "09:15 AM", "09:30 AM", "10:45 AM"].map(
              (time, idx) => (
                <div
                  key={idx}
                  className="flex justify-between py-1 border-b last:border-b-0"
                >
                  <p className="text-sm text-black">{time}</p>
                  <p className="text-sm text-black">Back, Dr. Smith</p>
                </div>
              )
            )}
          </div>
        </div>

        {/* Online Consultation */}
        <div className="mx-4 mt-6 mb-20">
          <Link
            href="/doctor/consultation"
            className="flex justify-between items-center mb-2"
          >
            <p className="font-semibold text-black">Online Consultation</p>
            <img
              src="/arrow.png"
              width={20}
              height={20}
              alt="View More"
              className="cursor-pointer"
            />
          </Link>

          <div className="bg-white rounded-lg p-3 shadow-md">
            {["09:00 AM", "09:30 AM"].map((time, idx) => (
              <div
                key={idx}
                className="flex justify-between py-1 border-b last:border-b-0"
              >
                <p className="text-sm text-black">{time}</p>
                <p className="text-sm text-black">Back, Dr. Smith</p>
              </div>
            ))}
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
