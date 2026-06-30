import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Check } from 'lucide-react';

export default function ProcessingScreen() {
  const navigate = useNavigate();
  const [steps, setSteps] = useState([
    { text: "Understanding your shopping mission", done: false },
    { text: "Fashion Agent finding matching outfits", done: false },
    { text: "Budget Agent optimizing recommendations", done: false },
    { text: "Coupon Agent checking offers", done: false },
    { text: "Inventory Agent checking availability", done: false },
    { text: "Delivery Agent verifying delivery dates", done: false }
  ]);

  useEffect(() => {
    // Tick off steps sequentially
    const tickInterval = 400; // tick every 400ms

    const timers = [];
    
    steps.forEach((_, idx) => {
      timers.push(setTimeout(() => {
        setSteps(prev => prev.map((s, sIdx) => sIdx === idx ? { ...s, done: true } : s));
      }, idx * tickInterval));
    });

    // Navigate to recommendations after 2.6 seconds
    timers.push(setTimeout(() => {
      navigate('/recommendations');
    }, steps.length * tickInterval + 300));

    return () => timers.forEach(clearTimeout);
  }, [navigate]);

  return (
    <div className="max-w-md mx-auto px-4 py-16 text-meesho-textDark">
      <div className="bg-white border border-meesho-borderLight rounded-lg p-6 shadow-sm">
        {/* Rufus Style Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-meesho-borderLight">
          <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-meesho-purple border border-purple-100">
            <Sparkles size={20} />
          </div>
          <div>
            <h3 className="text-sm font-bold">Meesho AI Companion</h3>
            <p className="text-[11px] text-meesho-textMuted">Running optimization pipeline...</p>
          </div>
        </div>

        {/* List of actions */}
        <div className="space-y-4">
          {steps.map((step, idx) => (
            <div key={idx} className="flex items-center gap-3 text-xs">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${
                step.done 
                  ? "bg-[#E8F5E9] border-[#A5D6A7] text-[#2E7D32]" 
                  : "bg-white border-meesho-borderLight text-meesho-textMuted"
              }`}>
                {step.done ? (
                  <Check size={11} strokeWidth={3} />
                ) : (
                  <div className="w-1.5 h-1.5 rounded-full bg-meesho-textMuted animate-ping"></div>
                )}
              </div>
              <span className={`transition duration-300 ${
                step.done ? "text-meesho-textDark font-medium" : "text-meesho-textMuted"
              }`}>
                {step.text}
              </span>
            </div>
          ))}
        </div>

        {/* Small Progress Line */}
        <div className="mt-8 h-1 w-full bg-meesho-bgLight rounded overflow-hidden">
          <div className="h-full bg-meesho-purple rounded animate-pulse" style={{ width: '80%' }}></div>
        </div>
      </div>
    </div>
  );
}
