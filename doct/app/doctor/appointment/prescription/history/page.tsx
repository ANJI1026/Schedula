"use client";

import { useState } from "react";
import { HiArrowLeft } from "react-icons/hi";
import { useRouter } from "next/navigation";

interface Appointment {
  date: string;
  diagnosis: string;
  prescription: string;
  notes?: string;
}

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  history: Appointment[];
}

const mockPatients: Patient[] = [
  {
    id: 1,
    name: "John Doe",
    age: 34,
    gender: "Male",
    history: [
      {
        date: "2025-08-05",
        diagnosis: "Fever & Cough",
        prescription: "Paracetamol, Cough Syrup",
        notes: "Drink plenty of fluids and rest",
      },
      {
        date: "2025-06-15",
        diagnosis: "Headache",
        prescription: "Ibuprofen",
      },
    ],
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 28,
    gender: "Female",
    history: [
      {
        date: "2025-07-22",
        diagnosis: "Allergy",
        prescription: "Antihistamine",
      },
    ],
  },
  {
    id: 3,
    name: "Michael Lee",
    age: 45,
    gender: "Male",
    history: [
      {
        date: "2025-08-01",
        diagnosis: "Diabetes Checkup",
        prescription: "Metformin",
      },
    ],
  },
];

export default function MedicalHistoryPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<Appointment | null>(
    null
  );

  const filteredPatients = mockPatients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // Back button handler
  const handleBackClick = () => {
    if (selectedRecord) {
      setSelectedRecord(null);
    } else if (selectedPatient) {
      setSelectedPatient(null);
      setSelectedRecord(null);
    } else {
      router.back();
    }
  };

  // Always show back button except when on main patient list with empty history
  const showBackButton = true;

  return (
    <div className="min-h-screen w-full bg-gray-100 flex justify-center">
      <div className="w-[390px] bg-white min-h-screen rounded-3xl shadow-xl overflow-hidden relative flex flex-col">
        {/* Header */}
        <div className="bg-cyan-500 rounded-b-[90px] px-6 pt-6 pb-14 relative shadow-lg">
          {showBackButton && (
            <button
              onClick={handleBackClick}
              className="absolute top-6 left-6 bg-white/30 hover:bg-white/50 transition rounded-full p-2 shadow-md"
              aria-label="Back"
              title="Back"
            >
              <HiArrowLeft className="text-white" size={22} />
            </button>
          )}
          <h1 className="text-white text-center text-xl font-semibold select-none">
            {selectedRecord
              ? `${selectedPatient?.name}'s Detail`
              : selectedPatient
              ? `${selectedPatient.name}'s History`
              : "Patients"}
          </h1>
        </div>

        {/* Content */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {!selectedPatient && !selectedRecord && (
            <>
              <input
                type="text"
                placeholder="Search patients..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-3 rounded-full border border-gray-300 shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              />
              <div className="space-y-3 mt-3">
                {filteredPatients.length > 0 ? (
                  filteredPatients.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => setSelectedPatient(p)}
                      className="p-4 bg-white rounded-2xl shadow-md hover:shadow-xl cursor-pointer border border-gray-100 transition flex justify-between items-center"
                    >
                      <div>
                        <h2 className="text-base font-semibold text-gray-900">
                          {p.name}
                        </h2>
                        <p className="text-xs text-gray-500">
                          {p.gender} • {p.age} years
                        </p>
                      </div>
                      <span className="text-cyan-600 font-semibold text-xs">
                        View History →
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-400 mt-8 text-sm">
                    No patients found.
                  </p>
                )}
              </div>
            </>
          )}

          {selectedPatient && !selectedRecord && (
            <div className="space-y-3">
              {selectedPatient.history.length > 0 ? (
                selectedPatient.history.map((record, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl shadow-md p-4 border border-gray-100"
                  >
                    <p className="text-xs text-gray-400 mb-1">{record.date}</p>
                    <h3 className="font-semibold text-gray-900 text-base">
                      Diagnosis: {record.diagnosis}
                    </h3>
                    <p className="text-gray-700 mt-1 text-sm">
                      Prescription: {record.prescription}
                    </p>
                    <button
                      onClick={() => setSelectedRecord(record)}
                      className="mt-2 text-cyan-600 font-semibold text-xs hover:underline"
                    >
                      View Full Detail →
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-400 mt-8 text-sm">
                  No medical history available for this patient.
                </p>
              )}
            </div>
          )}

          {/* Modal for full detail */}
          {selectedRecord && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-6">
              <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-xl relative ">
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition text-lg"
                  aria-label="Close details"
                  title="Close"
                >
                  ✕
                </button>
                <h2 className="text-xl font-semibold mb-2 text-gray-900">
                  Diagnosis: {selectedRecord.diagnosis}
                </h2>
                <p className="text-gray-500 mb-1 text-sm">
                  Date: {selectedRecord.date}
                </p>
                <p className="text-gray-700 whitespace-pre-line mb-2 text-sm">
                  Prescription: {selectedRecord.prescription}
                </p>
                {selectedRecord.notes && (
                  <p className="text-gray-600 italic text-sm">
                    Notes: {selectedRecord.notes}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
