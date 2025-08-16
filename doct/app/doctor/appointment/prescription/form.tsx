"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HiArrowLeft, HiPlus } from "react-icons/hi";
import { jsPDF } from "jspdf";
import Image from "next/image";

type Prescription = {
  id: number;
  patientName: string;
  gender?: string;
  dob?: string;
  age?: string;
  diagnosis: string;
  medicines: string;
  notes?: string;
  createdAt: number;
};

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4">
      <div
        className="relative bg-white/20 backdrop-blur-xl border border-white/30
                   rounded-2xl shadow-2xl flex items-center gap-3 text-sm
                   px-5 py-3 animate-toast-in overflow-hidden"
        style={{
          animation: "toastSlideUp 0.35s ease-out",
        }}
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/60 to-blue-500/60 -z-10" />
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold shadow-md">
          ✓
        </div>
        <span className="flex-1 font-medium text-white drop-shadow-sm">
          {message}
        </span>
        <button
          onClick={onClose}
          className="font-bold text-lg leading-none text-white/80 hover:text-white transition"
          aria-label="Close toast"
        >
          ×
        </button>
      </div>
      <style>{`
        @keyframes toastSlideUp {
          0% { transform: translateY(30px) scale(0.95); opacity: 0; }
          60% { transform: translateY(-4px) scale(1.02); opacity: 1; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        .animate-toast-out {
          animation: toastSlideDown 0.3s ease-in forwards;
        }
        @keyframes toastSlideDown {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(20px) scale(0.95); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default function PrescriptionPage() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [viewing, setViewing] = useState<Prescription | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const [prescriptions, setPrescriptions] = useState<Prescription[]>([
    {
      id: Date.now() - 300000,
      patientName: "Ravi Kumar",
      age: "35",
      diagnosis: "Common Cold",
      medicines:
        "Paracetamol 500mg — 1 tab twice a day\nCetrizine 10mg — 1 tab at night",
      notes: "Hydration + rest",
      createdAt: Date.now() - 300000,
    },
    {
      id: Date.now() - 200000,
      patientName: "Priya Sharma",
      age: "29",
      diagnosis: "Migraine",
      medicines:
        "Sumatriptan 50mg — 1 tab when required\nIbuprofen 400mg — twice a day",
      notes: "Avoid bright lights",
      createdAt: Date.now() - 200000,
    },
    {
      id: Date.now() - 100000,
      patientName: "Amit Verma",
      age: "40",
      diagnosis: "Diabetes Type 2",
      medicines: "Metformin 500mg — twice a day",
      notes: "Monitor sugar levels",
      createdAt: Date.now() - 100000,
    },
  ]);

  const [form, setForm] = useState({
    patientName: "",
    gender: "",
    dob: "",
    age: "",
    diagnosis: "",
    medicines: "",
    notes: "",
  });

  // Handle back button behavior
  const handleBack = () => {
    if (viewing) setViewing(null);
    else if (showForm) setShowForm(false);
    else router.back();
  };

  const filtered = prescriptions
    .slice()
    .reverse()
    .filter((p) =>
      p.patientName.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      const toastEl = document.querySelector(
        ".animate-toast-in"
      ) as HTMLElement;
      if (toastEl) toastEl.classList.add("animate-toast-out");
      setTimeout(() => setToast(null), 300);
    }, 2500);
  };

  const savePrescription = () => {
    if (!form.patientName.trim() || !form.diagnosis.trim()) {
      alert("Please add patient's name and diagnosis.");
      return;
    }
    const newP: Prescription = {
      id: Date.now(),
      patientName: form.patientName.trim(),
      gender: form.gender,
      dob: form.dob,
      age: form.age.trim(),
      diagnosis: form.diagnosis.trim(),
      medicines: form.medicines.trim(),
      notes: form.notes.trim(),
      createdAt: Date.now(),
    };
    setPrescriptions((s) => [...s, newP]);
    setForm({
      patientName: "",
      gender: "",
      dob: "",
      age: "",
      diagnosis: "",
      medicines: "",
      notes: "",
    });
    setViewing(newP);
    setShowForm(false);
    showToast("Prescription Created ✅");
  };

  const downloadPDF = (p: Prescription) => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    let cursorY = 60;

    // Header
    doc.setFontSize(22).setFont("helvetica", "bold");
    doc.text("Dr. Smith, MD", 40, cursorY);
    cursorY += 25;

    doc.setFontSize(12).setFont("helvetica", "normal");
    doc.text("Cardiologist | Noida, India", 40, cursorY);
    cursorY += 20;

    doc.setLineWidth(0.8);
    doc.line(40, cursorY, pageWidth - 40, cursorY);
    cursorY += 30;

    // Title
    doc.setFontSize(18).setFont("helvetica", "bold");
    doc.text("Medical Prescription", 40, cursorY);
    cursorY += 30;

    // Patient Info
    doc.setFontSize(12).setFont("helvetica", "normal");
    doc.text(`Patient Name: ${p.patientName}`, 40, cursorY);
    cursorY += 18;

    if (p.gender) {
      doc.text(`Gender: ${p.gender}`, 40, cursorY);
      cursorY += 18;
    }
    if (p.age) {
      doc.text(`Age: ${p.age}`, 40, cursorY);
      cursorY += 18;
    }
    if (p.dob) {
      doc.text(`Date of Birth: ${p.dob}`, 40, cursorY);
      cursorY += 18;
    }
    doc.text(
      `Date: ${new Date(p.createdAt).toLocaleDateString()}`,
      40,
      cursorY
    );
    cursorY += 30;

    // Diagnosis
    doc.setFontSize(14).setFont("helvetica", "bold");
    doc.text("Diagnosis:", 40, cursorY);
    cursorY += 20;
    doc.setFontSize(12).setFont("helvetica", "normal");
    doc.text(doc.splitTextToSize(p.diagnosis, pageWidth - 80), 40, cursorY);
    cursorY +=
      doc.getTextDimensions(doc.splitTextToSize(p.diagnosis, pageWidth - 80))
        .h + 20;

    // Medicines (with bullet points)
    doc.setFontSize(14).setFont("helvetica", "bold");
    doc.text("Medicines:", 40, cursorY);
    cursorY += 20;
    doc.setFontSize(12).setFont("helvetica", "normal");

    // Split medicines into lines and add bullet points
    const medsLines = p.medicines.split("\n");
    medsLines.forEach((line) => {
      doc.text(`• ${line}`, 50, cursorY);
      cursorY += 18;
    });
    cursorY += 10;

    // Notes (optional)
    if (p.notes) {
      doc.setFontSize(14).setFont("helvetica", "bold");
      doc.text("Notes:", 40, cursorY);
      cursorY += 20;
      doc.setFontSize(12).setFont("helvetica", "normal");
      doc.text(doc.splitTextToSize(p.notes, pageWidth - 80), 40, cursorY);
      cursorY +=
        doc.getTextDimensions(doc.splitTextToSize(p.notes, pageWidth - 80)).h +
        20;
    }

    // Signature line
    doc.setLineWidth(0.5);
    doc.line(pageWidth - 180, cursorY, pageWidth - 40, cursorY);
    cursorY += 15;
    doc.text("Dr. Smith", pageWidth - 140, cursorY);

    // Save PDF
    doc.save(`${p.patientName.replace(/\s+/g, "_")}_prescription.pdf`);
    showToast("PDF Downloaded 📥");
  };

  return (
    <main className="min-h-screen w-full bg-gray-100 flex justify-center">
      <style>{`
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        @keyframes fade-in { from {opacity: 0; transform: translateY(10px);} to {opacity: 1; transform: translateY(0);} }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
        @keyframes modal-pop {
          0% { transform: scale(0.95) translateY(10px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        .animate-modal { animation: modal-pop 0.25s ease-out; }
        @keyframes list-appear {
          from {opacity: 0; transform: translateY(6px);}
          to {opacity: 1; transform: translateY(0);}
        }
        .animate-list { animation: list-appear 0.25s ease-out; }
        @keyframes toastSlideUp {
          0% { transform: translateY(30px) scale(0.95); opacity: 0; }
          60% { transform: translateY(-4px) scale(1.02); opacity: 1; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        .animate-toast-out {
          animation: toastSlideDown 0.3s ease-in forwards;
        }
        @keyframes toastSlideDown {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(20px) scale(0.95); opacity: 0; }
        }
      `}</style>

      <div className="w-[390px] bg-white min-h-screen rounded-3xl shadow-xl overflow-hidden relative flex flex-col">
        {/* Header */}
        <div className="bg-cyan-500 rounded-b-[90px] px-6 pt-6 pb-16 relative shadow-lg flex items-center">
          <button
            onClick={handleBack}
            className="absolute top-6 left-6 bg-white/30 hover:bg-white/50 transition rounded-full p-2 shadow-md z-20"
            aria-label="Back"
            title="Back"
          >
            <HiArrowLeft className="text-white" size={22} />
          </button>
          <h1 className="text-white text-center text-xl font-semibold w-full select-none">
            {viewing
              ? `${viewing.patientName}'s Prescription`
              : showForm
              ? "New Prescription"
              : "Prescriptions"}
          </h1>

          {/* History icon button on right */}
          <button
            onClick={() =>
              router.push("/doctor/appointment/prescription/history")
            }
            className="absolute top-6 right-6 bg-white/30 hover:bg-white/50 transition rounded-full p-2 shadow-md z-20"
            aria-label="History"
            title="History"
          >
            <Image src="/history.png" alt="History" width={22} height={22} />
          </button>
        </div>

        {/* Search (hide when showing form or viewing) */}
        {!showForm && !viewing && (
          <div className="px-6 mt-5">
            <input
              type="text"
              placeholder="Search patient..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-full border border-gray-300 shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            />
          </div>
        )}

        {/* Prescription list */}
        {!showForm && !viewing && (
          <div className="flex-1 overflow-y-auto hide-scrollbar px-6 mt-4 space-y-3 pb-20">
            {filtered.length > 0 ? (
              filtered.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl p-4 shadow-md border border-gray-100 flex justify-between items-center animate-list cursor-pointer hover:shadow-xl transition"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900 text-base">
                      {p.patientName}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">{p.diagnosis}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => setViewing(p)}
                      className="bg-cyan-50 text-cyan-700 px-3 py-1 rounded text-xs hover:scale-105 transition"
                      aria-label={`View prescription of ${p.patientName}`}
                    >
                      View
                    </button>
                    <button
                      onClick={() => downloadPDF(p)}
                      className="bg-green-500 text-white px-3 py-1 rounded text-xs hover:scale-105 transition"
                      aria-label={`Download PDF for ${p.patientName}`}
                    >
                      PDF
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400 mt-8 text-sm">
                No prescriptions found.
              </p>
            )}
          </div>
        )}

        {/* Floating Create Button */}
        {!showForm && !viewing && (
          <button
            onClick={() => setShowForm(true)}
            className="absolute bottom-6 right-6 bg-cyan-500 text-white rounded-full p-4 shadow-lg hover:bg-cyan-600 hover:scale-110 transition"
            aria-label="New Prescription"
            title="New Prescription"
          >
            <HiPlus size={24} />
          </button>
        )}

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black opacity-40"
              onClick={() => setShowForm(false)}
            />
            <div className="relative w-full max-w-[360px] bg-white rounded-3xl p-6 shadow-xl animate-modal z-10 overflow-y-auto max-h-[80vh]">
              <h3 className="font-bold text-lg mb-4 text-gray-700">
                New Prescription
              </h3>
              <div className="space-y-3">
                <input
                  name="patientName"
                  value={form.patientName}
                  onChange={handleChange}
                  placeholder="Patient name*"
                  className="w-full px-4 py-3 rounded-2xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                />
                <div className="flex gap-3">
                  <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className="flex-1 px-3 py-3 rounded-2xl border border-gray-300 text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                    aria-label="Gender"
                  >
                    <option value="">Gender*</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  <input
                    type="number"
                    name="age"
                    value={form.age}
                    onChange={handleChange}
                    placeholder="Age"
                    className="w-20 px-3 py-3 rounded-2xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                    min={0}
                    aria-label="Age"
                  />
                  <input
                    type="date"
                    name="dob"
                    value={form.dob}
                    onChange={handleChange}
                    className="flex-1 px-3 py-3 rounded-2xl border border-gray-300 text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                    aria-label="Date of birth"
                  />
                </div>
                <input
                  name="diagnosis"
                  value={form.diagnosis}
                  onChange={handleChange}
                  placeholder="Diagnosis*"
                  className="w-full px-4 py-3 rounded-2xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                />
                <textarea
                  name="medicines"
                  value={form.medicines}
                  onChange={handleChange}
                  placeholder="Medicines (dosage & instructions)"
                  className="w-full px-4 py-3 rounded-2xl border border-gray-300 text-sm resize-none h-20 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                />
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Additional notes (optional)"
                  className="w-full px-4 py-3 rounded-2xl border border-gray-300 text-sm resize-none h-16 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                />
                <button
                  onClick={savePrescription}
                  className="w-full bg-cyan-500 text-white py-3 rounded-2xl font-semibold hover:bg-cyan-600 transition"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* View Modal */}
        {viewing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black opacity-40"
              onClick={() => setViewing(null)}
            />
            <div className="relative w-full max-w-[390px] bg-white rounded-3xl p-6 shadow-xl animate-modal z-10 overflow-y-auto max-h-[80vh]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-xl text-gray-900">
                  {viewing.patientName}
                </h3>
                <div className="flex gap-3">
                  <button
                    onClick={() => downloadPDF(viewing)}
                    className="bg-green-500 text-white px-4 py-2 rounded-2xl text-sm font-semibold hover:bg-green-600 transition"
                    aria-label="Download PDF"
                  >
                    Download
                  </button>
                  <button
                    onClick={() => setViewing(null)}
                    className="bg-gray-300 px-4 py-2 rounded-2xl text-sm font-semibold hover:bg-gray-400 transition"
                    aria-label="Close modal"
                  >
                    Close
                  </button>
                </div>
              </div>
              <div className="space-y-3 text-gray-700 text-sm leading-relaxed">
                <p>
                  <strong>Age:</strong> {viewing.age || "-"}
                </p>
                <p>
                  <strong>Gender:</strong> {viewing.gender || "-"}
                </p>
                <p>
                  <strong>DOB:</strong> {viewing.dob || "-"}
                </p>
                <p className="mt-3">
                  <strong>Diagnosis:</strong> {viewing.diagnosis}
                </p>
                <p>
                  <strong>Medicines:</strong>
                </p>
                <pre className="whitespace-pre-wrap bg-gray-50 rounded p-3 text-sm">
                  {viewing.medicines}
                </pre>
                {viewing.notes && (
                  <p>
                    <strong>Notes:</strong> {viewing.notes}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Toast */}
        {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      </div>
    </main>
  );
}
