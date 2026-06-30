import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, RefreshCw, AlertTriangle, Brain, Sparkles, ShoppingBag } from 'lucide-react';

export default function PostPurchaseScreen({ onReset }) {
  const navigate = useNavigate();
  const [returnSimulated, setReturnSimulated] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  const [aiLearned, setAiLearned] = useState(false);

  const returnReasons = [
    { id: 'tight', text: 'Too Tight / Slim Fit', label: 'Preferred Fit: Regular Fit', avoid: 'Avoid Slim Fit' },
    { id: 'color', text: 'Wrong Color / Shade', label: 'Preferred Colors: Pastels', avoid: 'Avoid Dark Saturation' },
    { id: 'fabric', text: 'Fabric quality not as expected', label: 'Preferred Fabric: Cotton/Silk Blend', avoid: 'Avoid Synthetics' },
    { id: 'size', text: 'Size runs small', label: 'Preferred Size: Select One Size Up', avoid: 'Avoid Standard Sizing' }
  ];

  const handleSelectReason = (reason) => {
    setSelectedReason(reason);
    setAiLearned(true);
  };

  const handleRestart = () => {
    onReset();
    navigate('/');
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8 text-meesho-textDark">
      {!returnSimulated ? (
        /* Purchase Complete Card */
        <div className="bg-white border border-meesho-borderLight rounded-lg p-8 text-center space-y-6 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-green-50 border border-green-200 text-green-600 flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 size={24} />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-xl font-bold">Order Placed Successfully!</h2>
            <p className="text-xs text-meesho-textMuted leading-relaxed">
              Your AI Shopping Companion has successfully completed the purchase and notified the merchants.
            </p>
          </div>

          <div className="bg-meesho-bgLight border border-meesho-borderLight rounded p-3 text-xs inline-flex justify-between items-center w-full max-w-sm">
            <span className="text-meesho-textMuted">Estimated Delivery:</span>
            <span className="font-bold text-meesho-purple">Tomorrow, by 2:00 PM</span>
          </div>

          <div className="pt-6 border-t border-meesho-borderLight space-y-4 max-w-sm mx-auto">
            <p className="text-[10px] text-meesho-textMuted italic leading-normal">
              Click the button below to simulate delivery completion and test the AI return feedback loop.
            </p>
            <button 
              className="w-full py-2.5 bg-meesho-purple hover:bg-meesho-hoverPurple text-white font-bold text-xs rounded transition flex items-center justify-center gap-1.5 shadow-sm"
              onClick={() => setReturnSimulated(true)}
            >
              <RefreshCw size={14} />
              <span>Simulate 3 Days Later (Return Product)</span>
            </button>
          </div>
        </div>
      ) : (
        /* Return Simulation Panel */
        <div className="space-y-6">
          <div className="bg-white border border-meesho-borderLight rounded-lg p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-meesho-bgLight">
              <AlertTriangle className="text-meesho-purple" size={20} />
              <h2 className="text-sm font-bold">Simulate Return: Magenta Saree</h2>
            </div>
            
            <p className="text-xs text-meesho-textMuted leading-relaxed">
              Why are you returning? Select a feedback option to update the AI's preference rules.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {returnReasons.map((reason) => (
                <button
                  key={reason.id}
                  className={`p-3 border rounded text-left font-semibold transition flex items-center justify-between focus:outline-none ${
                    selectedReason.id === reason.id 
                      ? "bg-purple-50 border-meesho-purple text-meesho-purple" 
                      : "bg-white border-meesho-borderLight text-meesho-textDark hover:bg-meesho-bgLight"
                  }`}
                  onClick={() => handleSelectReason(reason)}
                >
                  <span>{reason.text}</span>
                  <Brain size={14} className="shrink-0 text-meesho-textMuted" />
                </button>
              ))}
            </div>
          </div>

          {/* AI Learning Updates Card */}
          {aiLearned && (
            <div className="bg-white border border-green-300 rounded-lg p-5 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-meesho-bgLight">
                <div className="flex items-center gap-2">
                  <Brain className="text-green-600" size={20} />
                  <h3 className="text-sm font-bold">🧠 AI Learning Profile Updated</h3>
                </div>
                <span className="bg-green-600 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">
                  Learned
                </span>
              </div>

              <p className="text-xs text-meesho-textMuted leading-relaxed">
                Based on your return reason <strong>"{selectedReason.text}"</strong>, the AI companion has updated your shopper profile constraints:
              </p>

              <div className="space-y-3.5 text-xs text-meesho-textDark bg-meesho-bgLight p-4 rounded border border-meesho-borderLight">
                <div className="flex justify-between border-b border-white pb-2">
                  <span className="text-meesho-textMuted font-medium">Preferred Fit</span>
                  <span className="font-bold text-green-600">Regular Fit</span>
                </div>
                <div className="flex justify-between border-b border-white pb-2">
                  <span className="text-meesho-textMuted font-medium">Avoid Fit Style</span>
                  <span className="font-bold text-red-500">Avoid Slim Fit</span>
                </div>
                <div className="flex justify-between border-b border-white pb-2">
                  <span className="text-meesho-textMuted font-medium">Preferred Colors</span>
                  <span className="font-bold text-green-600">Pastels</span>
                </div>
                <div className="flex justify-between border-b border-white pb-2">
                  <span className="text-meesho-textMuted font-medium">Budget Bracket</span>
                  <span className="font-bold text-meesho-textDark">₹2000 – ₹3000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-meesho-textMuted font-medium">Learned Rule</span>
                  <span className="font-bold text-meesho-purple">{selectedReason.label} ({selectedReason.avoid})</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-xs text-green-600 font-bold bg-[#E8F5E9] p-3 rounded">
                <Sparkles size={16} />
                <span>Future recommendations updated.</span>
              </div>

              <button 
                className="w-full py-2.5 bg-meesho-purple hover:bg-meesho-hoverPurple text-white font-bold text-xs rounded transition flex items-center justify-center shadow-sm"
                onClick={handleRestart}
              >
                Start New Shopping Mission
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
