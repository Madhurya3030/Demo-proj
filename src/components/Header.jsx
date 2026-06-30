import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, Heart, ShoppingCart, Sparkles } from 'lucide-react';

export default function Header({ cartCount = 5 }) {
  const navigate = useNavigate();

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
          <Link 
            to="/" 
            className="flex items-center gap-1.5 px-3 py-2 border border-meesho-purple text-meesho-purple rounded-md hover:bg-meesho-purple hover:text-white transition duration-200 text-xs font-bold whitespace-nowrap animate-pulse"
          >
            <Sparkles size={14} />
            <span>AI Companion</span>
          </Link>
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
          <div className="flex flex-col items-center cursor-pointer group hover:text-[#F43397] transition relative">
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
    </header>
  );
}
