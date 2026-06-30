import React, { useState } from 'react';
import { Sparkles, Star, Heart, ShoppingBag } from 'lucide-react';
import { getHomepageProducts } from '../data/mockData';

export default function HomeScreen({ onSelectProduct, onAddToCart, onBuyNow }) {
  const homepageProducts = getHomepageProducts();
  const [wishlist, setWishlist] = useState({});

  const toggleWishlist = (id, e) => {
    e.stopPropagation();
    setWishlist(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const sections = [
    { key: "trending", name: "Trending Products" },
    { key: "recommended", name: "Recommended For You" },
    { key: "best_sellers", name: "Best Sellers" },
    { key: "deals_under_499", name: "Deals Under ₹499" },
    { key: "womens_fashion", name: "Women's Fashion" },
    { key: "jewellery", name: "Jewellery" },
    { key: "home_essentials", name: "Home Essentials" },
    { key: "beauty", name: "Beauty" },
    { key: "electronics", name: "Electronics" }
  ];

  const categoriesCircle = [
    { title: "Trending", icon: "🔥", key: "trending" },
    { title: "Recommended", icon: "🌟", key: "recommended" },
    { title: "Best Sellers", icon: "🏆", key: "best_sellers" },
    { title: "Deals", icon: "💰", key: "deals_under_499" },
    { title: "Women's", icon: "👗", key: "womens_fashion" },
    { title: "Jewellery", icon: "💎", key: "jewellery" },
    { title: "Home", icon: "🏠", key: "home_essentials" },
    { title: "Beauty", icon: "💄", key: "beauty" },
    { title: "Electronics", icon: "🎧", key: "electronics" }
  ];

  const scrollToSection = (key) => {
    const el = document.getElementById(`section-${key}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 text-meesho-textDark">
      
      {/* Large Meesho-style Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#F43397] to-[#7f1d1d] p-8 text-white mb-10 shadow-md">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-12 translate-x-12"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/20 rounded-full blur-2xl translate-y-12 -translate-x-12"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl text-center md:text-left">
            <span className="bg-white/20 text-white text-[11px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full">
              ⚡ Lowest Prices • Free Delivery • Easy COD ⚡
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Maha Indian Savings League
            </h1>
            <p className="text-sm md:text-base text-pink-100 font-medium">
              Explore curated quality products across multiple categories with up to 70% Off!
            </p>
            
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 bg-white text-[#F43397] font-black text-xs px-4.5 py-2.5 rounded-lg shadow-sm border border-pink-100 select-none">
                <Sparkles size={14} className="animate-pulse text-[#F43397]" />
                <span>Try 🤖 Saheli in the header to get custom lookbooks instantly!</span>
              </div>
            </div>
          </div>

          {/* AI Helper Banner Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-5 max-w-sm text-xs space-y-3.5 shadow-lg w-full text-left">
            <div className="flex items-center gap-2">
              <span className="text-lg">🤖</span>
              <span className="font-extrabold text-sm text-white">Saheli</span>
            </div>
            <p className="text-white/80 leading-relaxed font-medium">
              Need a coordinated saree, matching heels, clutches, and gifts within a strict budget? Open Saheli from the header and input your budget limit!
            </p>
            <div className="text-[11px] font-bold text-pink-200 uppercase tracking-wide">
              👉 Try it next to the search bar!
            </div>
          </div>
        </div>
      </div>

      {/* Circle Categories Navigation Bar */}
      <div className="mb-12">
        <h3 className="text-xs font-black uppercase text-meesho-textMuted tracking-widest mb-4 text-center md:text-left">
          Shop Categories
        </h3>
        <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide justify-start md:justify-between px-1 select-none">
          {categoriesCircle.map((cat, i) => (
            <button 
              key={i} 
              type="button"
              className="flex flex-col items-center shrink-0 cursor-pointer group focus:outline-none"
              onClick={() => scrollToSection(cat.key)}
            >
              <div className="w-16 h-16 rounded-full bg-white border border-meesho-borderLight shadow-sm flex items-center justify-center text-3xl group-hover:border-[#F43397] group-hover:scale-105 transition duration-200 mb-2">
                {cat.icon}
              </div>
              <span className="text-xs font-bold text-meesho-textDark group-hover:text-[#F43397] transition">
                {cat.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 9 Rows of Product Grids */}
      <div className="space-y-12">
        {sections.map((sec) => {
          const secProducts = homepageProducts.filter(p => p.section === sec.key);
          
          return (
            <div key={sec.key} id={`section-${sec.key}`} className="space-y-4 pt-2">
              <div className="flex justify-between items-center border-b border-meesho-borderLight pb-2">
                <h2 className="text-lg font-black text-meesho-textDark tracking-tight flex items-center gap-1.5">
                  <ShoppingBag size={18} className="text-[#F43397]" />
                  {sec.name}
                </h2>
                <span className="text-xs text-meesho-textMuted font-bold">10 Products Available</span>
              </div>

              {/* Grid Layout (5 columns, 2 rows total of 10 products) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
                {secProducts.map((p) => (
                  <div 
                    key={p.id}
                    className="bg-white border border-meesho-borderLight rounded-lg overflow-hidden shadow-sm flex flex-col group relative"
                  >
                    {/* Image Section */}
                    <div 
                      onClick={() => onSelectProduct && onSelectProduct(p)}
                      className="relative aspect-square bg-meesho-bgLight flex items-center justify-center overflow-hidden cursor-pointer"
                    >
                      <img 
                        src={p.image} 
                        alt={p.name} 
                        className="w-full h-full object-cover group-hover:scale-103 transition duration-200" 
                      />

                      {/* Wishlist Heart */}
                      <button 
                        type="button"
                        className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white border border-meesho-borderLight flex items-center justify-center text-meesho-textMuted hover:text-red-500 shadow-sm cursor-pointer hover:scale-105 transition animate-none"
                        onClick={(e) => toggleWishlist(p.id, e)}
                      >
                        <Heart 
                          size={14} 
                          fill={wishlist[p.id] ? "#F43397" : "none"} 
                          className={wishlist[p.id] ? "text-[#F43397]" : ""} 
                        />
                      </button>
                    </div>

                    {/* Product Metadata Info */}
                    <div className="p-3.5 flex-1 flex flex-col justify-between">
                      <div className="space-y-1.5">
                        <h4 
                          onClick={() => onSelectProduct && onSelectProduct(p)}
                          className="text-xs text-meesho-textMuted font-bold truncate hover:text-[#F43397] transition cursor-pointer"
                        >
                          {p.name}
                        </h4>

                        {/* Pricing */}
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-sm font-extrabold text-meesho-textDark">₹{p.price}</span>
                          <span className="text-[10px] text-meesho-textMuted line-through">₹{p.originalPrice}</span>
                          <span className="text-[10px] text-green-600 font-extrabold">
                            {p.discount}% Off
                          </span>
                        </div>

                        {/* Rating Indicator & Delivery Status */}
                        <div className="flex items-center gap-2 pt-0.5 flex-wrap">
                          <div className="bg-[#E8F5E9] text-[#2E7D32] text-[10px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5 select-none">
                            <span>{p.rating}</span>
                            <Star size={8} fill="currentColor" />
                          </div>
                          {p.freeDelivery && (
                            <span className="text-[9px] text-meesho-textMuted font-bold border border-meesho-borderLight px-1.5 py-0.5 rounded bg-meesho-bgLight">
                              Free Delivery
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action buttons inside product card */}
                      <div className="mt-3.5 pt-3 border-t border-meesho-borderLight flex gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onAddToCart) onAddToCart(p);
                            alert(`"${p.name}" has been added to your cart!`);
                          }}
                          className="flex-1 py-1.5 border border-[#F43397] text-[#F43397] hover:bg-[#F43397]/5 text-[11px] font-bold rounded transition cursor-pointer text-center"
                        >
                          Add to Cart
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onBuyNow) onBuyNow(p);
                          }}
                          className="flex-1 py-1.5 bg-[#F43397] hover:bg-[#cf1b78] text-white text-[11px] font-bold rounded transition cursor-pointer text-center"
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
