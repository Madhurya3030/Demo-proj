import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Check, X, Star, RefreshCw, ShoppingBag } from 'lucide-react';

export default function ProductDetailsScreen({ 
  product, 
  onBack, 
  onReplaceProduct 
}) {
  const navigate = useNavigate();
  if (!product) return null;

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star 
          key={i} 
          size={14} 
          fill={i < fullStars ? "currentColor" : "none"} 
          className={i < fullStars ? "text-[#f59e0b]" : "text-meesho-borderLight"}
          style={{ color: i < fullStars ? '#f59e0b' : '#e7e7e7' }}
        />
      );
    }
    return stars;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 text-meesho-textDark">
      {/* Back to recommendations link */}
      <button 
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs text-meesho-purple font-bold hover:underline mb-6 focus:outline-none"
      >
        <ArrowLeft size={14} />
        Back to Recommendations
      </button>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Product Gallery & Specs (7 Cols) */}
        <div className="lg:col-span-7 bg-white border border-meesho-borderLight rounded-lg p-5 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image */}
            <div className="aspect-square bg-meesho-bgLight rounded border border-meesho-borderLight overflow-hidden flex items-center justify-center">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>

            {/* General Info */}
            <div className="space-y-4">
              <span className="text-[10px] bg-purple-50 text-meesho-purple font-bold px-2 py-0.5 rounded border border-purple-100 uppercase tracking-wider">
                AI Match Chosen
              </span>
              <h1 className="text-lg font-bold leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-2">
                <div className="flex">
                  {renderStars(product.rating)}
                </div>
                <span className="text-xs font-bold">{product.rating}</span>
                <span className="text-[10px] text-meesho-textMuted">({product.reviewsCount} Buyer Reviews)</span>
              </div>

              <div className="border-t border-b border-meesho-borderLight py-3 my-2 space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-meesho-textDark">₹{product.price}</span>
                  <span className="text-xs text-meesho-textMuted line-through">₹{product.originalPrice}</span>
                  <span className="text-xs text-meesho-pink font-semibold">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% Off
                  </span>
                </div>
                <p className="text-[10px] text-green-600 font-medium">✓ Coupon code stack applied automatically</p>
              </div>

              <p className="text-xs text-meesho-textMuted leading-relaxed">
                This item has been matched to your goals: occasion color theme, size availability, and budget filters.
              </p>
            </div>
          </div>

          {/* Specifications */}
          <div className="pt-4 border-t border-meesho-borderLight">
            <h3 className="text-xs font-bold uppercase tracking-wider mb-3">Product Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {product.specs && Object.entries(product.specs).map(([key, val]) => (
                <div key={key} className="flex justify-between border-b border-meesho-bgLight pb-1.5">
                  <span className="text-meesho-textMuted">{key}</span>
                  <span className="font-semibold text-meesho-textDark">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: AI Product Intelligence & Alternatives (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* AI Intelligence Card */}
          <div className="bg-white border border-meesho-borderLight rounded-lg p-5 shadow-sm space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-meesho-borderLight">
              <Sparkles className="text-meesho-purple" size={18} />
              <h3 className="text-sm font-bold">🤖 AI Product Intelligence</h3>
            </div>

            {/* Pros */}
            <div className="space-y-2">
              <h4 className="text-[11px] font-bold text-green-600 tracking-wide uppercase">Pros</h4>
              <div className="space-y-1.5 text-xs text-meesho-textDark">
                {product.pros ? product.pros.map((pro, i) => (
                  <div key={i} className="flex items-start gap-1.5">
                    <Check size={14} className="text-green-600 mt-0.5 shrink-0" strokeWidth={3} />
                    <span>{pro}</span>
                  </div>
                )) : (
                  <>
                    <div className="flex items-start gap-1.5">
                      <Check size={14} className="text-green-600 mt-0.5 shrink-0" strokeWidth={3} />
                      <span>Lightweight fabric</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <Check size={14} className="text-green-600 mt-0.5 shrink-0" strokeWidth={3} />
                      <span>Perfect for summer</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Cons */}
            <div className="space-y-2">
              <h4 className="text-[11px] font-bold text-red-500 tracking-wide uppercase">Cons</h4>
              <div className="space-y-1.5 text-xs text-meesho-textDark">
                {product.cons ? product.cons.map((con, i) => (
                  <div key={i} className="flex items-start gap-1.5">
                    <X size={14} className="text-red-500 mt-0.5 shrink-0" strokeWidth={3} />
                    <span>{con}</span>
                  </div>
                )) : (
                  <>
                    <div className="flex items-start gap-1.5">
                      <X size={14} className="text-red-500 mt-0.5 shrink-0" strokeWidth={3} />
                      <span>Color slightly darker than images</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <X size={14} className="text-red-500 mt-0.5 shrink-0" strokeWidth={3} />
                      <span>Dry clean recommended</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Buy Action */}
            <div className="pt-4 border-t border-meesho-borderLight">
              <button 
                className="w-full py-2.5 bg-meesho-purple hover:bg-meesho-hoverPurple text-white font-bold text-xs rounded transition shadow-sm"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout with Package
              </button>
            </div>
          </div>

          {/* Recommended Alternatives */}
          {product.alternatives && product.alternatives.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-meesho-textDark uppercase tracking-wider">
                Recommended Alternatives
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {product.alternatives.map((alt) => (
                  <div 
                    key={alt.id} 
                    className="bg-white border border-meesho-borderLight rounded-md p-3.5 hover:border-meesho-purple hover:shadow-sm cursor-pointer transition flex flex-col justify-between"
                    onClick={() => onReplaceProduct(product.id, alt)}
                  >
                    <div>
                      <div className="aspect-square bg-meesho-bgLight rounded mb-2 overflow-hidden">
                        <img src={alt.image} alt={alt.name} className="w-full h-full object-cover" />
                      </div>
                      <h4 className="text-[11px] font-bold truncate text-meesho-textDark mb-1">
                        {alt.name}
                      </h4>
                      <span className="text-xs font-bold text-meesho-textDark">
                        ₹{alt.price}
                      </span>
                    </div>

                    <button 
                      type="button"
                      className="mt-3 w-full py-1 border border-meesho-purple text-meesho-purple text-[10px] font-bold rounded flex items-center justify-center gap-1 hover:bg-meesho-purple hover:text-white transition"
                      onClick={(e) => {
                        e.stopPropagation();
                        onReplaceProduct(product.id, alt);
                      }}
                    >
                      <RefreshCw size={10} />
                      <span>Swap Item</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
