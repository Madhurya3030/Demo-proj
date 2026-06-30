import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Truck, Percent, Users, UserPlus, Info, Check, Package, Sparkles, CreditCard, ArrowLeft } from 'lucide-react';

export default function CheckoutScreen({ 
  products, 
  groupBuyJoined,
  setGroupBuyJoined
}) {
  const navigate = useNavigate();
  const cartTotal = products.reduce((sum, item) => sum + item.price, 0);
  const betterSellerDiscount = 120;
  const groupBuySavings = 180;

  // Final Calculations
  const subtotal = cartTotal;
  const finalPrice = subtotal - betterSellerDiscount - (groupBuyJoined ? groupBuySavings : 0);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 text-meesho-textDark">
      {/* Back button */}
      <button 
        onClick={() => navigate('/recommendations')}
        className="flex items-center gap-1.5 text-xs text-meesho-purple font-bold hover:underline mb-6 focus:outline-none"
      >
        <ArrowLeft size={14} />
        Back to Recommendations
      </button>

      {/* Header */}
      <div className="mb-6 pb-4 border-b border-meesho-borderLight text-center md:text-left">
        <h1 className="text-xl font-bold flex items-center justify-center md:justify-start gap-2">
          <ShieldCheck className="text-green-600" size={24} />
          AI Cart Optimization & Checkout
        </h1>
        <p className="text-xs text-meesho-textMuted mt-1">
          Our agents have matched products, applied coupons, and coordinated logistics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Left Side: Optimizations and Group Buy (2 Cols) */}
        <div className="md:col-span-2 space-y-6">
          {/* AI Optimizations */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-meesho-purple flex items-center gap-1">
              <Sparkles size={14} />
              AI Agent Optimizations Applied
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white border border-meesho-borderLight rounded-lg p-4 flex gap-3 shadow-sm">
                <div className="w-8 h-8 rounded bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                  <Users size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold">Better Seller Swapped</h4>
                  <p className="text-[10px] text-meesho-textMuted mt-0.5">Swapped saree to highest-rated merchant. Saved <strong>₹120</strong>.</p>
                </div>
              </div>

              <div className="bg-white border border-meesho-borderLight rounded-lg p-4 flex gap-3 shadow-sm">
                <div className="w-8 h-8 rounded bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                  <Percent size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold">Coupon Stacked</h4>
                  <p className="text-[10px] text-meesho-textMuted mt-0.5">Applied coupon code <strong>"COMPANION20"</strong>. Saved extra 20%.</p>
                </div>
              </div>

              <div className="bg-white border border-meesho-borderLight rounded-lg p-4 flex gap-3 shadow-sm">
                <div className="w-8 h-8 rounded bg-purple-50 text-meesho-purple flex items-center justify-center shrink-0">
                  <Truck size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold">Consolidated Courier</h4>
                  <p className="text-[10px] text-meesho-textMuted mt-0.5">Unified all items into 1 package. Delivery scheduled for <strong>Tomorrow</strong>.</p>
                </div>
              </div>

              <div className="bg-white border border-meesho-borderLight rounded-lg p-4 flex gap-3 shadow-sm">
                <div className="w-8 h-8 rounded bg-purple-50 text-meesho-purple flex items-center justify-center shrink-0">
                  <Package size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold">Free Combo Wrapping</h4>
                  <p className="text-[10px] text-meesho-textMuted mt-0.5">Gift wrap box options applied automatically for <strong>Free</strong>.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Smart Group Buy */}
          <div className="bg-white border border-meesho-borderLight rounded-lg p-5 shadow-sm space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-meesho-bgLight">
              <h3 className="text-sm font-bold text-meesho-textDark flex items-center gap-2">
                <Users className="text-meesho-purple" size={18} />
                👥 Smart Group Buy
              </h3>
              <span className="bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">Save ₹180</span>
            </div>

            <div className="flex gap-4 items-center">
              {/* Profile Avatars Overlay */}
              <div className="flex items-center -space-x-2 shrink-0">
                <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-500 text-white text-[10px] font-bold flex items-center justify-center">A</div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-pink-500 text-white text-[10px] font-bold flex items-center justify-center">M</div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-green-500 text-white text-[10px] font-bold flex items-center justify-center">S</div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-yellow-500 text-white text-[10px] font-bold flex items-center justify-center">K</div>
              </div>
              
              <p className="text-xs text-meesho-textMuted leading-relaxed">
                <strong>4 shoppers nearby</strong> are buying matching items. Grouping your parcel with their shipping cluster cuts warehouse routing costs, saving you <span className="font-bold text-green-600">₹180</span>.
              </p>
            </div>

            <div className="flex gap-3">
              <button 
                className={`flex-1 py-2 px-4 rounded text-xs font-bold transition flex items-center justify-center gap-1.5 border shadow-sm ${
                  groupBuyJoined 
                    ? "bg-green-600 border-green-600 text-white hover:bg-green-700" 
                    : "border-meesho-purple text-meesho-purple hover:bg-meesho-purple hover:text-white"
                }`}
                onClick={() => setGroupBuyJoined(true)}
              >
                {groupBuyJoined ? (
                  <>
                    <Check size={14} strokeWidth={3} />
                    <span>Group Joined</span>
                  </>
                ) : (
                  <>
                    <UserPlus size={14} />
                    <span>Join Group Buy (-₹180)</span>
                  </>
                )}
              </button>

              {groupBuyJoined && (
                <button 
                  className="px-4 py-2 border border-meesho-borderLight text-xs text-meesho-textDark hover:bg-meesho-bgLight rounded font-bold transition"
                  onClick={() => setGroupBuyJoined(false)}
                >
                  Skip
                </button>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-[10px] text-meesho-textMuted bg-meesho-bgLight p-2.5 rounded border border-meesho-borderLight">
              <Info size={14} className="shrink-0" />
              <span>Group buying is suggested only when it genuinely reduces cost.</span>
            </div>
          </div>
        </div>

        {/* Right Side: Order Summary Column (1 Col) */}
        <div className="md:col-span-1 space-y-4">
          <div className="bg-white border border-meesho-borderLight rounded-lg p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-meesho-textDark border-b border-meesho-borderLight pb-3 flex items-center gap-1.5">
              <CreditCard size={16} />
              Billing Details
            </h3>

            <div className="space-y-2.5 text-xs text-meesho-textDark">
              <div className="flex justify-between">
                <span className="text-meesho-textMuted">Product Bundle Total</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-green-600 font-medium">
                <span>Seller Swap Discount</span>
                <span>- ₹{betterSellerDiscount}</span>
              </div>
              {groupBuyJoined && (
                <div className="flex justify-between text-green-600 font-medium">
                  <span>Group Buy Discount</span>
                  <span>- ₹{groupBuySavings}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-meesho-textMuted">Delivery & Packaging</span>
                <span className="text-green-600 font-semibold">FREE</span>
              </div>
              <div className="border-t border-meesho-borderLight pt-3 flex justify-between font-extrabold text-sm">
                <span>Amount Payable</span>
                <span className="text-[#F43397]">₹{finalPrice}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-meesho-borderLight">
              <button
                className="w-full py-2.5 bg-meesho-purple hover:bg-meesho-hoverPurple text-white font-bold text-xs rounded transition flex items-center justify-center gap-1 shadow-sm"
                onClick={() => navigate('/post-purchase')}
              >
                <span>Place Order (Cash on Delivery)</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center gap-1.5 p-3 bg-meesho-bgLight border border-meesho-borderLight rounded text-[10px] text-meesho-textMuted">
            <ShieldCheck size={14} className="text-green-600" />
            <span>Meesho Verified Safe checkout</span>
          </div>
        </div>
      </div>
    </div>
  );
}
