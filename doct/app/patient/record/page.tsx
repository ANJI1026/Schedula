"use client";

import { useState } from "react";
import { Pill, FlaskConical, FileDown, FileText, ThermometerSun } from "lucide-react";
import jsPDF from "jspdf";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function MyRecords() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedRecord, setSelectedRecord] = useState<RecordItem | null>(null);

  interface RecordItem {
    id: number;
    date: string;
    icon: React.ReactNode;
    iconBgColor: string;
    iconColor: string;
    title: string;
    description: string;
    category: string;
    type?: "blood" | "xray" | "headache" | "fever" | "prescription";
  }

  const records: RecordItem[] = [
    {
      id: 1,
      date: "12 Aug 2025",
      icon: <FileText className="w-5 h-5" />,
      iconBgColor: "bg-[#FFEDED]",
      iconColor: "text-[#FC514E]",
      title: "Headache & nausea",
      description: "Patient reported dizziness and fatigue.",
      category: "Problems",
      type: "headache",
    },
    {
      id: 2,
      date: "11 Aug 2025",
      icon: <ThermometerSun className="w-5 h-5" />,
      iconBgColor: "bg-[#FFF4E5]",
      iconColor: "text-[#F97316]",
      title: "Fever Record",
      description: "High temperature recorded over 2 days.",
      category: "Problems",
      type: "fever",
    },
    {
      id: 3,
      date: "10 Aug 2025",
      icon: <Pill className="w-5 h-5" />,
      iconBgColor: "bg-[#EAF6ED]",
      iconColor: "text-[#48A96F]",
      title: "Paracetamol 50mg – 2x daily",
      description: "Prescribed for 5 days.",
      category: "Prescription",
      type: "prescription",
    },
    {
      id: 4,
      date: "08 Aug 2025",
      icon: <FlaskConical className="w-5 h-5" />,
      iconBgColor: "bg-[#F2EFFE]",
      iconColor: "text-[#6A5AF9]",
      title: "Blood Test Report",
      description: "PDF report attached.",
      category: "Lab Results",
      type: "blood",
    },
    {
      id: 5,
      date: "07 Aug 2025",
      icon: <FlaskConical className="w-5 h-5" />,
      iconBgColor: "bg-[#F2EFFE]",
      iconColor: "text-[#6A5AF9]",
      title: "X-Ray Chest",
      description: "Image report attached.",
      category: "Lab Results",
      type: "xray",
    },
  ];

  const categories = ["Problems", "Prescription", "Lab Results"];

  const filteredRecords =
    activeCategory === "All"
      ? records
      : records.filter((rec) => rec.category === activeCategory);

  // ✅ Convert image to base64
  const loadImage = (src: string) => {
    return new Promise<string>((resolve) => {
      const img = new window.Image();
      img.crossOrigin = "Anonymous";
      img.src = src;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      };
    });
  };

  // ✅ Report Generators
  const generateReport = async (type: RecordItem["type"]) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Patient Medical Report", 105, 20, { align: "center" });

    doc.setFontSize(12);
    doc.text("Patient: John Doe", 20, 40);
    doc.text("Age: 45", 20, 48);
    doc.text("Doctor: Dr. Smith", 20, 56);
    doc.text("Date: 16 Aug 2025", 20, 64);

    doc.setFontSize(14);
    doc.text("Findings:", 20, 80);
    doc.setFontSize(12);

    if (type === "blood") {
      doc.text("- Hemoglobin: 13.5 g/dL (Normal)", 25, 95);
      doc.text("- WBC Count: 12,000 /µL (Slightly High)", 25, 105);
      doc.text("- Platelets: 250,000 /µL (Normal)", 25, 115);
      doc.text("Remarks: Suggests mild infection, recommend antibiotics.", 20, 135);
      doc.save("Blood_Report.pdf");
    }

    if (type === "xray") {
      doc.text("- Chest X-Ray shows mild lung infection.", 25, 95);
      doc.text("- No fractures detected.", 25, 105);
      doc.text("- Recommendation: 5-day antibiotic course.", 25, 115);
      const img = await loadImage("/x-ray.png"); // keep in /public
      doc.addImage(img, "PNG", 20, 140, 160, 100);
      doc.save("XRay_Report.pdf");
    }

    if (type === "headache") {
      doc.text("- Patient reports dizziness and nausea.", 25, 95);
      doc.text("- Pain localized in forehead region.", 25, 105);
      doc.text("- Recommendation: Rest, hydration, mild analgesics.", 25, 115);
      doc.save("Headache_Report.pdf");
    }

    if (type === "fever") {
      doc.text("- Temperature recorded: 102°F (Day 1)", 25, 95);
      doc.text("- Temperature recorded: 101°F (Day 2)", 25, 105);
      doc.text("- Slight body aches and weakness observed.", 25, 115);
      doc.text("Recommendation: Paracetamol + Fluids", 20, 135);
      doc.save("Fever_Report.pdf");
    }

    if (type === "prescription") {
      doc.text("- Paracetamol 50mg – twice daily (5 days)", 25, 95);
      doc.text("- Vitamin C tablets – once daily (7 days)", 25, 105);
      doc.text("- ORS solution recommended for hydration", 25, 115);
      doc.save("Prescription.pdf");
    }
  };

  return (
    <main className="h-screen w-full bg-gray-100 flex justify-center font-sans overflow-hidden">
      <div className="w-[390px] h-full bg-white rounded-3xl shadow-xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-cyan-400 rounded-b-3xl px-4 pt-4 pb-20 relative font-semibold">
          <div className="w-24 h-5 bg-white rounded-b-full mx-auto absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />

          <div className="flex items-center justify-start mt-4">
            {activeCategory !== "All" ? (
              <button
                onClick={() => setActiveCategory("All")}
                className="text-white text-sm font-semibold"
              >
                ←
              </button>
            ) : (
              <span />
            )}
            <p className="text-white text-xl font-extrabold leading-snug text-left">
              My Records
            </p>
            <span />
          </div>

          {/* Category Tabs */}
          <div className="absolute left-4 right-4 top-28 bg-white rounded-2xl p-2 shadow-md font-semibold">
            <div className="flex space-x-2 overflow-x-auto no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-sm rounded-full transition-all whitespace-nowrap ${
                    activeCategory === cat
                      ? "bg-cyan-400 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="h-12" />

        {/* ✅ Only this part scrolls */}
        <div className="flex-1 overflow-y-auto px-4 space-y-4 mb-20 no-scrollbar">
          {filteredRecords.map((record) => (
            <button
              key={record.id}
              onClick={() => setSelectedRecord(record)}
              className="w-full bg-white rounded-2xl shadow p-4 flex items-start space-x-3 text-left hover:bg-gray-50"
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${record.iconBgColor}`}
              >
                <span className={record.iconColor}>{record.icon}</span>
              </div>
              <div className="flex flex-col">
                <p className="text-xs text-gray-400">{record.date}</p>
                <p className="text-base font-semibold text-gray-800">
                  {record.title}
                </p>
                <p className="text-sm text-gray-500">{record.description}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Record Modal */}
        {selectedRecord && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white w-[320px] rounded-2xl p-6 text-center shadow-lg relative">
              <h2 className="text-lg font-semibold text-gray-800">
                {selectedRecord.title}
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                {selectedRecord.description}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Date: {selectedRecord.date}
              </p>

              <div className="mt-4">
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <FileText className="w-6 h-6" />
                  <span className="text-sm">Report Available</span>
                </div>

                {selectedRecord.type && (
                  <button
                    onClick={() => generateReport(selectedRecord.type)}
                    className="mt-4 flex items-center justify-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600 mx-auto"
                  >
                    <FileDown className="w-4 h-4" />
                    Download Report
                  </button>
                )}
              </div>

              <button
                onClick={() => setSelectedRecord(null)}
                className="mt-4 bg-cyan-500 text-white px-6 py-2 rounded-xl hover:bg-cyan-600"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Bottom Navigation */}
<div
  className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-[390px] z-40 transition ${
    selectedRecord ? "blur-sm pointer-events-none" : ""
  }`}
>
  <div className="bg-white rounded-t-2xl shadow-lg py-3 px-6 flex rounded-3xl shadow-xl overflow-hidden justify-between items-center">
    <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }}>
      <Link
        href="/patient/home"
        className="flex flex-col items-center text-gray-600 hover:text-blue-500"
      >
        <Image src="/find.png" width={28} height={28} alt="Home" />
        <span className="text-xs">Find a Doctor</span>
      </Link>
    </motion.div>
    <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }}>
      <Link
        href="/patient/appointment"
        className="flex flex-col items-center text-gray-600 hover:text-blue-500"
      >
        <Image src="/schedule.png" width={28} height={28} alt="Appointments" />
        <span className="text-xs">Appointments</span>
      </Link>
    </motion.div>
    <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }}>
      <Link
        href="/patient/record"
        className="flex flex-col items-center text-gray-600 hover:text-blue-500"
      >
        <Image src="/record.png" width={28} height={28} alt="Consult" />
        <span className="text-xs">Record</span>
      </Link>
    </motion.div>
    <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }}>
      <Link
        href="/patient/profile"
        className="flex flex-col items-center text-gray-600 hover:text-blue-500"
      >
        <Image src="/profile.png" width={28} height={28} alt="Profile" />
        <span className="text-xs">Profile</span>
      </Link>
    </motion.div>
  </div>
</div>

      </div>
    </main>
  );
}
