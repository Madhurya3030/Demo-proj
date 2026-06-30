import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Sparkles, Check, CheckCircle2, Ticket, ArrowRight, ShieldCheck, Star } from 'lucide-react';

export default function CartScreen({ 
  products, 
  setProducts, 
  onProductClick, 
  onApprove, 
  budget = 2500 
}) {

  const cartTotal = products.reduce((sum, item) => sum + item.price, 0);
  const originalTotal = products.reduce((sum, item) => sum + item.originalPrice, 0);
  const totalSavings = originalTotal - cartTotal;
  const budgetPercentage = Math.min((cartTotal / budget) * 100, 100);

  const removeItem = (id, e) => {
    e.stopPropagation(); // Stop navigation to details
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="cart-layout-container"
    >
      {/* Screen 3: Cart Header */}
      <div className="cart-header">
        <div className="cart-header-title">
          <h2>
            <CheckCircle2 size={26} style={{ color: '#10b981' }} />
            Mission Completed!
          </h2>
          <p>We found 5 matching products that fit perfectly within your budget constraints.</p>
        </div>
      </div>

      <div className="cart-layout">
        {/* Left Side: Items List */}
        <div className="cart-items-list">
          <AnimatePresence>
            {products.length === 0 ? (
              <motion.div 
                className="glass-panel" 
                style={{ padding: '40px', textAlign: 'center' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>Your mission cart is empty.</p>
                <button className="btn-secondary" onClick={() => window.location.reload()}>
                  Restart Mission
                </button>
              </motion.div>
            ) : (
              products.map((item) => (
                <motion.div
                  key={item.id}
                  className="cart-item-card glass-card"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => onProductClick(item)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Item Image */}
                  <div className="cart-item-img-container">
                    <img src={item.image} alt={item.name} className="cart-item-img" />
                  </div>

                  {/* Details */}
                  <div className="cart-item-details">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <div className="cart-item-meta">
                      <span className="rating-badge">
                        <Star size={11} fill="currentColor" />
                        {item.rating}
                      </span>
                      <span>({item.reviewsCount} reviews)</span>
                    </div>
                    <div className="cart-item-pricing">
                      <span className="cart-item-price">₹{item.price}</span>
                      <span className="cart-item-original">₹{item.originalPrice}</span>
                      <span className="cart-item-discount">{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% Off</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="cart-item-actions">
                    <button 
                      className="delete-btn"
                      onClick={(e) => removeItem(item.id, e)}
                      title="Remove from bundle"
                    >
                      <Trash2 size={18} />
                    </button>
                    <span style={{ fontSize: '12px', color: '#34d399', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <Check size={12} strokeWidth={3} /> Match Found
                    </span>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Right Side: Budget Summary */}
        {products.length > 0 && (
          <div className="summary-card glass-panel">
            <h3 className="summary-title">Mission Optimization Summary</h3>

            {/* Budget Progress Bar */}
            <div className="budget-progress-container">
              <div className="budget-labels">
                <span style={{ color: 'var(--text-muted)' }}>Budget Constraint:</span>
                <span style={{ fontWeight: '600' }}>₹{cartTotal} / ₹{budget}</span>
              </div>
              <div className="budget-bar-bg">
                <div 
                  className="budget-bar-fill" 
                  style={{ 
                    width: `${budgetPercentage}%`,
                    background: cartTotal > budget ? '#f87171' : 'var(--gradient-accent)'
                  }}
                ></div>
              </div>
              <span style={{ 
                fontSize: '11px', 
                color: cartTotal <= budget ? '#34d399' : '#f87171',
                textAlign: 'right',
                display: 'block'
              }}>
                {cartTotal <= budget ? '✓ Fits within Budget Limit' : '⚠ Exceeds Budget Limit'}
              </span>
            </div>

            {/* Price Details */}
            <div className="summary-rows">
              <div className="summary-row">
                <span>Original Price Total</span>
                <span>₹{originalTotal}</span>
              </div>
              <div className="summary-row savings">
                <span>Bundle Discount</span>
                <span>- ₹{totalSavings}</span>
              </div>
              <div className="summary-row">
                <span>AI Automated Coupon</span>
                <span>Applied</span>
              </div>
            </div>

            {/* Total */}
            <div className="summary-total">
              <span>Final Package Cost</span>
              <span style={{ color: 'var(--text-pink)' }}>₹{cartTotal}</span>
            </div>

            {/* Coupon alert */}
            <div className="summary-coupon-applied">
              <Ticket size={16} />
              <span>Coupon <strong>"SAHELI20"</strong> applied successfully!</span>
            </div>

            {/* Buttons */}
            <div className="summary-buttons">
              <button className="btn-primary" onClick={onApprove}>
                <span>Approve Mission</span>
                <ArrowRight size={16} />
              </button>
              <button 
                className="btn-secondary"
                onClick={() => setScreen('home')}
              >
                Modify Mission Query
              </button>
            </div>

            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '6px', 
              color: 'var(--text-muted)',
              fontSize: '11px'
            }}>
              <ShieldCheck size={13} style={{ color: '#10b981' }} />
              <span>Verified Secure Checkout by Meesho AI</span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
