"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

type Doctor = {
  id: number;
  name: string;
  img: string;
  specialist: string;
  description: string;
  availability: string;
  timing: string;
};

const doctorsData: Doctor[] = [
  {
    id: 1,
    name: "Dr. Prakash Das",
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d",
    specialist: "Psychologist",
    description: "Practicing Psychology for 7 years with expertise in mental health.",
    availability: "Available today",
    timing: "06:30 AM–07:00 PM",
  },
  {
    id: 2,
    name: "Dr. Rajiv Kumar",
    img: "/dr.png",
    specialist: "Cardiologist",
    description: "Expert in heart diseases and preventive cardiology.",
    availability: "Available tomorrow",
    timing: "09:00 AM–05:00 PM",
  },
  {
    id: 3,
    name: "Dr. Anjali Sharma",
    img: "/fdr.png",
    specialist: "Dentist",
    description: "Specializes in dental surgeries and cosmetic dentistry.",
    availability: "Available today",
    timing: "08:00 AM–03:00 PM",
  },
  {
    id: 4,
    name: "Dr. Mihir Singh",
    img: "/dr1.png",
    specialist: "Dermatologist",
    description: "Skin care specialist with over 10 years of experience.",
    availability: "Available today",
    timing: "10:00 AM–06:00 PM",
  },
  {
    id: 1,
    name: "Dr. Prakash Das",
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d",
    specialist: "Psychologist",
    description: "Practicing Psychology for 7 years with expertise in mental health.",
    availability: "Available today",
    timing: "06:30 AM–07:00 PM",
  }
];

const SearchDoctor: React.FC = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const filteredDoctors = doctorsData.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-white flex justify-center">
      <div className="w-[390px] h-screen flex flex-col rounded-3xl shadow-lg overflow-hidden">
{/* Stylish Header with Subtle Background */}
<div className="relative bg-cyan-500 p-5 rounded-b-3xl shadow-2xl overflow-hidden">
  {/* Decorative background circles */}
  <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
  <div className="absolute top-5 right-5 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
  <div className="absolute bottom-0 left-1/3 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>

  {/* Content */}
  <div className="relative flex items-center gap-4 z-10">
    <div className="relative">
      <Image
        src="/patient.png"
        width={60}
        height={60}
        className="rounded-full border-2 border-white shadow-xl"
        alt="user"
      />
      {/* Online indicator */}
      <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 border-2 border-white rounded-full animate-pulse"></span>
    </div>
    <div>
      <h3 className="text-white font-extrabold text-xl drop-shadow-md">
        Hey, John
      </h3>
      <p className="text-white/80 text-sm mt-1 flex items-center gap-1">
        📍 Dubai
      </p>
    </div>
  </div>
</div>



        {/* Search */}
        <div className="px-5 mt-4">
          <div className="flex items-center bg-white border border-cyan-500 rounded-full px-4 py-2 shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-cyan-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search Doctors"
              className="bg-transparent outline-none px-3 w-full text-cyan-700 placeholder-cyan-300"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Scrollable Doctor List */}
        <div
  className="flex-1 overflow-y-auto px-5 mt-5 space-y-4"
  style={{
    scrollbarWidth: "none", // Firefox
    msOverflowStyle: "none", // IE 10+
  }}
>
  {filteredDoctors.length > 0 &&
    filteredDoctors.map((doctor) => (
      <div
        key={doctor.id}
        className="relative bg-white border border-cyan-100 rounded-2xl p-3 flex gap-3 shadow-md cursor-pointer"
      >
        <Image
          src={doctor.img}
          width={90}
          height={90}
          alt={doctor.name}
          className="rounded-xl object-cover"
        />
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-cyan-700 font-semibold">{doctor.name}</h2>
            <p className="text-cyan-500 text-xs">{doctor.specialist}</p>
            <p className="bg-cyan-100 text-cyan-700 text-xs inline-block px-3 py-1 rounded-full mt-1">
              {doctor.availability}
            </p>
            <p className="text-gray-500 text-xs line-clamp-2 mt-1">
              {doctor.description}
            </p>
          </div>
          <span className="text-gray-400 text-xs">{doctor.timing}</span>
        </div>
      </div>
    ))}
  <style jsx>{`
    div::-webkit-scrollbar {
      display: none;
    }
  `}</style>
</div>


        {/* Bottom Nav */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[390px] z-50">
          <div className="bg-white rounded-t-2xl shadow-lg py-3 px-6 flex rounded-3xl shadow-xl overflow-hidden justify-between items-center">
            {[
              { href: "/patient/home", src: "/find.png", label: "Find" },
              { href: "/patient/appointment", src: "/schedule.png", label: "Appointments" },
              { href: "/patient/record", src: "/record.png", label: "Record" },
              { href: "/patient/profile", src: "/profile.png", label: "Profile" },
            ].map((nav, idx) => (
              <Link
                key={idx}
                href={nav.href}
                className="flex flex-col items-center text-cyan-500 hover:text-cyan-700 transition-colors"
              >
                <Image src={nav.src} width={28} height={28} alt={nav.label} />
                <span className="text-xs mt-1">{nav.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchDoctor;
