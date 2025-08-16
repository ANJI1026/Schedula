"use client";

import { useState } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { CalendarIcon } from "@heroicons/react/24/outline";
import "react-datepicker/dist/react-datepicker.css";

const doctor = {
  name: "Dr. Kumar Das",
  specialty: "Cardiologist - Dombivli",
  qualification: "MBBS, MD (Internal Medicine)",
  image: "/dr.png",
};

const slotsMorning = [
  "09:30 AM - 09:45AM",
  "10:00 AM - 10:15AM",
  "10:30 AM - 10:45AM",
  "11:00 AM - 11:15AM",
  "12:00 PM - 12:15PM",
  "01:00 PM - 01:15PM",
];

const slotsEvening = [
  "01:45 PM - 02:00PM",
  "02:15 PM - 02:30PM",
  "02:30 PM - 02:45PM",
  "03:00 PM - 03:15PM",
];

function generateDates(baseDate: Date) {
  const dates = [];
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  for (let i = 0; i < 7; i++) {
    const date = new Date(baseDate);
    date.setDate(date.getDate() + i);
    dates.push({
      date: date.getDate(),
      day: days[date.getDay()],
      full: date,
    });
  }
  return dates;
}

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const dates = generateDates(selectedDate);

  const handleBook = () => {
    if (!selectedSlot) return;
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      window.location.href = "/patient/appointment";
    }, 2000);
  };

  return (
    <main className="min-h-screen w-full bg-cyan-50 flex justify-center">
      <div className="w-[390px] bg-white min-h-screen rounded-3xl shadow-xl overflow-hidden relative flex flex-col">
        
        {/* Header */}
        <div className="bg-cyan-400 rounded-b-3xl px-4 pt-4 pb-20 relative font-semibold">
          <div className="w-24 h-5 bg-white rounded-b-full mx-auto absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <div className="flex items-center text-white">
            <button
              className="text-xl font-bold"
              onClick={() => (window.location.href = "/patient/appointment")}
            >
              &larr;
            </button>
            <h2 className="text-md font-semibold ml-2">
              Reschedule Appointment
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="relative -top-10 px-4 pb-16">
          {/* Doctor Card */}
          <div className="bg-white border border-cyan-100 rounded-xl shadow-md flex items-center p-4 mb-6">
            <div className="flex-1">
              <h3 className="text-md text-gray-800 font-semibold">
                {doctor.name}
              </h3>
              <p className="text-sm text-gray-600 mb-2">{doctor.specialty}</p>
              <p className="text-xs text-gray-500">{doctor.qualification}</p>
            </div>
            <Image
              src={doctor.image}
              alt="Doctor"
              width={60}
              height={60}
              className="rounded-xl object-cover border border-cyan-100"
            />
          </div>

          {/* Date Picker */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-medium text-gray-800">Book Appointment</p>
              <button
                onClick={() => setShowCalendar(!showCalendar)}
                className="text-cyan-500 hover:text-cyan-600"
              >
                <CalendarIcon className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm font-medium text-gray-600 mb-2">
              {format(selectedDate, "MMMM yyyy")} 📆
            </p>

            {showCalendar && (
              <div className="mb-4 border border-cyan-100 rounded-xl">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date: Date) => {
                    setSelectedDate(date);
                    setShowCalendar(false);
                  }}
                  inline
                />
              </div>
            )}

            {/* Dates Row */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {dates.map((d) => (
                <div
                  key={d.full.toDateString()}
                  onClick={() => setSelectedDate(d.full)}
                  className={`cursor-pointer min-w-[52px] py-2 rounded-xl text-center text-xs font-semibold transition ${
                    format(d.full, "yyyy-MM-dd") ===
                    format(selectedDate, "yyyy-MM-dd")
                      ? "bg-cyan-500 text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-cyan-50"
                  }`}
                >
                  <div>{d.date}</div>
                  <div className="text-[10px]">{d.day}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Morning Slots */}
          <div className="mb-8">
            <p className="text-sm font-semibold mb-2 text-gray-800">Select Slot</p>
            <div className="grid grid-cols-2 gap-2">
              {slotsMorning.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`py-2 px-2 rounded-lg border text-xs font-medium transition ${
                    selectedSlot === slot
                      ? "bg-cyan-500 text-white border-cyan-500"
                      : "bg-gray-100 text-gray-800 border-gray-200 hover:bg-cyan-50"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Evening Slots */}
          <div className="mb-8">
            <p className="text-sm font-semibold mb-2 text-gray-800">Evening Slot</p>
            <div className="grid grid-cols-2 gap-2">
              {slotsEvening.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`py-2 px-2 rounded-lg border text-xs font-medium transition ${
                    selectedSlot === slot
                      ? "bg-cyan-500 text-white border-cyan-500"
                      : "bg-gray-100 text-gray-800 border-gray-200 hover:bg-cyan-50"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Book Button */}
          <button
            onClick={handleBook}
            className={`w-full font-semibold py-3 rounded-xl text-sm transition ${
              selectedSlot
                ? "bg-cyan-500 hover:bg-cyan-600 text-white"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!selectedSlot}
          >
            Book Appointment
          </button>
        </div>

       {/* Success Modal */}
{showSuccess && (
  <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white w-[300px] rounded-2xl p-6 text-center shadow-lg relative animate-fade-in">
      <Image
        src="/success.png"
        alt="Success"
        width={80}
        height={80}
        className="mx-auto mb-3"
      />
      <h2 className="text-lg font-semibold text-gray-800">
        Appointment Successful!
      </h2>
      <p className="text-gray-500 text-sm mt-2">
        Your appointment has been booked successfully.
      </p>
      <button
        onClick={() => setShowSuccess(false)}
        className="mt-5 bg-cyan-500 text-white px-6 py-2 rounded-xl hover:bg-cyan-600"
      >
        Close
      </button>
    </div>
  </div>
)}
      </div>
    </main>
  );
}
