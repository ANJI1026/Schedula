'use client';

import {
  FaBell,
  FaQuestionCircle,
  FaUserFriends,
  FaSignOutAlt,
  FaUserEdit,
  FaUser,
  FaChevronRight,
  FaSave,
} from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function ProfilePage() {
  const router = useRouter();

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("Ravi Kumar");
  const [email, setEmail] = useState("youremail@gmail.com");

  const handleLogout = () => {
    router.push('/patient/login'); // Redirect to login or landing page
  };

  const handleSave = () => {
    setEditing(false);
    // later connect this to backend for update
  };

  return (
    <main className="min-h-screen bg-gray-200 flex justify-center">
      {/* Mobile container */}
      <div className="w-[390px] bg-white min-h-screen rounded-3xl shadow-xl overflow-hidden relative flex flex-col">
        
        {/* Cyan curved header */}
        <div className="bg-cyan-400 rounded-b-3xl px-4 pt-4 pb-20 relative font-semibold">
          <div className="w-24 h-5 bg-white rounded-b-full mx-auto absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <div className="flex items-center pt-6">
            <p className="text-white text-xl font-extrabold leading-snug">
              My Profile
            </p>
          </div>

          {/* Floating Profile Card */}
          <div className="absolute left-4 right-4 top-[100px] bg-white rounded-2xl p-4 shadow-lg flex items-center justify-between">
            <div className="flex items-center space-x-4 flex-1">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                <FaUser className="text-gray-500 text-xl" />
              </div>
              <div className="flex-1">
                {editing ? (
                  <>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border-b border-gray-300 text-sm font-semibold text-gray-800 outline-none"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border-b border-gray-300 text-xs text-gray-500 outline-none mt-1"
                    />
                  </>
                ) : (
                  <>
                    <p className="text-sm font-semibold text-gray-800">{name}</p>
                    <p className="text-xs text-gray-500">{email}</p>
                  </>
                )}
              </div>
            </div>
            <button
              className="p-2 rounded-full hover:bg-gray-100 transition"
              onClick={() => (editing ? handleSave() : setEditing(true))}
            >
              {editing ? (
                <FaSave className="text-green-500 text-lg" />
              ) : (
                <FaUserEdit className="text-teal-500 text-lg" />
              )}
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-4 pt-[80px] pb-24 space-y-6">
          {/* Menu Options with dividers */}
          <div className="divide-y divide-gray-200 rounded-lg overflow-hidden border border-gray-200">
            <MenuItem icon={<FaBell />} label="Notification" />
            <MenuItem
              icon={<FaQuestionCircle />}
              label="Help and support"
              onClick={() => router.push('/patient/H&S')}
            />
            <MenuItem icon={<FaUserFriends />} label="Invite friends" />
            <MenuItem
              icon={<FaSignOutAlt />}
              label="Logout"
              textColor="text-red-500"
              iconColor="text-red-500"
              onClick={handleLogout}
              hideArrow
            />
          </div>
        </div>

        {/*  Bottom Navigation */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[390px] z-50">
          <div className="bg-white rounded-t-2xl shadow-lg py-3 px-6 flex rounded-3xl shadow-xl overflow-hidden justify-between items-center">
            <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }}>
              <Link
                href="/patient/home"
                className="flex flex-col items-center text-gray-600 hover:text-blue-500"
              >
                <Image src="/find.png" width={28} height={28} alt="Home" />
                <span className="text-xs">Find a Doctor</span>
              </Link>
            </motion.div>
            <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }}>
              <Link
                href="/patient/appointment"
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
                href="/patient/record"
                className="flex flex-col items-center text-gray-600 hover:text-blue-500"
              >
                <Image
                  src="/record.png"
                  width={28}
                  height={28}
                  alt="Consult"
                />
                <span className="text-xs">Record</span>
              </Link>
            </motion.div>
            <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }}>
              <Link
                href="/patient/profile"
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

type MenuItemProps = {
  icon: React.ReactNode;
  label: string;
  textColor?: string;
  iconColor?: string;
  onClick?: () => void;
  hideArrow?: boolean;
};

function MenuItem({
  icon,
  label,
  textColor = 'text-gray-800',
  iconColor = 'text-gray-700',
  onClick,
  hideArrow = false,
}: MenuItemProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-4 py-4 bg-white hover:bg-gray-50 transition"
    >
      <div className="flex items-center space-x-3">
        <span className={`${iconColor} text-lg`}>{icon}</span>
        <span className={`${textColor} text-sm font-medium`}>{label}</span>
      </div>
      {!hideArrow && <FaChevronRight className="text-gray-600 text-base" />}
    </button>
  );
}
