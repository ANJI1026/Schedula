"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function DoctorDashboard() {
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  const fields = [
    { label: "Full Name", value: "Dr. Smith" },
    { label: "Specialization", value: "Cardiology" },
    { label: "Degree", value: "MBBS, MD" },
    { label: "Phone Number", value: "+91-8989263588" },
    { label: "Email", value: "dr.smithjohn@gmail.com" },
    { label: "Experience", value: "10 Years" },
    {
      label: "About",
      value: "Passionate cardiologist with a decade of experience.",
    },
    { label: "Clinic Address", value: "8596, Noida, India" },
  ];

  return (
    <main className="min-h-screen w-full bg-gray-100 flex justify-center">
      <div className="w-[390px] bg-white min-h-screen rounded-3xl shadow-xl overflow-hidden relative flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-cyan-400 rounded-b-3xl px-4 pt-6 pb-20 relative shadow-lg">
          <div className="w-24 h-5 bg-white rounded-b-full mx-auto absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <div className="flex justify-between items-center">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowMenu(!showMenu)}
            >
              <Image src="/nav.png" alt="Menu" width={24} height={24} />
            </motion.button>
          </div>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-12 left-4 right-4 bg-white rounded-xl p-4 shadow-lg z-50"
              >
                <p className="text-black">Navigation Drawer (Add links here)</p>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="mt-2">
            <p className="text-white text-lg font-extrabold leading-snug mt-3">
              Your Profile
            </p>
          </div>

          {/* Profile Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute left-4 right-4 top-28 bg-white rounded-2xl p-4 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-black font-semibold text-lg">Dr. Smith</p>
                <div className="space-y-1">
                  <p className="text-md text-gray-900 -mt-1">Cardiologist</p>
                  <p className="text-sm text-gray-500 -mt-1">
                    8596, Noida India
                  </p>
                </div>
              </div>
              <Image
                src="/dr.png"
                alt="Doctor"
                width={60}
                height={60}
                className="rounded-xl object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* Spacer between cards */}
        <div className="relative mt-20" />

        {/* Scrollable Fields Card */}
        <div className="relative px-4 pb-36 overflow-y-auto scrollbar-hide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-md p-4 pt-8 space-y-4"
          >
            {fields.map((field, index) => (
              <div
                key={index}
                onClick={() => router.push("/doctor/profile/editprofile")}
                className="border-b pb-2 flex justify-between items-start cursor-pointer hover:bg-gray-50 rounded-md px-1 transition"
                title={`Edit ${field.label}`}
              >
                <p className="text-sm text-gray-500">{field.label}</p>
                <p className="text-sm font-medium text-gray-800 text-right">
                  {field.value}
                </p>
              </div>
            ))}
          </motion.div>
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
