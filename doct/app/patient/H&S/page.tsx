"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Import router
import { FaArrowLeft, FaPhoneAlt } from "react-icons/fa";
import clsx from "clsx";

const faqs = [
  {
    question: "What is Shedula",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    question: "How do I cancel an appointment?",
    answer:
      'Go to your appointments, tap the one you want to cancel, and press "Cancel". You’ll get a confirmation message.',
  },
  {
    question: "Why I can't book appointment?",
    answer:
      "Check your internet connection and ensure your profile is complete. If the issue persists, contact support.",
  },
  {
    question: "Why are there no appointment slots available?",
    answer:
      "The doctor may be fully booked or hasn’t opened their schedule yet. Try again later or choose another provider.",
  },
];

export default function HelpPage() {
  const [activeTab, setActiveTab] = useState<"FAQ" | "Contact">("FAQ");
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const router = useRouter(); // ✅ Initialize router

  return (
    <main className="min-h-screen flex justify-center bg-white">
      <div className="w-[390px] bg-white min-h-screen rounded-3xl shadow-xl overflow-hidden relative flex flex-col">
        {/* Small curved gray header */}
        <div className="bg-cyan-400 relative h-[90px] rounded-b-2xl">
          <div className="w-24 h-5 bg-white rounded-b-full mx-auto absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <div className="flex items-center gap-3 px-4 pt-6">
            <button onClick={() => router.back()} className="p-1"> {/* ✅ Back button */}
              <FaArrowLeft className="text-gray-600 text-[16px]" />
            </button>
            <h1 className="text-[17px] font-semibold text-gray-900">
              Help and Support
            </h1>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mt-4">
          {["FAQ", "Contact"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as "FAQ" | "Contact")}
              className={clsx(
                "flex-1 pb-2 text-center text-[15px] font-medium",
                activeTab === tab
                  ? "text-cyan-600 border-b-2 border-cyan-400"
                  : "text-gray-400"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* FAQ Section */}
        {activeTab === "FAQ" && (
          <div className="space-y-3 mt-4 px-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg border border-gray-200 shadow-sm"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex justify-between items-center w-full px-4 py-3 text-left"
                  >
                    <span className="text-gray-900 font-medium text-[14px]">
                      {faq.question}
                    </span>

                    {/* Blue Triangle */}
                    <span
                      className={clsx(
                        "w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-cyan-500 transition-transform duration-300",
                        isOpen && "rotate-180"
                      )}
                    ></span>
                  </button>

                  {isOpen && (
                    <>
                      <div className="border-t border-gray-200 mx-4" />
                      <div className="px-4 pb-3 pt-2 text-gray-500 text-[13px] leading-relaxed">
                        {faq.answer}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === "Contact" && (
          <div className="py-4 px-4">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-4 py-4 flex items-center gap-4">
              <div className="bg-cyan-100 p-3 rounded-full">
                <FaPhoneAlt className="text-cyan-500 text-[18px]" />
              </div>
              <div className="flex flex-col">
                <span className="text-gray-900 font-medium text-[15px]">
                  Call Us
                </span>
                <span className="text-gray-500 text-[14px]">98745 61238</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
