"use client";

import { useState } from "react";
import { HiArrowLeft, HiPlus } from "react-icons/hi";
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

const initialPatients: Patient[] = [
  { id: 1, name: "John Doe", age: 34, gender: "Male", history: [] },
  { id: 2, name: "Jane Smith", age: 28, gender: "Female", history: [] },
];

export default function MedicalHistoryPage() {
  const router = useRouter();
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [search, setSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newPatientName, setNewPatientName] = useState("");
  const [newPatientAge, setNewPatientAge] = useState<number | "">("");
  const [newPatientGender, setNewPatientGender] = useState("");

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddPatient = () => {
    if (!newPatientName || !newPatientAge || !newPatientGender) return;
    const newPatient: Patient = {
      id: Date.now(),
      name: newPatientName,
      age: Number(newPatientAge),
      gender: newPatientGender,
      history: [],
    };
    setPatients((prev) => [newPatient, ...prev]);
    setShowAddModal(false);
    setNewPatientName("");
    setNewPatientAge("");
    setNewPatientGender("");
  };

  const handleBackClick = () => {
    if (selectedPatient) setSelectedPatient(null);
    else router.back();
  };

  return (
    <div className="min-h-screen w-full bg-gray-200 flex justify-center">
      <div className="w-[390px] bg-white min-h-screen rounded-3xl shadow-xl overflow-hidden relative flex flex-col">
        {/* Header */}
        <div className="bg-cyan-500 rounded-b-[90px] px-6 pt-6 pb-14 relative shadow-lg">
          <button
            onClick={handleBackClick}
            className="absolute top-6 left-6 bg-white/30 hover:bg-white/50 transition rounded-full p-2 shadow-md"
            aria-label="Back"
            title="Back"
          >
            <HiArrowLeft className="text-white" size={22} />
          </button>
          <h1 className="text-white text-center text-xl font-semibold select-none">
            {selectedPatient ? `${selectedPatient.name}'s History` : "Patients"}
          </h1>
        </div>

        {/* Patient List */}
        <div className="flex-1 p-5 overflow-y-auto space-y-3 hide-scrollbar">
          {!selectedPatient && (
            <>
              <input
                type="text"
                placeholder="Search patients..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-3 rounded-full border border-gray-300 shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition mb-3"
              />
              {filteredPatients.length > 0 ? (
                filteredPatients.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setSelectedPatient(p)}
                    className="p-3 bg-white rounded-xl shadow-md hover:shadow-xl cursor-pointer border border-gray-100 transition flex justify-between items-center"
                  >
                    <div>
                      <h2 className="text-sm font-semibold text-gray-900">
                        {p.name}
                      </h2>
                      <p className="text-xs text-gray-500">
                        {p.gender} • {p.age} years
                      </p>
                    </div>
                    <span className="text-cyan-600 font-semibold text-xs">
                      View →
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-400 mt-8 text-sm">
                  No patients found.
                </p>
              )}
            </>
          )}

          {/* Selected Patient History */}
          {selectedPatient && (
            <div className="space-y-3">
              {selectedPatient.history.length > 0 ? (
                selectedPatient.history.map((record, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl shadow-md p-3 border border-gray-100"
                  >
                    <p className="text-xs text-gray-400 mb-1">{record.date}</p>
                    <h3 className="font-semibold text-gray-900 text-sm">
                      Diagnosis: {record.diagnosis}
                    </h3>
                    <p className="text-gray-700 mt-1 text-xs">
                      Prescription: {record.prescription}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-400 mt-8 text-sm">
                  No medical history available.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Floating Add Button inside mobile screen */}
        {!selectedPatient && (
          <div className="absolute bottom-6 right-6">
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-cyan-500 text-white p-4 rounded-full shadow-lg hover:bg-cyan-600 transition flex items-center justify-center z-50"
            >
              <HiPlus size={24} />
            </button>
          </div>
        )}

        {/* Add Patient Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-6">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-xl relative">
              <button
                onClick={() => setShowAddModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition text-lg"
                aria-label="Close"
                title="Close"
              >
                ✕
              </button>
              <h2 className="text-xl font-semibold mb-4 text-gray-900">
                Add New Patient
              </h2>
              <input
                type="text"
                placeholder="Name"
                value={newPatientName}
                onChange={(e) => setNewPatientName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 mb-3 text-black"
              />
              <input
                type="number"
                placeholder="Age"
                value={newPatientAge}
                onChange={(e) => setNewPatientAge(e.target.valueAsNumber)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 mb-3 text-black"
              />
              <select
                value={newPatientGender}
                onChange={(e) => setNewPatientGender(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 mb-3 text-black"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <button
                onClick={handleAddPatient}
                className="w-full bg-cyan-500 text-white py-2 rounded-xl font-semibold hover:bg-cyan-600 transition"
              >
                Add Patient
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
