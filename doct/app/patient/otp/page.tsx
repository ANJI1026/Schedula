'use client';

import { useState, useEffect } from 'react';
import { FaArrowLeft, FaBackspace } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function OtpPage() {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const [activeIndex, setActiveIndex] = useState(0);
  const [timer, setTimer] = useState(55);

  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleKeyPress = (value: string) => {
    if (value === 'back') {
      if (activeIndex > 0 || otp[activeIndex] !== '') {
        const newOtp = [...otp];
        if (otp[activeIndex] === '' && activeIndex > 0) {
          newOtp[activeIndex - 1] = '';
          setActiveIndex(activeIndex - 1);
        } else {
          newOtp[activeIndex] = '';
        }
        setOtp(newOtp);
      }
      return;
    }
    if (activeIndex < 4) {
      const newOtp = [...otp];
      newOtp[activeIndex] = value;
      setOtp(newOtp);
      if (activeIndex < 3) {
        setActiveIndex(activeIndex + 1);
      }
    }
  };

  const handleSubmit = () => {
    if (otp.join('').length === 4) {
      router.push('/patient/home');
    }
  };

  return (
    <div className="flex justify-center bg-white min-h-screen">
      <div className="w-[390px] bg-white min-h-screen rounded-3xl shadow-xl overflow-hidden relative flex flex-col">

        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-4 shadow-md bg-white sticky top-0 z-10">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-cyan-50 transition"
          >
            <FaArrowLeft className="text-cyan-500 text-lg" />
          </button>
          <h1 className="text-lg font-semibold text-cyan-600">OTP Verification</h1>
        </div>

        {/* Info */}
        <p className="text-center text-gray-700 text-sm mt-6 mb-4 px-6">
          We have sent a code to{" "}
          <span className="font-medium text-cyan-600">+91 529 ******50</span>
        </p>

        {/* OTP Boxes */}
        <div className="flex justify-center gap-4 mb-6 px-6">
          {otp.map((digit, idx) => (
            <div
              key={idx}
              className={`w-14 h-14 flex items-center justify-center rounded-xl text-lg font-bold border-2 transition-all ${
                idx === activeIndex
                  ? 'border-cyan-500 shadow-md bg-cyan-50 text-cyan-600'
                  : 'border-cyan-200 bg-white text-cyan-500'
              }`}
            >
              {digit}
            </div>
          ))}
        </div>

        {/* Resend */}
        <p className="text-center text-sm mb-6 text-gray-600">
          Resend code in{" "}
          <span className="text-cyan-500 font-semibold">{timer}s</span>
        </p>

        {/* Verify Button */}
        <div className="px-6 mb-6">
          <button
            onClick={handleSubmit}
            disabled={otp.some((v) => !v)}
            className={`w-full py-3 rounded-xl text-white font-semibold shadow-lg transition ${
              otp.some((v) => !v)
                ? 'bg-cyan-300 cursor-not-allowed'
                : 'bg-cyan-500 hover:bg-cyan-600'
            }`}
          >
            Verify
          </button>
        </div>

        {/* Custom Keypad */}
        <div className="mt-auto bg-cyan-50 rounded-t-3xl p-6 shadow-inner">
          <div className="grid grid-cols-3 gap-4 mb-4">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'back'].map(
              (key, idx) => (
                <button
                  key={idx}
                  onClick={() => key && handleKeyPress(key)}
                  className={`h-14 flex items-center justify-center rounded-full bg-white shadow-md text-lg font-semibold text-cyan-600 active:bg-cyan-100 transition-all ${
                    key === '' ? 'invisible' : ''
                  }`}
                >
                  {key === 'back' ? (
                    <FaBackspace className="text-cyan-600" />
                  ) : (
                    key
                  )}
                </button>
              )
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
