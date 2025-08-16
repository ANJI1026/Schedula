"use client";
import Image from "next/image";
import { FaUserMd, FaStar, FaHospital } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { PiSuitcaseSimpleFill } from "react-icons/pi";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";

export interface DoctorInfo {
  name: string;
  specialization: string;
  hospital: string;
  experience: number;
  rating: number;
  patients: number;
  degree: string;
  university: string;
  services: { service: string; specialization: string }[];
  availability: string[];
  imageUrl: string;
  about: string;
}

const doctorData: DoctorInfo = {
  name: "Dr. Aman Bumrow",
  specialization: "Cardiologist",
  hospital: "The Wilson Hospital in California, US",
  experience: 10,
  rating: 4.8,
  patients: 5000,
  degree: "MBBS",
  university: "Sydney College and University",
  services: [{ service: "Medicare", specialization: "General Health" }],
  availability: [
    "Monday - Friday",
    "08:30 AM - 10:00 AM",
    "01:00 PM - 04:00 PM",
    "06:00 PM - 08:00 PM",
  ],
  imageUrl: "/dr.png",
  about:
    "Dr. Aman Bumrow is the top most immunologist specialist in Charles Hospital in London. She has received several awards for her contributions to the medical field and is available for private consultation.",
};

export default function DoctorDetails() {
  const router = useRouter();
  return (
    <div className="flex justify-center bg-gray-50 min-h-screen py-4">
      <div className="w-[390px] bg-white min-h-screen rounded-3xl shadow-xl overflow-hidden relative flex flex-col">
        
        {/* Top Header */}
        <div className="px-4 py-4 flex items-center justify-between border-b border-gray-200 sticky top-0 bg-white z-10">
          <div className="bg-cyan-500 rounded-xl h-9 w-9 flex items-center justify-center cursor-pointer shadow-sm">
            <IoIosArrowBack className="text-xl text-white" />
          </div>
          <h1 className="text-base font-semibold truncate max-w-[200px] text-gray-800">
           {doctorData.name}
          </h1>
          <button className="bg-cyan-50 rounded-xl h-9 w-9 flex items-center justify-center text-cyan-600 hover:bg-cyan-100 transition">
            ♡
          </button>
        </div>

        {/* Profile Section */}
        <div className="flex flex-col items-center text-center px-4 mt-6">
          <div className="w-28 h-28 relative rounded-full overflow-hidden border-4 border-cyan-500 shadow-md">
            <Image
              src={doctorData.imageUrl}
              alt="Doctor Profile"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <h2 className="text-xl font-bold mt-3 text-gray-800">{doctorData.name}</h2>
          <p className="text-sm text-cyan-600 font-medium">{doctorData.specialization}</p>
          <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
            <FaHospital className="text-gray-400" />
            <span>{doctorData.hospital}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-around mt-6 px-4">
          <StatBox
            icon={<MdGroups className="text-lg text-cyan-600" />}
            value={`${doctorData.patients.toLocaleString()}+`}
            label="Patients"
          />
          <StatBox
            icon={<PiSuitcaseSimpleFill className="text-lg text-cyan-600" />}
            value={`${doctorData.experience}+`}
            label="Years"
          />
          <StatBox
            icon={<FaStar className="text-lg text-yellow-500" />}
            value={doctorData.rating}
            label="Rating"
          />
        </div>

        <div className="h-2" />

        {/* About */}
        <Section title="About Me">
          <p className="text-sm text-gray-600 leading-relaxed">{doctorData.about}</p>
        </Section>


        <div className="h-2" />

        {/* Qualification */}
        <Section title="Qualification">
          <div className="bg-gray-50 p-3 rounded-lg shadow-sm text-sm text-gray-700">
            <p>
              <span className="font-medium text-gray-800">Degree:</span> {doctorData.degree}
            </p>
            <p className="mt-1">
              <span className="font-medium text-gray-800">University:</span> {doctorData.university}
            </p>
          </div>
        </Section>

        <div className="h-2" />

        {/* Services */}
        <Section title="Service & Specialization">
          {doctorData.services.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 p-3 rounded-lg shadow-sm text-sm text-gray-700 mb-2"
            >
              <div className="flex justify-between">
                <span className="font-medium text-gray-800">Service:</span>
                <span>{item.service}</span>
              </div>
              <div className="flex justify-between mt-1">
                <span className="font-medium text-gray-800">Specialization:</span>
                <span>{item.specialization}</span>
              </div>
            </div>
          ))}
        </Section>

        <div className="h-2" />

        {/* Availability */}
        <Section title="Consulting Availability">
          <ul className="text-sm text-gray-600 space-y-1">
            {doctorData.availability.map((slot, idx) => (
              <li
                key={idx}
                className={idx === 0 ? "font-medium text-gray-800" : "pl-3"}
              >
                {idx === 0 ? slot : `• ${slot}`}
              </li>
            ))}
          </ul>
        </Section>

        {/* Book Button */}
        <div className="px-4 py-4 bg-white shadow-inner sticky bottom-0">
        <button
      onClick={() => router.push("/patient/book2")}
      className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-xl text-lg font-medium transition shadow-md"
    >
      Book an Appointment
    </button>
        </div>
      </div>
    </div>
  );
}

// Small reusable components
function StatBox({
  icon,
  value,
  label,
}: {
  icon: JSX.Element;
  value: string | number;
  label: string;
}) {
  return (
    <div className="text-center">
      <div className="bg-cyan-50 rounded-xl h-10 w-10 flex items-center justify-center mx-auto shadow-sm">
        {icon}
      </div>
      <p className="font-semibold mt-1 text-gray-800">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="px-4 mt-6">
      <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
      {children}
    </div>
  );
}

function Divider() {
  return <div className="h-px w-[94%] bg-gray-200 mx-auto my-5" />;
}
