import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Star, Heart, ArrowRight, ShieldCheck, Filter } from 'lucide-react';

export default function RecommendationsScreen({ 
  allProducts = [], 
  products = [], // Selected bundle
  missionText, 
  onSelectProduct 
}) {
  const navigate = useNavigate();

  // Filter States
  const [selectedPriceFilter, setSelectedPriceFilter] = useState("All");
  const [selectedRatingFilter, setSelectedRatingFilter] = useState("All");
  const [selectedMatchFilter, setSelectedMatchFilter] = useState("All");
  const [selectedDeliveryFilter, setSelectedDeliveryFilter] = useState("All");

  const [savedItems, setSavedItems] = useState({});

  // Toggle Save
  const toggleSave = (id, e) => {
    e.stopPropagation();
    setSavedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Filter Logic
  const filterProduct = (p) => {
    // Price Filter
    if (selectedPriceFilter === "Under ₹300" && p.price > 300) return false;
    if (selectedPriceFilter === "Under ₹500" && p.price > 500) return false;
    if (selectedPriceFilter === "Under ₹1000" && p.price > 1000) return false;

    // Rating Filter
    const ratingNum = parseFloat(p.rating);
    if (selectedRatingFilter === "4.5★ & Above" && ratingNum < 4.5) return false;
    if (selectedRatingFilter === "4.2★ & Above" && ratingNum < 4.2) return false;

    // Match Filter
    const matchNum = parseInt(p.matchScore);
    if (selectedMatchFilter === "95% & Above" && matchNum < 95) return false;
    if (selectedMatchFilter === "90% & Above" && matchNum < 90) return false;

    // Delivery Filter
    if (selectedDeliveryFilter === "Free Delivery" && !p.delivery.includes("Free")) return false;

    return true;
  };

  // Grouped products categories
  const categories = [
    { key: "Sarees", title: "👗 Sarees", code: "saree" },
    { key: "Heels", title: "👠 Heels", code: "heels" },
    { key: "Earrings", title: "💍 Earrings", code: "earrings" },
    { key: "Clutch", title: "👜 Clutches", code: "clutch" },
    { key: "Gift", title: "🎁 Gifts", code: "gift" }
  ];

  // Dynamic Sidebar Calculations based on the active bundle
  const bundleTotal = products.reduce((sum, item) => sum + item.price, 0);
  const bundleOriginalTotal = products.reduce((sum, item) => sum + item.originalPrice, 0);
  const bundleSavings = bundleOriginalTotal - bundleTotal;
  const budgetLimit = 2500;
  const isWithinBudget = bundleTotal <= budgetLimit;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 text-meesho-textDark">
      {/* Page Title */}
      <div className="mb-6 pb-4 border-b border-meesho-borderLight">
        <h1 className="text-xl font-black text-meesho-textDark flex items-center gap-2 tracking-tight">
          <Sparkles className="text-[#F43397]" size={20} />
          AI Shopping Recommendations
        </h1>
        <p className="text-xs text-meesho-textMuted mt-1">
          Explore the top matches generated for your prompt. Swapping an item updates the bundle total in real-time.
        </p>
      </div>

      {/* Shopping Mission Summary Bar */}
      <div className="bg-white border border-meesho-borderLight rounded-lg p-4.5 mb-6 flex flex-wrap items-center justify-between gap-4 text-xs shadow-sm">
        <div className="flex flex-col gap-1 min-w-[200px]">
          <span className="text-meesho-textMuted font-bold uppercase tracking-wider text-[9px]">Shopping Mission Prompt</span>
          <span className="font-extrabold truncate text-sm max-w-sm text-meesho-textDark">
            "{missionText || "I have my cousin's engagement next week. Budget ₹2500. Need a saree..."}"
          </span>
        </div>
        
        <div className="flex gap-8">
          <div className="flex flex-col gap-0.5">
            <span className="text-meesho-textMuted font-bold uppercase tracking-wider text-[9px]">Budget Constraint</span>
            <span className="font-black text-sm text-[#F43397]">₹{budgetLimit}</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-meesho-textMuted font-bold uppercase tracking-wider text-[9px]">Bundle Total</span>
            <span className={`font-black text-sm ${isWithinBudget ? "text-green-600" : "text-red-600"}`}>
              ₹{bundleTotal}
            </span>
          </div>
          <div className="flex flex-col gap-0.5 text-green-600">
            <span className="text-meesho-textMuted font-bold uppercase tracking-wider text-[9px]">Estimated Savings</span>
            <span className="font-black text-sm">₹{bundleSavings}</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-meesho-textMuted font-bold uppercase tracking-wider text-[9px]">Bundle Status</span>
            <span className={`font-black text-sm ${isWithinBudget ? "text-green-600" : "text-red-500"}`}>
              {isWithinBudget ? "✓ Inside Budget" : "⚠ Over Budget"}
            </span>
          </div>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Left Side: Filters and Category Listings (3 Cols) */}
        <div className="lg:col-span-3 space-y-10">
          
          {/* Meesho Filters Bar */}
          <div className="bg-white border border-meesho-borderLight rounded-lg p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs shadow-sm select-none">
            <div className="flex items-center gap-2 font-black text-meesho-textMuted pr-2 border-r border-meesho-borderLight">
              <Filter size={14} />
              <span>Filters</span>
            </div>

            {/* Price Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-meesho-textMuted font-medium">Price:</span>
              <select 
                className="border border-meesho-borderLight p-1 rounded font-bold focus:outline-none focus:border-[#F43397]"
                value={selectedPriceFilter}
                onChange={(e) => setSelectedPriceFilter(e.target.value)}
              >
                <option>All</option>
                <option>Under ₹300</option>
                <option>Under ₹500</option>
                <option>Under ₹1000</option>
              </select>
            </div>

            {/* Rating Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-meesho-textMuted font-medium">Rating:</span>
              <select 
                className="border border-meesho-borderLight p-1 rounded font-bold focus:outline-none focus:border-[#F43397]"
                value={selectedRatingFilter}
                onChange={(e) => setSelectedRatingFilter(e.target.value)}
              >
                <option>All</option>
                <option>4.5★ & Above</option>
                <option>4.2★ & Above</option>
              </select>
            </div>

            {/* AI Match Score Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-meesho-textMuted font-medium">AI Match Score:</span>
              <select 
                className="border border-meesho-borderLight p-1 rounded font-bold focus:outline-none focus:border-[#F43397]"
                value={selectedMatchFilter}
                onChange={(e) => setSelectedMatchFilter(e.target.value)}
              >
                <option>All</option>
                <option>95% & Above</option>
                <option>90% & Above</option>
              </select>
            </div>

            {/* Delivery Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-meesho-textMuted font-medium">Delivery:</span>
              <select 
                className="border border-meesho-borderLight p-1 rounded font-bold focus:outline-none focus:border-[#F43397]"
                value={selectedDeliveryFilter}
                onChange={(e) => setSelectedDeliveryFilter(e.target.value)}
              >
                <option>All</option>
                <option>Free Delivery</option>
              </select>
            </div>

            {/* Reset Filters */}
            <button 
              type="button"
              className="text-[#F43397] font-black hover:underline cursor-pointer"
              onClick={() => {
                setSelectedPriceFilter("All");
                setSelectedRatingFilter("All");
                setSelectedMatchFilter("All");
                setSelectedDeliveryFilter("All");
              }}
            >
              Reset Filters
            </button>
          </div>

          {/* Grouped Recommendation Categories */}
          {categories.map((cat) => {
            const catProducts = allProducts.filter(p => p.category === cat.code && filterProduct(p));

            if (catProducts.length === 0) return null;

            return (
              <div key={cat.key} className="space-y-4 pt-1">
                <div className="flex justify-between items-center border-b border-meesho-borderLight pb-2.5">
                  <h2 className="text-sm font-black text-meesho-textDark uppercase tracking-wider flex items-center gap-2">
                    {cat.title}
                  </h2>
                  <span className="text-xs text-meesho-textMuted font-bold">({catProducts.length} options matched)</span>
                </div>

                {/* 4-column responsive grid matching Meesho search results */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                  {catProducts.map((p) => {
                    const isInBundle = products.some(bundleItem => bundleItem.id === p.id);

                    return (
                      <div 
                        key={p.id}
                        className={`bg-white border rounded-lg overflow-hidden hover:shadow-md transition duration-200 cursor-pointer flex flex-col justify-between group relative ${
                          isInBundle 
                            ? "border-[#F43397] ring-1 ring-[#F43397]/20 shadow-sm" 
                            : "border-meesho-borderLight"
                        }`}
                        onClick={() => onSelectProduct(p, "saheli")}
                      >
                        {/* Image & Badges */}
                        <div className="relative aspect-square bg-meesho-bgLight flex items-center justify-center overflow-hidden">
                          <img 
                            src={p.image} 
                            alt={p.name} 
                            className="w-full h-full object-cover group-hover:scale-103 transition duration-300" 
                          />
                          
                          {/* AI Match percentage badge */}
                          <div className="absolute top-2 left-2 bg-[#F43397]/90 text-white text-[9px] font-black px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-sm select-none">
                            <Sparkles size={8} />
                            <span>{p.matchScore}% Match</span>
                          </div>

                          {/* Save Heart */}
                          <button 
                            type="button"
                            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white border border-meesho-borderLight flex items-center justify-center text-meesho-textMuted hover:text-red-500 shadow-sm cursor-pointer hover:scale-105 transition"
                            onClick={(e) => toggleSave(p.id, e)}
                          >
                            <Heart 
                              size={12} 
                              fill={savedItems[p.id] ? "red" : "none"} 
                              className={savedItems[p.id] ? "text-red-500" : ""} 
                            />
                          </button>
                        </div>

                        {/* Text Metadata */}
                        <div className="p-3.5 flex-1 flex flex-col justify-between">
                          <div className="space-y-1.5">
                            {/* Product Name */}
                            <h4 className="text-xs text-meesho-textMuted font-bold truncate">
                              {p.name}
                            </h4>

                            {/* Price details */}
                            <div className="flex items-baseline gap-1.5">
                              <span className="text-sm font-extrabold text-meesho-textDark">₹{p.price}</span>
                              <span className="text-[10px] text-meesho-textMuted line-through">₹{p.originalPrice}</span>
                              <span className="text-[10px] text-[#F43397] font-black">
                                {Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)}% Off
                              </span>
                            </div>

                            {/* Ratings & Delivery */}
                            <div className="flex items-center gap-2 pt-0.5 flex-wrap">
                              <div className="bg-[#E8F5E9] text-[#2E7D32] text-[10px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5 select-none">
                                <span>{p.rating}</span>
                                <Star size={8} fill="currentColor" />
                              </div>
                              <span className="text-[9px] text-meesho-textMuted font-bold border border-meesho-borderLight px-1.5 py-0.5 rounded bg-meesho-bgLight">
                                {p.delivery}
                              </span>
                            </div>
                          </div>

                          {/* Occasion / match reason (Dashed Border Card) */}
                          <div className="border-t border-dashed border-meesho-borderLight pt-2.5 mt-3 space-y-1">
                            <p className="text-[10px] text-meesho-textMuted italic leading-relaxed">
                              <strong>Why Recommended:</strong> {p.whyRecommended}
                            </p>
                          </div>

                          {/* Action Button & Bundle status */}
                          <div className="mt-3 space-y-2">
                            {isInBundle ? (
                              <div className="w-full py-1 bg-green-50 text-green-700 text-[10px] font-black text-center rounded border border-green-200 select-none">
                                ✨ Active Bundle Choice
                              </div>
                            ) : (
                              <button
                                type="button"
                                className="w-full py-1.5 border border-[#F43397] text-[#F43397] hover:bg-[#F43397] hover:text-white text-xs font-bold rounded transition cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onSelectProduct(p, "saheli");
                                }}
                              >
                                View Product
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Side: Sticky AI Companion Panel (1 Col) */}
        <div className="lg:col-span-1 lg:sticky lg:top-24 space-y-4">
          <div className="bg-white border border-meesho-borderLight rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2 pb-3.5 border-b border-meesho-borderLight mb-4">
              <div className="w-8 h-8 rounded-full bg-purple-50 text-[#F43397] border border-pink-100 flex items-center justify-center">
                <Sparkles size={16} />
              </div>
              <h3 className="text-sm font-black text-meesho-textDark">🤖 Saheli Overview</h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between border-b border-meesho-bgLight pb-2">
                <span className="text-meesho-textMuted font-bold">Bundle Status</span>
                <span className={`font-black flex items-center gap-1 ${isWithinBudget ? "text-green-600" : "text-red-500"}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isWithinBudget ? "bg-green-500" : "bg-red-500"}`}></span>
                  {isWithinBudget ? "Under Budget" : "Over Budget"}
                </span>
              </div>
              
              <div className="flex justify-between border-b border-meesho-bgLight pb-2">
                <span className="text-meesho-textMuted font-bold">Coordinated Items</span>
                <span className="font-extrabold text-meesho-textDark">{products.length} Products</span>
              </div>
              
              <div className="flex justify-between border-b border-meesho-bgLight pb-2">
                <span className="text-meesho-textMuted font-bold">Budget Limit</span>
                <span className="font-extrabold text-meesho-textDark">₹{budgetLimit}</span>
              </div>

              <div className="flex justify-between border-b border-meesho-bgLight pb-2">
                <span className="text-meesho-textMuted font-bold">Current Bundle Cost</span>
                <span className={`font-black ${isWithinBudget ? "text-green-600" : "text-red-500"}`}>
                  ₹{bundleTotal}
                </span>
              </div>

              <div className="flex justify-between border-b border-meesho-bgLight pb-2">
                <span className="text-meesho-textMuted font-bold">Estimated Savings</span>
                <span className="text-green-600 font-extrabold">₹{bundleSavings} Saved</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-meesho-textMuted font-bold">Delivery Speed</span>
                <span className="text-[#F43397] font-extrabold">Tomorrow (Consolidated)</span>
              </div>
            </div>

            {/* List of items inside active bundle */}
            <div className="mt-4 pt-3.5 border-t border-meesho-borderLight space-y-2">
              <span className="text-[10px] uppercase font-bold text-meesho-textMuted tracking-wider block">Your Selected Bundle:</span>
              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                {products.map(item => (
                  <div key={item.id} className="flex items-center gap-2 p-1.5 hover:bg-meesho-bgLight rounded text-[11px] border border-meesho-bgLight transition">
                    <img src={item.image} alt={item.name} className="w-6 h-6 rounded object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-meesho-textDark truncate">{item.name}</p>
                      <p className="text-[9px] text-[#F43397] font-black">₹{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action button to proceed */}
            <div className="mt-6 pt-4 border-t border-meesho-borderLight">
              <button 
                type="button"
                className="w-full py-2.5 bg-[#F43397] hover:bg-[#cf1b78] text-white font-extrabold text-xs rounded transition flex items-center justify-center gap-1 shadow-sm cursor-pointer"
               onClick={() =>
  navigate('/checkout', {
    state: {
      products: products,
      isSaheli: true
    }
  })
}
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Secure Purchase Note */}
          <div className="flex items-center justify-center gap-2 p-3 bg-meesho-bgLight border border-meesho-borderLight rounded text-[10px] text-meesho-textMuted">
            <ShieldCheck className="text-green-600" size={14} />
            <span className="font-bold">Meesho 100% Safe Payments & Free Returns</span>
          </div>
        </div>
      </div>
    </div>
  );
}
