import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, Heart, ShoppingCart, Sparkles, X, ArrowRight } from 'lucide-react';

export default function Header({ cartCount = 5, setMissionText, setCheckoutSource }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  
  const defaultPrompt = "I have my cousin's engagement next week. Budget ₹2500. Need a saree, matching heels, earrings, clutch and a gift.";

  const handleStart = () => {
    const textToSubmit = inputText.trim() || defaultPrompt;
    setMissionText(textToSubmit);
    setIsModalOpen(false);
    navigate('/processing');
  };

  const fillSuggested = (text) => {
    setInputText(text);
  };

  return (
    <header className="bg-white border-b border-meesho-borderLight sticky top-0 z-50">
      {/* Top Main Nav */}
      <div className="max-w-7xl mx-auto px-4 h-18 flex items-center justify-between gap-6 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1 select-none">
          <span className="text-3xl font-extrabold text-[#F43397] tracking-tight meesho-logo-text">meesho</span>
        </Link>

        {/* Search & AI Companion Highlight */}
        <div className="flex-1 max-w-2xl flex items-center gap-3">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-meesho-textMuted" />
            <input 
              type="text" 
              placeholder="Try Saree, Kurti or Search by Product Code" 
              className="w-full pl-11 pr-4 py-2.5 border border-meesho-borderLight rounded-md text-sm text-meesho-textDark focus:outline-none focus:border-meesho-purple bg-meesho-bgLight meesho-search-input"
              disabled
            />
          </div>
          
          {/* Highlighted AI Companion Banner Option */}
          <button 
            type="button"
            onClick={() => {
              setInputText(defaultPrompt);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-[#F43397] to-[#7f1d1d] hover:from-[#cf1b78] hover:to-[#5c1313] text-white rounded-md transition duration-200 text-sm font-extrabold whitespace-nowrap shadow-sm hover:scale-102 active:scale-98 cursor-pointer"
          >
            <Sparkles size={15} />
            <span>🤖 Saheli</span>
          </button>
        </div>

        {/* Action Links */}
        <div className="flex items-center gap-6 text-sm text-meesho-textDark font-medium">
          <div className="hidden md:block hover:text-[#F43397] cursor-pointer">Download App</div>
          <div className="hidden md:block hover:text-[#F43397] cursor-pointer">Become a Supplier</div>
          <div className="hidden md:block hover:text-[#F43397] cursor-pointer">Newsroom</div>
          
          <div className="h-6 w-px bg-meesho-borderLight hidden md:block"></div>

          {/* Profile */}
          <div className="flex flex-col items-center cursor-pointer group hover:text-[#F43397] transition">
            <User size={20} className="group-hover:scale-105 transition" />
            <span className="text-xs mt-0.5">Profile</span>
          </div>

          {/* Wishlist */}
          <div className="flex flex-col items-center cursor-pointer group hover:text-[#F43397] transition">
            <Heart size={20} className="group-hover:scale-105 transition" />
            <span className="text-xs mt-0.5">Wishlist</span>
          </div>

          {/* Cart */}
          <div 
            onClick={() => {
              if (setCheckoutSource) {
                setCheckoutSource('normal');
              }
              navigate('/checkout');
            }}
            className="flex flex-col items-center cursor-pointer group hover:text-[#F43397] transition relative"
          >
            <ShoppingCart size={20} className="group-hover:scale-105 transition" />
            <span className="text-xs mt-0.5">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#F43397] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Subnav (Category Tabs) */}
      <div className="border-t border-meesho-borderLight hidden lg:block bg-white">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-sm text-meesho-textDark font-normal py-3.5 select-none">
          <span className="hover:text-[#F43397] hover:border-b-2 hover:border-[#F43397] pb-1 cursor-pointer">Women Ethnic</span>
          <span className="hover:text-[#F43397] hover:border-b-2 hover:border-[#F43397] pb-1 cursor-pointer">Women Western</span>
          <span className="hover:text-[#F43397] hover:border-b-2 hover:border-[#F43397] pb-1 cursor-pointer">Men</span>
          <span className="hover:text-[#F43397] hover:border-b-2 hover:border-[#F43397] pb-1 cursor-pointer">Kids</span>
          <span className="hover:text-[#F43397] hover:border-b-2 hover:border-[#F43397] pb-1 cursor-pointer">Home & Kitchen</span>
          <span className="hover:text-[#F43397] hover:border-b-2 hover:border-[#F43397] pb-1 cursor-pointer">Beauty & Health</span>
          <span className="hover:text-[#F43397] hover:border-b-2 hover:border-[#F43397] pb-1 cursor-pointer">Jewellery & Accessories</span>
          <span className="hover:text-[#F43397] hover:border-b-2 hover:border-[#F43397] pb-1 cursor-pointer">Bags & Footwear</span>
          <span className="hover:text-[#F43397] hover:border-b-2 hover:border-[#F43397] pb-1 cursor-pointer">Electronics</span>
        </div>
      </div>

      {/* Centered Modal Dialogue */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          {/* Modal Container */}
          <div className="bg-white border border-meesho-borderLight rounded-xl max-w-lg w-full p-6 shadow-2xl relative overflow-hidden flex flex-col gap-4 animate-[scaleUp_0.2s_ease-out]">
            
            {/* Header section with Meesho Pink theme */}
            <div className="flex justify-between items-center pb-3 border-b border-meesho-borderLight">
              <div className="flex items-center gap-2 text-meesho-purple">
                <Sparkles size={20} className="text-[#F43397]" />
                <h2 className="text-base font-extrabold text-meesho-textDark">
                  Saheli – Your AI Shopping Companion
                </h2>
              </div>
              <button 
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-meesho-textMuted hover:text-meesho-textDark p-1 hover:bg-meesho-bgLight rounded-full transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Prompt description */}
            <div className="text-xs text-meesho-textMuted leading-relaxed">
              Tell us your occasion, budget, and specific items. Saheli will curate a personalized bundle, apply coupons, and consolidate delivery.
            </div>

            {/* Input Textarea */}
            <div>
              <textarea
                className="w-full h-32 p-3.5 border border-meesho-borderLight rounded-lg bg-meesho-bgLight text-sm text-meesho-textDark placeholder-meesho-textMuted focus:outline-none focus:border-[#F43397] focus:ring-2 focus:ring-[#F43397]/20 resize-none font-medium"
                placeholder={defaultPrompt}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </div>

            {/* Quick Suggest Prompt Pills */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold text-meesho-textMuted tracking-wider block">Quick Occasions:</span>
              <div className="flex flex-wrap gap-2">
                <button 
                  type="button"
                  className="text-xs px-3 py-1.5 border border-meesho-borderLight hover:border-[#F43397] text-meesho-textDark rounded-full bg-white hover:bg-meesho-bgLight font-medium transition cursor-pointer"
                  onClick={() => fillSuggested("Haldi ceremony outfit. Budget ₹1800. Kurta set, yellow jhumkas, flats, and hair clips.")}
                >
                  💛 Haldi Ceremony (₹1.8K)
                </button>
                <button 
                  type="button"
                  className="text-xs px-3 py-1.5 border border-meesho-borderLight hover:border-[#F43397] text-meesho-textDark rounded-full bg-white hover:bg-meesho-bgLight font-medium transition cursor-pointer"
                  onClick={() => fillSuggested("Office dinner party next Friday. Budget ₹3000. Western formal dress, black pumps, minimal earrings, clutch bag.")}
                >
                  💼 Office Dinner (₹3K)
                </button>
                <button 
                  type="button"
                  className="text-xs px-3 py-1.5 border border-meesho-borderLight hover:border-[#F43397] text-meesho-textDark rounded-full bg-white hover:bg-meesho-bgLight font-medium transition cursor-pointer"
                  onClick={() => fillSuggested("Sunday brunch party. Budget ₹1500. Floral print dress, white sandals, canvas tote bag.")}
                >
                  🌸 Sunday Brunch (₹1.5K)
                </button>
              </div>
            </div>

            {/* Footer buttons */}
            <div className="flex gap-3 pt-2 border-t border-meesho-borderLight mt-1">
              <button 
                type="button"
                className="flex-1 py-2.5 bg-[#F43397] hover:bg-[#cf1b78] text-white font-bold rounded-lg text-sm transition flex items-center justify-center gap-1.5 shadow-md active:scale-98 cursor-pointer"
                onClick={handleStart}
              >
                <span>Generate Recommendations</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
