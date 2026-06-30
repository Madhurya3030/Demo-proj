import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Star, Heart, ArrowRight, ShieldCheck, Filter } from 'lucide-react';

export default function RecommendationsScreen({ 
  products, 
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
    if (selectedDeliveryFilter === "Delivery Tomorrow" && !p.delivery.includes("Tomorrow")) return false;

    return true;
  };

  // Grouped products
  const categories = [
    { key: "Sarees", title: "👗 Sarees", code: "saree" },
    { key: "Heels", title: "👠 Heels", code: "heels" },
    { key: "Earrings", title: "💍 Earrings", code: "earrings" },
    { key: "Clutch", title: "👜 Clutch", code: "clutch" },
    { key: "Gift", title: "🎁 Gift", code: "gift" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 text-meesho-textDark">
      {/* Page Title */}
      <div className="mb-6 pb-4 border-b border-meesho-borderLight">
        <h1 className="text-xl font-bold text-meesho-textDark flex items-center gap-2">
          <Sparkles className="text-meesho-purple" size={20} />
          AI Shopping Recommendations
        </h1>
        <p className="text-xs text-meesho-textMuted mt-1">
          Personalized bundles designed for your goals, timelines, and budget.
        </p>
      </div>

      {/* Shopping Mission Summary Bar */}
      <div className="bg-white border border-meesho-borderLight rounded-md p-4 mb-6 flex flex-wrap items-center justify-between gap-4 text-xs shadow-sm">
        <div className="flex flex-col gap-1 min-w-[200px]">
          <span className="text-meesho-textMuted font-medium uppercase tracking-wider text-[10px]">Shopping Mission</span>
          <span className="font-bold truncate text-sm max-w-sm">
            {missionText || "Cousin's Engagement"}
          </span>
        </div>
        <div className="flex gap-8">
          <div className="flex flex-col gap-0.5">
            <span className="text-meesho-textMuted font-medium uppercase tracking-wider text-[10px]">Budget Limit</span>
            <span className="font-bold text-sm">₹2500</span>
          </div>
          <div className="flex flex-col gap-0.5 text-green-600">
            <span className="text-meesho-textMuted font-medium uppercase tracking-wider text-[10px]">Estimated Savings</span>
            <span className="font-bold text-sm">₹320</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-meesho-textMuted font-medium uppercase tracking-wider text-[10px]">Delivery Target</span>
            <span className="font-bold text-sm text-meesho-purple">Before Event (Tomorrow)</span>
          </div>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left Side: Filters and Category Listings */}
        <div className="lg:col-span-3 space-y-8">
          {/* Meesho Filters Bar */}
          <div className="bg-white border border-meesho-borderLight rounded-md p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs shadow-sm">
            <div className="flex items-center gap-2 font-bold text-meesho-textMuted pr-2 border-r border-meesho-borderLight">
              <Filter size={14} />
              <span>Filters</span>
            </div>

            {/* Price Filter */}
            <div className="flex items-center gap-1">
              <span className="text-meesho-textMuted">Price:</span>
              <select 
                className="border border-meesho-borderLight p-1 rounded font-medium focus:outline-none focus:border-meesho-purple"
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
            <div className="flex items-center gap-1">
              <span className="text-meesho-textMuted">Rating:</span>
              <select 
                className="border border-meesho-borderLight p-1 rounded font-medium focus:outline-none focus:border-meesho-purple"
                value={selectedRatingFilter}
                onChange={(e) => setSelectedRatingFilter(e.target.value)}
              >
                <option>All</option>
                <option>4.5★ & Above</option>
                <option>4.2★ & Above</option>
              </select>
            </div>

            {/* AI Match Score Filter */}
            <div className="flex items-center gap-1">
              <span className="text-meesho-textMuted">AI Match:</span>
              <select 
                className="border border-meesho-borderLight p-1 rounded font-medium focus:outline-none focus:border-meesho-purple"
                value={selectedMatchFilter}
                onChange={(e) => setSelectedMatchFilter(e.target.value)}
              >
                <option>All</option>
                <option>95% & Above</option>
                <option>90% & Above</option>
              </select>
            </div>

            {/* Delivery Filter */}
            <div className="flex items-center gap-1">
              <span className="text-meesho-textMuted">Delivery:</span>
              <select 
                className="border border-meesho-borderLight p-1 rounded font-medium focus:outline-none focus:border-meesho-purple"
                value={selectedDeliveryFilter}
                onChange={(e) => setSelectedDeliveryFilter(e.target.value)}
              >
                <option>All</option>
                <option>Delivery Tomorrow</option>
              </select>
            </div>

            {/* Clear All */}
            <button 
              className="text-meesho-purple font-bold hover:underline"
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

          {/* Group Categories */}
          {categories.map((cat) => {
            const catProducts = products.filter(p => p.category === cat.code && filterProduct(p));

            if (catProducts.length === 0) return null;

            return (
              <div key={cat.key} className="space-y-4">
                <div className="flex justify-between items-center border-b border-meesho-borderLight pb-2">
                  <h2 className="text-sm font-extrabold text-meesho-textDark uppercase tracking-wider">
                    {cat.title}
                  </h2>
                  <span className="text-xs text-meesho-textMuted">({catProducts.length} options found)</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {catProducts.map((p) => (
                    <div 
                      key={p.id}
                      className="bg-white border border-meesho-borderLight rounded-md overflow-hidden hover:shadow-md transition duration-200 cursor-pointer flex flex-col group"
                      onClick={() => onSelectProduct(p)}
                    >
                      {/* Product Image */}
                      <div className="relative aspect-square bg-meesho-bgLight flex items-center justify-center overflow-hidden">
                        <img 
                          src={p.image} 
                          alt={p.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
                        />
                        {/* AI Match Badge */}
                        <div className="absolute top-2 left-2 bg-purple-50 border border-purple-200 text-meesho-purple text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-sm">
                          <Sparkles size={8} />
                          <span>{p.matchScore}% Match</span>
                        </div>

                        {/* Save Button */}
                        <button 
                          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white border border-meesho-borderLight flex items-center justify-center text-meesho-textMuted hover:text-red-500 hover:shadow-sm"
                          onClick={(e) => toggleSave(p.id, e)}
                        >
                          <Heart 
                            size={14} 
                            fill={savedItems[p.id] ? "red" : "none"} 
                            className={savedItems[p.id] ? "text-red-500" : ""} 
                          />
                        </button>
                      </div>

                      {/* Info */}
                      <div className="p-3 flex-1 flex flex-col justify-between">
                        <div>
                          {/* Name */}
                          <h4 className="text-xs text-meesho-textMuted truncate font-medium mb-1">
                            {p.name}
                          </h4>

                          {/* Price Details */}
                          <div className="flex items-baseline gap-1.5 mb-1.5">
                            <span className="text-sm font-bold text-meesho-textDark">₹{p.price}</span>
                            <span className="text-[10px] text-meesho-textMuted line-through">₹{p.originalPrice}</span>
                            <span className="text-[10px] text-meesho-pink font-semibold">
                              {Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)}% Off
                            </span>
                          </div>

                          {/* Rating & Delivery Badge */}
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <div className="bg-[#E8F5E9] text-[#2E7D32] text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                              <span>{p.rating}</span>
                              <Star size={8} fill="currentColor" />
                            </div>
                            <span className="text-[10px] text-meesho-textMuted border border-meesho-borderLight px-1.5 py-0.5 rounded bg-meesho-bgLight font-medium">
                              {p.delivery}
                            </span>
                          </div>
                        </div>

                        {/* AI Match why */}
                        <div className="border-t border-dashed border-meesho-borderLight pt-2 mt-1">
                          <p className="text-[10px] text-meesho-textMuted italic leading-relaxed">
                            <strong>Why Recommended:</strong> {p.whyRecommended}
                          </p>
                        </div>

                        {/* Buttons */}
                        <div className="grid grid-cols-1 gap-1.5 mt-3">
                          <button
                            type="button"
                            className="w-full py-1.5 border border-meesho-purple text-meesho-purple text-xs font-bold rounded hover:bg-meesho-purple hover:text-white transition"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectProduct(p);
                            }}
                          >
                            View Product
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

        {/* Right Side: Sticky AI Companion Panel */}
        <div className="lg:col-span-1 lg:sticky lg:top-24 space-y-4">
          <div className="bg-white border border-meesho-borderLight rounded-lg p-5 shadow-sm">
            <div className="flex items-center gap-2 pb-3 border-b border-meesho-borderLight mb-4">
              <div className="w-8 h-8 rounded-full bg-purple-50 text-meesho-purple border border-purple-100 flex items-center justify-center">
                <Sparkles size={16} />
              </div>
              <h3 className="text-sm font-bold text-meesho-textDark">🤖 AI Companion</h3>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="flex justify-between border-b border-meesho-bgLight pb-2">
                <span className="text-meesho-textMuted font-medium">Mission Status</span>
                <span className="text-green-600 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  Completed
                </span>
              </div>
              <div className="flex justify-between border-b border-meesho-bgLight pb-2">
                <span className="text-meesho-textMuted font-medium">Recommendations</span>
                <span className="font-bold text-meesho-textDark">18 Products</span>
              </div>
              <div className="flex justify-between border-b border-meesho-bgLight pb-2">
                <span className="text-meesho-textMuted font-medium">Budget Check</span>
                <span className="font-bold text-meesho-textDark">₹2500 Limit</span>
              </div>
              <div className="flex justify-between border-b border-meesho-bgLight pb-2">
                <span className="text-meesho-textMuted font-medium">Estimated Savings</span>
                <span className="text-green-600 font-bold">₹320 Saved</span>
              </div>
              <div className="flex justify-between">
                <span className="text-meesho-textMuted font-medium">Delivery Confidence</span>
                <span className="text-meesho-purple font-bold">High (Fastest Courier)</span>
              </div>
            </div>

            {/* Action button to proceed */}
            <div className="mt-6 pt-4 border-t border-meesho-borderLight">
              <button 
                className="w-full py-2.5 bg-meesho-purple hover:bg-meesho-hoverPurple text-white font-bold text-xs rounded transition flex items-center justify-center gap-1 shadow-sm"
                onClick={() => navigate('/checkout')}
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Secure Purchase Note */}
          <div className="flex items-center justify-center gap-2 p-3 bg-meesho-bgLight border border-meesho-borderLight rounded text-[10px] text-meesho-textMuted">
            <ShieldCheck className="text-green-600" size={14} />
            <span>Meesho 100% Safe Payments & Free Returns</span>
          </div>
        </div>
      </div>
    </div>
  );
}
