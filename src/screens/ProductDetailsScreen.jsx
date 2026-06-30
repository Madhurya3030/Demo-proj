import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Check, X, Star, RefreshCw, ShoppingBag, Shield, CheckCircle, Flame } from 'lucide-react';

export default function ProductDetailsScreen({ 
  allProducts = [], 
  homepageProducts = [],
  products = [], // Selected bundle
  onBack, 
  onReplaceProduct,
  onAddToCart,
  onBuyNow,
  setCheckoutSource
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const productId = parseInt(id);

  const foundProduct = allProducts.find(p => p.id === productId) || homepageProducts.find(p => p.id === productId);

  // Scroll to top when product changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!foundProduct) {
    return (
      <div className="text-center py-12">
        <p className="text-sm text-meesho-textMuted">Product not found.</p>
        <button onClick={() => navigate('/')} className="mt-4 px-4 py-2 bg-[#F43397] text-white rounded text-xs font-bold">
          Go Home
        </button>
      </div>
    );
  }

  // Create unified product details with defaults for homepage products
  const product = {
    sizes: ["Free Size"],
    colors: ["Default Color"],
    specs: {
      "Fabric": "Premium Fabric",
      "Style": "Modern Fit",
      "Pattern": "Solid/Printed",
      "Occasion": "Casual/Festive",
      "Seller": foundProduct.seller || "Meesho Preferred Seller"
    },
    pros: ["Premium quality material", "Soft and comfortable wear", "Highly durable"],
    cons: ["Wash care: Dry clean or hand wash recommended"],
    reviewsCount: 120,
    seller: "Meesho Preferred Seller (4.2★)",
    category: foundProduct.category || foundProduct.sectionName || foundProduct.section || "General",
    ...foundProduct
  };

  // Sizing & Color local state
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "Free Size");
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "Default");
  const [quantity, setQuantity] = useState(1);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Check if this product is currently in the active bundle
  const isInBundle = products.some(bundleItem => bundleItem.id === product.id);

  // Select 3 swap-capable alternative products from the same category (excluding current)
  const alternatives = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  // Helper to render stars
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star 
          key={i} 
          size={14} 
          fill={i < fullStars ? "#f59e0b" : "none"} 
          className={i < fullStars ? "text-[#f59e0b]" : "text-meesho-borderLight"}
          style={{ color: i < fullStars ? '#f59e0b' : '#e2e8f0' }}
        />
      );
    }
    return stars;
  };

  // Mock secondary thumbnails (since we have one main Unsplash image, we repeat it with minor filters/crops to simulate a real gallery)
  const thumbnails = [
    product.image,
    product.image,
    product.image,
    product.image
  ];

  const handleSelectForBundle = () => {
    onReplaceProduct(product.category, product);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 text-meesho-textDark">
      {/* Navigation header */}
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-[#F43397] font-black hover:underline cursor-pointer focus:outline-none"
        >
          <ArrowLeft size={14} />
          {productId < 1000 ? "Back to Homepage" : "Back to Recommendations"}
        </button>
        <div className="text-xs text-meesho-textMuted font-bold">
          Category: <span className="uppercase text-[#F43397]">{product.category}</span>
        </div>
      </div>

      {/* Two-Column Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
        
        {/* Left Column: Main Image + Thumbnail list (7 Cols) */}
        <div className="lg:col-span-7 bg-white border border-meesho-borderLight rounded-xl p-5 shadow-sm flex flex-col md:flex-row gap-5">
          {/* Vertical Thumbnails List on desktop */}
          <div className="flex md:flex-col flex-row gap-3 order-2 md:order-1 justify-start">
            {thumbnails.map((thumb, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIdx(idx)}
                className={`w-16 h-16 rounded border overflow-hidden shrink-0 transition ${
                  activeImageIdx === idx ? "border-[#F43397] ring-1 ring-[#F43397]/20" : "border-meesho-borderLight"
                }`}
              >
                <img 
                  src={thumb} 
                  alt="thumbnail" 
                  className={`w-full h-full object-cover ${idx === 1 ? "brightness-95 contrast-105" : idx === 2 ? "hue-rotate-15" : idx === 3 ? "saturate-150" : ""}`} 
                />
              </button>
            ))}
          </div>

          {/* Large Main Photo */}
          <div className="flex-1 aspect-[4/5] bg-meesho-bgLight rounded-lg border border-meesho-borderLight overflow-hidden flex items-center justify-center order-1 md:order-2">
            <img 
              src={product.image} 
              alt={product.name} 
              className={`w-full h-full object-cover transition duration-300 ${
                activeImageIdx === 1 ? "brightness-95 contrast-105" : activeImageIdx === 2 ? "hue-rotate-15" : activeImageIdx === 3 ? "saturate-150" : ""
              }`} 
            />
          </div>
        </div>

        {/* Right Column: Buying Selectors & Price (5 Cols) */}
        <div className="lg:col-span-5 bg-white border border-meesho-borderLight rounded-xl p-6 shadow-sm space-y-6">
          
          {/* Product Title and Rating */}
          <div className="space-y-2">
            {productId >= 1000 && (
              <div className="flex items-center gap-1.5">
                <span className="bg-purple-50 text-[#F43397] text-[10px] font-black px-2.5 py-0.5 rounded border border-pink-100 uppercase tracking-wider flex items-center gap-0.5">
                  <Sparkles size={8} />
                  AI Matched Item
                </span>
                {isInBundle && (
                  <span className="bg-green-50 text-green-700 text-[10px] font-black px-2.5 py-0.5 rounded border border-green-200">
                    Active Bundle Choice
                  </span>
                )}
              </div>
            )}
            
            <h1 className="text-xl font-black leading-tight text-meesho-textDark">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 pt-1 select-none">
              <div className="bg-[#E8F5E9] text-[#2E7D32] text-xs font-black px-2 py-0.5 rounded flex items-center gap-0.5">
                <span>{product.rating}</span>
                <Star size={10} fill="currentColor" />
              </div>
              <div className="flex text-[#f59e0b]">
                {renderStars(product.rating)}
              </div>
              <span className="text-xs text-meesho-textMuted font-bold">({product.reviewsCount} Ratings)</span>
            </div>
          </div>

          {/* Pricing Info */}
          <div className="border-t border-b border-meesho-borderLight py-4 space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-meesho-textDark">₹{product.price}</span>
              <span className="text-sm text-meesho-textMuted line-through font-medium">₹{product.originalPrice}</span>
              <span className="text-sm text-[#F43397] font-black">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% Off
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-green-600 font-bold">
              <CheckCircle size={12} />
              <span>Free Delivery & Cash on Delivery Available</span>
            </div>
            <p className="text-[10px] text-meesho-textMuted font-medium pt-1">Inclusive of all taxes</p>
          </div>

          {/* Sizes Selector */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-meesho-textMuted uppercase tracking-wider block">Select Size:</span>
            <div className="flex flex-wrap gap-2 select-none">
              {product.sizes?.map((size, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 text-xs font-bold rounded-md border transition cursor-pointer ${
                    selectedSize === size 
                      ? "border-[#F43397] bg-pink-50/50 text-[#F43397]" 
                      : "border-meesho-borderLight text-meesho-textDark hover:bg-meesho-bgLight"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Colors Selector */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-meesho-textMuted uppercase tracking-wider block">Select Color:</span>
            <div className="flex flex-wrap gap-2 select-none">
              {product.colors?.map((color, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 text-xs font-bold rounded-md border transition cursor-pointer ${
                    selectedColor === color 
                      ? "border-[#F43397] bg-pink-50/50 text-[#F43397]" 
                      : "border-meesho-borderLight text-meesho-textDark hover:bg-meesho-bgLight"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-meesho-textMuted uppercase tracking-wider">Quantity:</span>
            <div className="flex items-center border border-meesho-borderLight rounded-md overflow-hidden bg-white select-none">
              <button 
                type="button"
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="px-3 py-1 text-sm font-bold text-meesho-textMuted hover:bg-meesho-bgLight cursor-pointer"
              >
                -
              </button>
              <span className="px-4 py-1 text-xs font-black text-meesho-textDark">{quantity}</span>
              <button 
                type="button"
                onClick={() => setQuantity(prev => prev + 1)}
                className="px-3 py-1 text-sm font-bold text-meesho-textMuted hover:bg-meesho-bgLight cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          {/* Seller Details Card */}
          <div className="p-3.5 bg-meesho-bgLight border border-meesho-borderLight rounded-lg text-xs space-y-2 select-none">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-extrabold text-meesho-textDark">Seller Details</p>
                <p className="text-[11px] text-[#F43397] font-black mt-0.5">{product.seller || "Ananya Textile Hub"}</p>
              </div>
              <button type="button" className="px-2.5 py-1 border border-meesho-borderLight hover:border-[#F43397] text-[10px] font-bold rounded bg-white transition hover:text-[#F43397] cursor-pointer">
                Follow Seller
              </button>
            </div>
            <div className="flex items-center gap-4 text-[10px] text-meesho-textMuted border-t border-meesho-borderLight pt-2">
              <span>Rating: <strong className="text-green-700">4.3★</strong></span>
              <span>100% Safe Payments</span>
              <span>Free Returns</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col gap-3 pt-2">
            {productId < 1000 ? (
              <>
                <button 
                  type="button"
                  onClick={() => {
                    const cartItem = {
                      ...product,
                      selectedSize,
                      selectedColor,
                      quantity
                    };
                    if (onAddToCart) onAddToCart(cartItem);
                    alert(`"${product.name}" has been added to your cart!`);
                  }}
                  className="w-full py-3.5 bg-white border border-[#F43397] text-[#F43397] hover:bg-[#F43397]/5 rounded-lg text-xs font-black tracking-wider transition uppercase cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <ShoppingBag size={14} />
                  <span>Add to Cart</span>
                </button>

                <button 
                  type="button"
                  onClick={() => {
                    const cartItem = {
                      ...product,
                      selectedSize,
                      selectedColor,
                      quantity
                    };
                    if (onBuyNow) onBuyNow(cartItem);
                  }}
                  className="w-full py-3.5 bg-[#F43397] hover:bg-[#cf1b78] text-white rounded-lg text-xs font-black tracking-wider transition uppercase cursor-pointer flex items-center justify-center gap-1.5 shadow-md"
                >
                  <span>Buy Now</span>
                </button>
              </>
            ) : (
              <>
                <button 
                  type="button"
                  onClick={handleSelectForBundle}
                  className={`w-full py-3.5 rounded-lg text-xs font-black tracking-wider transition uppercase shadow-sm cursor-pointer flex items-center justify-center gap-1.5 ${
                    isInBundle 
                      ? "bg-green-600 hover:bg-green-700 text-white border border-green-600" 
                      : "bg-[#F43397] hover:bg-[#cf1b78] text-white"
                  }`}
                >
                  {isInBundle ? (
                    <>
                      <Check size={14} strokeWidth={3} />
                      <span>✓ Currently Selected in Bundle</span>
                    </>
                  ) : (
                    <>
                      <span>Select & Replace in Bundle</span>
                    </>
                  )}
                </button>

                <button 
                  type="button"
                  onClick={() => {
            const updatedBundle = isInBundle
    ? products
    : [
        ...products.filter(p => p.category !== product.category),
        {
            ...product,
            selectedSize,
            selectedColor,
            quantity
        }
    ];

navigate("/checkout", {
    state: {
        products: updatedBundle,
        isSaheli: true
    }
});

                  }}
                  className="w-full py-3.5 border border-meesho-textDark hover:bg-meesho-textDark hover:text-white rounded-lg text-xs font-black tracking-wider transition uppercase cursor-pointer"
                >
                  Proceed to Checkout
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Specifications list (Separate section) */}
      <div className="bg-white border border-meesho-borderLight rounded-xl p-6 shadow-sm mb-10">
        <h3 className="text-sm font-black text-meesho-textDark uppercase tracking-wider mb-4 border-b border-meesho-borderLight pb-2">
          Product Specifications
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-xs">
          {product.specs && Object.entries(product.specs).map(([key, val]) => (
            <div key={key} className="flex justify-between border-b border-meesho-bgLight pb-2">
              <span className="text-meesho-textMuted font-bold">{key}</span>
              <span className="font-extrabold text-meesho-textDark">{val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section: 🤖 Saheli Product Intelligence Card */}
      <div className="bg-white border border-meesho-borderLight rounded-xl p-6 shadow-sm mb-10 space-y-6">
        <div className="flex items-center gap-2 border-b border-meesho-borderLight pb-3.5">
          <div className="w-8 h-8 rounded-full bg-purple-50 text-[#F43397] flex items-center justify-center">
            <Sparkles size={18} />
          </div>
          <div>
            <h3 className="text-base font-black text-meesho-textDark">🤖 Saheli Product Intelligence Dashboard</h3>
            <p className="text-[10px] text-meesho-textMuted mt-0.5">Automated sizing audits, quality metrics, and compatibility verification.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Column: Pros and Cons (7 Cols) */}
          <div className="md:col-span-7 space-y-4 border-r-0 md:border-r border-meesho-borderLight md:pr-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Pros */}
              <div className="space-y-3">
                <h4 className="text-xs font-black text-green-600 tracking-wider uppercase flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  Verified Pros
                </h4>
                <div className="space-y-2 text-xs text-meesho-textDark">
                  {product.pros?.map((pro, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check size={14} className="text-green-600 shrink-0 mt-0.5" strokeWidth={3} />
                      <span className="font-medium">{pro}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cons */}
              <div className="space-y-3">
                <h4 className="text-xs font-black text-red-500 tracking-wider uppercase flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  Verified Cons
                </h4>
                <div className="space-y-2 text-xs text-meesho-textDark">
                  {product.cons?.map((con, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <X size={14} className="text-red-500 shrink-0 mt-0.5" strokeWidth={3} />
                      <span className="font-medium">{con}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sizing, Occasion, Weather, Value Stars (5 Cols) */}
          <div className="md:col-span-5 space-y-4.5 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-meesho-bgLight border border-meesho-borderLight rounded-lg">
                <p className="text-[10px] text-meesho-textMuted font-bold uppercase tracking-wider">Fabric & Materials</p>
                <p className="font-extrabold text-meesho-textDark mt-1">{product.specs?.Fabric || "Premium Blend"}</p>
              </div>
              
              <div className="p-3 bg-meesho-bgLight border border-meesho-borderLight rounded-lg">
                <p className="text-[10px] text-meesho-textMuted font-bold uppercase tracking-wider">Size Guidance</p>
                <p className="font-extrabold text-meesho-textDark mt-1">True to Size (90% fit confidence)</p>
              </div>

              <div className="p-3 bg-meesho-bgLight border border-meesho-borderLight rounded-lg">
                <p className="text-[10px] text-meesho-textMuted font-bold uppercase tracking-wider">Occasion Suitability</p>
                <p className="font-extrabold text-meesho-textDark mt-1">Engagement, Wedding, Festivals</p>
              </div>

              <div className="p-3 bg-meesho-bgLight border border-meesho-borderLight rounded-lg">
                <p className="text-[10px] text-meesho-textMuted font-bold uppercase tracking-wider">Weather Comfort</p>
                <p className="font-extrabold text-meesho-textDark mt-1">All-Season Breathable Wear</p>
              </div>
            </div>

            {/* Value Stars (Custom rating widget) */}
            <div className="flex items-center justify-between border-t border-meesho-borderLight pt-3">
              <span className="font-bold text-meesho-textDark">Saheli Value Assessment Rating:</span>
              <div className="flex items-center gap-1 select-none">
                <div className="flex text-[#f59e0b] mr-1">
                  {renderStars(4.7)}
                </div>
                <span className="font-black text-meesho-textDark">4.7 / 5</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Alternatives section (swap-capable) */}
      {productId >= 1000 && alternatives.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-meesho-borderLight pb-2">
            <h3 className="text-sm font-black text-meesho-textDark uppercase tracking-wider flex items-center gap-1.5">
              <RefreshCw size={14} className="text-[#F43397]" />
              Swap-Capable Bundle Alternatives
            </h3>
            <span className="text-xs text-meesho-textMuted font-bold">Quick swap updates bundle price instantly</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {alternatives.map((alt) => {
              const isAltSelected = products.some(bundleItem => bundleItem.id === alt.id);

              return (
                <div 
                  key={alt.id} 
                  className={`bg-white border rounded-xl p-4 hover:shadow-md cursor-pointer transition flex flex-col justify-between group ${
                    isAltSelected 
                      ? "border-[#F43397] ring-1 ring-[#F43397]/20 shadow-sm" 
                      : "border-meesho-borderLight"
                  }`}
                  onClick={() => onReplaceProduct(product.category, alt)}
                >
                  <div className="space-y-3">
                    <div className="aspect-[4/3] bg-meesho-bgLight rounded-lg overflow-hidden relative">
                      <img src={alt.image} alt={alt.name} className="w-full h-full object-cover group-hover:scale-103 transition duration-200" />
                      <div className="absolute top-2 left-2 bg-[#F43397]/90 text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow-sm">
                        {alt.matchScore}% Match
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold truncate text-meesho-textDark">
                        {alt.name}
                      </h4>
                      <p className="text-[10px] text-meesho-textMuted font-medium truncate mt-0.5">By {alt.seller || "Verified Seller"}</p>
                      
                      <div className="flex items-baseline gap-1.5 mt-1.5">
                        <span className="text-sm font-extrabold text-meesho-textDark">₹{alt.price}</span>
                        <span className="text-[10px] text-meesho-textMuted line-through">₹{alt.originalPrice}</span>
                        <span className="text-[10px] text-[#F43397] font-black">
                          {Math.round(((alt.originalPrice - alt.price) / alt.originalPrice) * 100)}% Off
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    {isAltSelected ? (
                      <div className="w-full py-1.5 bg-green-50 text-green-700 text-[10px] font-black text-center rounded border border-green-200 select-none">
                        ✨ Selected Choice
                      </div>
                    ) : (
                      <button 
                        type="button"
                        className="w-full py-1.5 border border-[#F43397] text-[#F43397] hover:bg-[#F43397] hover:text-white text-xs font-bold rounded flex items-center justify-center gap-1 transition cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          onReplaceProduct(product.category, alt);
                        }}
                      >
                        <RefreshCw size={10} />
                        <span>Swap & View Item</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
