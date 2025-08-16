"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function WelcomePage() {
  const router = useRouter();

  return (
    <main className="h-screen w-screen flex items-center justify-center bg-gradient-to-b from-cyan-100 to-white">
      {/* Mobile Screen Frame */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative h-[95vh] w-full max-w-sm bg-gradient-to-b from-cyan-400 via-cyan-300 to-white rounded-[35px] overflow-hidden shadow-2xl flex flex-col border border-white/30 backdrop-blur-lg"
      >
        {/* Background Illustration */}
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 opacity-20 pointer-events-none"
        >
          <Image
            src="/doctor.jpeg"
            alt="Doctor Illustration"
            fill
            className="object-contain"
          />
        </motion.div>

        {/* Top Logo / Title */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center z-10 px-4"
        >
          <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">
            Shedula🩺
          </h1>
          <p className="text-white/90 mt-2 text-sm tracking-wide">
            Your health, our priority
          </p>
        </motion.div>

        {/* Push buttons slightly above bottom */}
        <div className="flex-grow" />

        {/* Buttons */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="px-6 pb-16 flex flex-col gap-4 z-10"
        >
          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => router.push("/doctor/login")}
            className="bg-white/80 backdrop-blur-lg border border-transparent text-cyan-600 font-semibold py-4 rounded-full text-lg shadow-lg hover:shadow-xl hover:border-cyan-400 transition-all duration-300"
          >
            Doctor Login
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => router.push("/patient/login")}
            className="bg-white/80 backdrop-blur-lg border border-transparent text-cyan-600 font-semibold py-4 rounded-full text-lg shadow-lg hover:shadow-xl hover:border-cyan-400 transition-all duration-300"
          >
            Patient Login
          </motion.button>
        </motion.div>

        {/* Tagline at absolute bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center text-black text-xs italic pb-4 z-10"
        >
          Because every heartbeat matters ❤️
        </motion.div>
      </motion.div>
    </main>
  );
}
