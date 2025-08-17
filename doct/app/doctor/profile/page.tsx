"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function DoctorDashboard() {
  const [fields, setFields] = useState([
    { label: "Full Name", value: "Dr. Smith", editable: false },
    { label: "Specialization", value: "Cardiology", editable: false },
    { label: "Degree", value: "MBBS, MD", editable: false },
    { label: "Phone Number", value: "+91-8989263588", editable: false },
    { label: "Email", value: "dr.smithjohn@gmail.com", editable: false },
    { label: "Experience", value: "10 Years", editable: false },
    { label: "About", value: "Passionate cardiologist with a decade of experience.", editable: false },
    { label: "Clinic Address", value: "8596, Noida, India", editable: false },
  ]);

  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = (index: number) => {
    setFields((prev) =>
      prev.map((f, i) => (i === index ? { ...f, editable: true } : f))
    );
    setIsEditing(true);
  };

  const updateField = (index: number, value: string) => {
    setFields((prev) =>
      prev.map((f, i) => (i === index ? { ...f, value } : f))
    );
  };

  const handleSave = () => {
    console.log("Saved fields:", fields.map(f => ({ label: f.label, value: f.value })));
    setFields(prev => prev.map(f => ({ ...f, editable: false })));
    setIsEditing(false);
  };

  return (
    <main className="min-h-screen w-full bg-gray-100 flex justify-center">
      <div className="w-[390px] bg-white min-h-screen rounded-3xl shadow-xl overflow-hidden relative flex flex-col">

        {/* Header */}
        <div className="bg-cyan-500 rounded-b-[90px] px-6 pt-6 pb-14 relative shadow-lg">
          <div className="w-24 h-5 bg-white rounded-b-full mx-auto absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <p className="text-black text-lg font-extrabold mt-3 text-center">Your Profile</p>

          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute left-4 right-4 top-28 bg-white rounded-2xl p-4 shadow-lg flex items-center justify-between"
          >
            <div>
              <p className="text-black font-semibold text-lg">{fields[0].value}</p>
              <p className="text-md text-gray-900 -mt-1">{fields[1].value}</p>
              <p className="text-sm text-gray-500 -mt-1">{fields[7].value}</p>
            </div>
            <Image
              src="/dr.png"
              alt="Doctor"
              width={60}
              height={60}
              className="rounded-xl object-cover"
            />
          </motion.div>
        </div>

        <div className="relative mt-28" />

        {/* Editable Fields */}
        <div className="relative px-4 pb-36 overflow-y-auto scrollbar-hide max-h-[calc(100vh-350px)]">
        <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 }}
    className="bg-white rounded-2xl shadow-md p-3 pt-6 space-y-3"
  >
    {fields.map((field, index) => (
      <div key={index} className="flex flex-col">
        <p className="text-xs text-gray-500 mb-1">{field.label}</p>
        {field.editable ? (
          <input
            type="text"
            value={field.value}
            onChange={(e) => updateField(index, e.target.value)}
            className="w-full border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 text-black"
            autoFocus
          />
        ) : (
          <p
            className="text-sm font-medium text-gray-800 cursor-pointer hover:bg-gray-50 rounded-md px-1 py-1"
            onClick={() => toggleEdit(index)}
          >
            {field.value}
          </p>
        )}
      </div>
    ))}

    {isEditing && (
      <button
        onClick={handleSave}
        className="w-full bg-cyan-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-cyan-600 mt-2"
      >
        Save Changes
      </button>
    )}
  </motion.div>
</div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[390px] z-50">
          <div className="bg-white rounded-t-2xl shadow-lg py-3 px-6 flex justify-between items-center">
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
                <Image src="/schedule.png" width={28} height={28} alt="Appointments" />
                <span className="text-xs">Appointments</span>
              </Link>
            </motion.div>
            <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }}>
              <Link
                href="/doctor/consultation"
                className="flex flex-col items-center text-gray-600 hover:text-blue-500"
              >
                <Image src="/consult.png" width={28} height={28} alt="Consult" />
                <span className="text-xs">Consult</span>
              </Link>
            </motion.div>
            <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }}>
              <Link
                href="/doctor/profile"
                className="flex flex-col items-center text-gray-600 hover:text-blue-500"
              >
                <Image src="/profile.png" width={28} height={28} alt="Profile" />
                <span className="text-xs">Profile</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
