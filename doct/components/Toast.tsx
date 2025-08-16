"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ToastType = "success" | "error" | "info";

interface ToastProps {
  message: string;
  type?: ToastType;
  isVisible: boolean;
  onClose: () => void;
}

const bgColors = {
  success: "bg-green-500",
  error: "bg-red-500",
  info: "bg-blue-500",
};

export default function Toast({
  message,
  type = "info",
  isVisible,
  onClose,
}: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => onClose(), 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <div
            className={`relative px-5 py-3 text-white rounded-xl shadow-lg shadow-black/20 ${bgColors[type]}`}
          >
            {/* 2 layer glow effect */}
            <div className="absolute inset-0 rounded-xl bg-white/10 blur-md -z-10"></div>
            <p className="font-medium">{message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
