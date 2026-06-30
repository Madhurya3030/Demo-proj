import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function HomeScreen({ setMissionText }) {
  const navigate = useNavigate();
  const defaultPlaceholder = "I have my cousin's engagement next week. Budget ₹2500. Need a saree, matching heels, earrings, clutch and a gift.";
  const [inputText, setInputText] = useState("");

  const handleStart = () => {
    const textToSubmit = inputText.trim() || defaultPlaceholder;
    setMissionText(textToSubmit);
    navigate('/processing');
  };

  const fillSuggested = (text) => {
    setInputText(text);
  };

  // Mock categories list matching Meesho's categories feed
  const categoriesList = [
    { title: "Sarees & Ethnic", desc: "Flat 50% Off", icon: "👗" },
    { title: "Party Footwear", desc: "Under ₹499", icon: "👠" },
    { title: "Fashion Jewelry", desc: "Starting ₹99", icon: "💎" },
    { title: "Clutches & Bags", desc: "Min 40% Off", icon: "👜" },
    { title: "Occasion Gifts", desc: "Best Offers", icon: "🎁" }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Page Title & Subtitle */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-meesho-textDark mb-2 tracking-tight">
          AI Shopping Companion
        </h1>
        <p className="text-sm text-meesho-textMuted max-w-xl mx-auto leading-relaxed">
          Tell us your shopping goal and our AI will recommend the best products for your occasion, budget, and delivery timeline.
        </p>
      </div>

      {/* Hero Section Card */}
      <div className="bg-white border border-meesho-borderLight rounded-lg p-6 md:p-8 shadow-sm mb-10">
        <div className="flex items-center gap-2 mb-4 text-meesho-purple">
          <Sparkles size={20} />
          <h2 className="text-lg font-bold text-meesho-textDark">
            What are you shopping for today?
          </h2>
        </div>

        {/* Input Textarea */}
        <div className="mb-4">
          <textarea
            className="w-full h-32 p-4 border border-meesho-borderLight rounded-md bg-meesho-bgLight text-sm text-meesho-textDark placeholder-meesho-textMuted focus:outline-none focus:border-meesho-purple focus:ring-1 focus:ring-meesho-purple resize-none"
            placeholder={defaultPlaceholder}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>

        {/* Suggested Prompts */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-meesho-textMuted font-medium">Quick Goals:</span>
            <button 
              type="button"
              className="text-xs px-2.5 py-1 border border-meesho-borderLight hover:border-meesho-purple text-meesho-textDark rounded-full bg-white hover:bg-meesho-bgLight transition"
              onClick={() => fillSuggested("Haldi ceremony ceremony outfit. Budget ₹1800. Kurta set, yellow jhumkas, flats, and hair clips.")}
            >
              💛 Haldi Ceremony (₹1.8K)
            </button>
            <button 
              type="button"
              className="text-xs px-2.5 py-1 border border-meesho-borderLight hover:border-meesho-purple text-meesho-textDark rounded-full bg-white hover:bg-meesho-bgLight transition"
              onClick={() => fillSuggested("Office dinner party next Friday. Budget ₹3000. Western formal dress, black pumps, minimal earrings, clutch bag.")}
            >
              💼 Office Dinner (₹3K)
            </button>
          </div>

          <button 
            type="button"
            className="px-6 py-2.5 bg-meesho-purple hover:bg-meesho-hoverPurple text-white font-bold rounded text-sm transition flex items-center justify-center gap-1.5 shadow-sm"
            onClick={handleStart}
          >
            <span>Generate Recommendations</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Category Links for Normal Meesho Vibe */}
      <div>
        <h3 className="text-sm font-bold text-meesho-textDark mb-4 uppercase tracking-wider">
          Shop Occasion Favorites
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categoriesList.map((cat, i) => (
            <div 
              key={i} 
              className="bg-white border border-meesho-borderLight rounded-lg p-4 text-center cursor-pointer hover:border-meesho-purple hover:shadow-sm transition"
              onClick={() => fillSuggested(`Looking for ${cat.title}. Budget ₹1500. Must have matching accessories.`)}
            >
              <div className="text-3xl mb-2">{cat.icon}</div>
              <h4 className="text-xs font-bold text-meesho-textDark mb-0.5">{cat.title}</h4>
              <p className="text-[10px] text-meesho-pink font-semibold">{cat.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Explanations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-meesho-borderLight">
        <div className="flex gap-3">
          <CheckCircle2 className="text-meesho-purple shrink-0" size={18} />
          <div>
            <h4 className="text-xs font-bold text-meesho-textDark mb-1">Occasion Matching</h4>
            <p className="text-[11px] text-meesho-textMuted leading-relaxed">AI coordinates designs, colors, and themes to match your wedding, office, or festival goals.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <CheckCircle2 className="text-meesho-purple shrink-0" size={18} />
          <div>
            <h4 className="text-xs font-bold text-meesho-textDark mb-1">Hard Budget Guard</h4>
            <p className="text-[11px] text-meesho-textMuted leading-relaxed">Ensures the combined bundle cost respects your budget limit, applying coupons automatically.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <CheckCircle2 className="text-meesho-purple shrink-0" size={18} />
          <div>
            <h4 className="text-xs font-bold text-meesho-textDark mb-1">Confidence Score</h4>
            <p className="text-[11px] text-meesho-textMuted leading-relaxed">Displays an AI matching score with exact reasoning on why each product was chosen.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
