"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

// Dynamically import map to avoid SSR issues
const MapPicker = dynamic(() => import("@/components/MapPicker"), {
  ssr: false,
});

export default function EditProfilePage() {
  const router = useRouter();
  const profile = useProfileStore();
  const setProfile = useProfileStore((state) => state.setProfile);

  const [localProfile, setLocalProfile] = useState({
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
    bio: profile.bio,
    photo: profile.photo,
    location: profile.location,
  });

  const [showMap, setShowMap] = useState(false);

  const handleSave = () => {
    setProfile(localProfile);
    router.push("/doctor/profile");
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setLocalProfile((prev) => ({ ...prev, photo: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen w-full flex bg-gray-100 p-4 justify-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto bg-white rounded-xl shadow-md p-5 space-y-5"
      >
        {/* Profile Photo */}
        <div className="flex flex-col items-center">
          <img
            src={localProfile.photo}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border"
          />
          <label className="mt-2 cursor-pointer text-cyan-500 hover:underline text-sm">
            Change Photo
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />
          </label>
        </div>

        {/* Editable Fields */}
        {["name", "email", "phone", "bio"].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium capitalize mb-1">
              {field}
            </label>
            <input
              type="text"
              value={(localProfile as any)[field]}
              onChange={(e) =>
                setLocalProfile((prev) => ({
                  ...prev,
                  [field]: e.target.value,
                }))
              }
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        ))}

        {/* Location Field */}
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={localProfile.location}
              readOnly
              className="w-full border rounded-lg px-3 py-2 text-sm bg-gray-50"
            />
            <button
              onClick={() => setShowMap(true)}
              className="bg-cyan-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-cyan-600"
            >
              📍
            </button>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-cyan-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-cyan-600"
        >
          Save Changes
        </button>
      </motion.div>

      {/* Map Popup */}
      {showMap && (
        <MapPicker
          onSelectLocation={(loc) => {
            setLocalProfile((prev) => ({ ...prev, location: loc }));
            setShowMap(false);
          }}
          onClose={() => setShowMap(false)}
        />
      )}
    </div>
  );
}
