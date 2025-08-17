"use client";

import { useState } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { CalendarIcon } from "@heroicons/react/24/outline";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";

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

  const router = useRouter();
  const dates = generateDates(selectedDate);

  const handleBooking = () => {
    if (!selectedSlot) {
      alert("Please select a time slot before booking.");
      return;
    }

    // Save appointment to localStorage
    const existingAppointments =
      JSON.parse(localStorage.getItem("appointments") || "[]");

    const newAppointment = {
      doctor: doctor.name,
      specialty: doctor.specialty,
      date: format(selectedDate, "dd MMM yyyy"),
      slot: selectedSlot,
      status: "upcoming", // default
    };

    localStorage.setItem(
      "appointments",
      JSON.stringify([...existingAppointments, newAppointment])
    );

    // Navigate to confirmation page
    router.push("/patient/PatientDetail");
  };

  return (
    <main className="min-h-screen w-full bg-[#F5F5F5] flex justify-center relative">
      <div className="w-[390px] bg-white min-h-screen rounded-3xl shadow-xl overflow-hidden relative flex flex-col">
        
        {/* Header */}
        <div className="relative bg-cyan-400 h-[130px] rounded-b-3xl px-4 pt-6">
          <div className="w-24 h-5 bg-white rounded-b-full mx-auto absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <div className="flex items-center text-white">
            <button
              onClick={() => router.back()}
              className="text-xl font-bold"
            >
              &larr;
            </button>
            <h2 className="text-md font-semibold ml-2">Book Appointment</h2>
          </div>
        </div>

        {/* Content */}
        <div className="relative -top-10 px-4 pb-16">
          
          {/* Doctor card */}
          <div className="bg-white rounded-xl shadow-sm flex items-center p-4 mb-6">
            <div className="flex-1">
              <h3 className="text-md text-gray-600 font-semibold">
                {doctor.name}
              </h3>
              <p className="text-sm text-gray-600">{doctor.specialty}</p>
              <p className="text-sm text-gray-600">{doctor.qualification}</p>
            </div>
            <Image
              src={doctor.image}
              alt="Doctor"
              width={60}
              height={60}
              className="rounded-xl object-cover"
            />
          </div>

          {/* Date Picker */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-medium text-black">Book Appointment</p>
              <button
                onClick={() => setShowCalendar(!showCalendar)}
                className="text-gray-600"
              >
                <CalendarIcon className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm font-medium text-gray-600 mb-2">
              {format(selectedDate, "MMMM yyyy")} 📆
            </p>

            {showCalendar && (
  <div className="mb-4">
    <DatePicker
      selected={selectedDate}
      onChange={(date: Date | null) => {
        if (date) {
          setSelectedDate(date);
          setShowCalendar(false);
        }
      }}
      inline
    />
  </div>
)}


            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {dates.map((d) => (
                <div
                  key={d.full.toDateString()}
                  onClick={() => setSelectedDate(d.full)}
                  className={`cursor-pointer min-w-[48px] py-2 rounded-xl text-center text-xs font-medium ${
                    format(d.full, "yyyy-MM-dd") ===
                    format(selectedDate, "yyyy-MM-dd")
                      ? "bg-cyan-500 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <div>{d.date}</div>
                  <div>{d.day}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Morning Slots */}
          <div className="mb-10">
            <p className="text-sm font-medium mb-2 text-black">Select Slot</p>
            <div className="grid grid-cols-2 gap-2">
              {slotsMorning.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`py-2 px-2 rounded-lg border text-xs ${
                    selectedSlot === slot
                      ? "bg-cyan-500 text-white border-cyan-500"
                      : "bg-gray-100 text-gray-800 border-gray-300"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Evening Slots */}
          <div className="mb-8">
            <p className="text-sm font-medium mb-2 text-black">Evening Slot</p>
            <div className="grid grid-cols-2 gap-2">
              {slotsEvening.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`py-2 px-2 rounded-lg border text-xs ${
                    selectedSlot === slot
                      ? "bg-cyan-500 text-white border-cyan-500"
                      : "bg-gray-100 text-gray-800 border-gray-300"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Book Button */}
          <button
            onClick={handleBooking}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-xl text-sm"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </main>
  );
}

