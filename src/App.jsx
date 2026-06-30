import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import ProcessingScreen from './screens/ProcessingScreen';
import RecommendationsScreen from './screens/RecommendationsScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import PostPurchaseScreen from './screens/PostPurchaseScreen';

// Initial dummy products list grouped by categories
const initialProducts = [
  // Category: saree
  {
    id: 1,
    category: "saree",
    name: "Magenta Banarasi Silk Saree",
    image: "/saree.png",
    price: 1250,
    originalPrice: 2500,
    rating: 4.8,
    reviewsCount: 2450,
    matchScore: 98,
    whyRecommended: "Elegant design, matches engagement theme, fits budget constraints.",
    delivery: "Delivery Tomorrow",
    specs: {
      "Fabric": "Banarasi Art Silk",
      "Style": "Woven Zari Floral",
      "Length": "5.5 meters + 0.8 meter blouse",
      "Occasion": "Festive / Wedding Wear"
    },
    pros: ["Lightweight fabric", "Perfect for summer", "Elegant look", "Value for money"],
    cons: ["Color slightly darker than images", "Dry clean recommended"],
    alternatives: [
      {
        id: 11,
        category: "saree",
        name: "Pink Chanderi Silk Saree",
        image: "/saree.png",
        price: 1100,
        originalPrice: 2200,
        rating: 4.6,
        reviewsCount: 1850,
        matchScore: 95,
        whyRecommended: "Lightweight fabric, matches pink pastel theme.",
        delivery: "Delivery Tomorrow",
        specs: { "Fabric": "Chanderi Silk", "Style": "Zari Weave", "Length": "5.5m" },
        pros: ["Very breathable fabric", "Bright pink hue", "Easy to drape"],
        cons: ["Slightly transparent", "Dry clean suggested"]
      },
      {
        id: 12,
        category: "saree",
        name: "Kanchipuram Silk Blend Saree",
        image: "/saree.png",
        price: 1450,
        originalPrice: 2900,
        rating: 4.7,
        reviewsCount: 1210,
        matchScore: 92,
        whyRecommended: "Rich traditional look, exceeds average price slot.",
        delivery: "Delivery in 2 Days",
        specs: { "Fabric": "Silk Cotton Blend", "Style": "Heavy Gold Border", "Length": "5.5m" },
        pros: ["Rich golden border", "Stiff drape for royal look", "Durable blend"],
        cons: ["Slightly heavier than georgette"]
      }
    ]
  },
  // Category: heels
  {
    id: 2,
    category: "heels",
    name: "Golden-Strap Heel Sandal",
    image: "/heels.png",
    price: 480,
    originalPrice: 999,
    rating: 4.5,
    reviewsCount: 940,
    matchScore: 97,
    whyRecommended: "Matches saree border accents, comfortable block heel.",
    delivery: "Delivery Tomorrow",
    specs: {
      "Heel Height": "2.5 inches",
      "Closure": "Slip-on with backstrap",
      "Material": "Faux Leather & Rhinestones",
      "Type": "Block Heels"
    },
    pros: ["Comfortable cushioned footbed", "Chic golden embellishments", "Versatile styling for weddings"],
    cons: ["Runs one size smaller"],
    alternatives: [
      {
        id: 21,
        category: "heels",
        name: "Pink Kitten Heel Sandals",
        image: "/heels.png",
        price: 420,
        originalPrice: 850,
        rating: 4.3,
        reviewsCount: 410,
        matchScore: 94,
        whyRecommended: "Perfect color match for pastel outfits, low heel.",
        delivery: "Delivery Tomorrow",
        specs: { "Heel Height": "1.5 inches", "Closure": "Buckle", "Material": "Synthetic" },
        pros: ["Very low height, perfect for walking", "Soft blush pink shade"],
        cons: ["Thin straps feel tight initially"]
      },
      {
        id: 22,
        category: "heels",
        name: "Gold Block Heel Sandals",
        image: "/heels.png",
        price: 550,
        originalPrice: 1200,
        rating: 4.6,
        reviewsCount: 680,
        matchScore: 91,
        whyRecommended: "Sturdy block heel, premium golden metallic finish.",
        delivery: "Delivery in 3 Days",
        specs: { "Heel Height": "3 inches", "Closure": "Slip-on", "Material": "Faux Leather" },
        pros: ["Sturdy block heel", "Premium golden metallic finish"],
        cons: ["Heel is slightly hard"]
      }
    ]
  },
  // Category: earrings
  {
    id: 3,
    category: "earrings",
    name: "Ruby Designer Gold Jhumkas",
    image: "/earrings.png",
    price: 220,
    originalPrice: 500,
    rating: 4.6,
    reviewsCount: 1120,
    matchScore: 98,
    whyRecommended: "Traditional ruby pink stones match saree perfectly.",
    delivery: "Delivery Tomorrow",
    specs: {
      "Plating": "Gold Plated",
      "Stone": "Ruby Pink Stones & Pearls",
      "Type": "Dangle Jhumka Earrings",
      "Weight": "Lightweight (15g)"
    },
    pros: ["Exquisite detailing", "Very lightweight for long wear", "Anti-allergic ear pins"],
    cons: ["Slightly smaller than zoom photos"],
    alternatives: [
      {
        id: 31,
        category: "earrings",
        name: "Pearl Drop Jhumkas",
        image: "/earrings.png",
        price: 190,
        originalPrice: 400,
        rating: 4.4,
        reviewsCount: 520,
        matchScore: 95,
        whyRecommended: "Classic white pearls provide a matching neutral accessory.",
        delivery: "Delivery Tomorrow",
        specs: { "Plating": "Gold", "Stone": "Pearls", "Type": "Jhumka" },
        pros: ["Classic look", "White pearls match all ethnic outfits"],
        cons: ["Hanging pearls can rattle"]
      },
      {
        id: 32,
        category: "earrings",
        name: "Emerald Pink Meenakari Earrings",
        image: "/earrings.png",
        price: 260,
        originalPrice: 600,
        rating: 4.7,
        reviewsCount: 890,
        matchScore: 91,
        whyRecommended: "Detailed enamel work, slightly heavy ear weight.",
        delivery: "Delivery Tomorrow",
        specs: { "Plating": "Meenakari Gold", "Stone": "Emerald & Ruby", "Type": "Earrings" },
        pros: ["Dual color design (pink + green)", "Very colorful and festive"],
        cons: ["Slightly heavier ear hooks"]
      }
    ]
  },
  // Category: clutch
  {
    id: 4,
    category: "clutch",
    name: "Satin Designer Clutch",
    image: "/clutch.png",
    price: 350,
    originalPrice: 800,
    rating: 4.4,
    reviewsCount: 530,
    matchScore: 96,
    whyRecommended: "Fits standard phone size, elegant matching clasp.",
    delivery: "Delivery Tomorrow",
    specs: {
      "Material": "Premium Satin Fabric",
      "Closure": "Metallic Magnetic Snap",
      "Strap": "Detachable Gold Chain Strap",
      "Dimensions": "8 x 4 inches"
    },
    pros: ["Elegant satin sheen", "Fits iPhone 15 Pro Max and lipstick", "Sturdy metal frame border"],
    cons: ["Chain hook is delicate"],
    alternatives: [
      {
        id: 41,
        category: "clutch",
        name: "Embroidered Silk Potli Bag",
        image: "/clutch.png",
        price: 320,
        originalPrice: 700,
        rating: 4.5,
        reviewsCount: 650,
        matchScore: 93,
        whyRecommended: "Traditional wedding styling, drawstring enclosure.",
        delivery: "Delivery Tomorrow",
        specs: { "Material": "Silk", "Closure": "Drawstring", "Strap": "Beaded Wristlet" },
        pros: ["Traditional look", "Drawstring is easy to open and holds more volume"],
        cons: ["No rigid shape protection"]
      },
      {
        id: 42,
        category: "clutch",
        name: "Metallic Rose Gold Box Clutch",
        image: "/clutch.png",
        price: 390,
        originalPrice: 900,
        rating: 4.5,
        reviewsCount: 340,
        matchScore: 90,
        whyRecommended: "Rigid hard-case shell protects fragile items.",
        delivery: "Delivery Tomorrow",
        specs: { "Material": "Metallic Faux Leather", "Closure": "Clasp", "Strap": "Chain" },
        pros: ["Hard shell box structure", "Highly reflective premium finish"],
        cons: ["Clasp can be hard to open with one hand"]
      }
    ]
  },
  // Category: gift
  {
    id: 5,
    category: "gift",
    name: "Luxury Perfume Gift Box",
    image: "/giftbox.png",
    price: 200,
    originalPrice: 499,
    rating: 4.7,
    reviewsCount: 150,
    matchScore: 98,
    whyRecommended: "Set of 3 premium fragrances in beautiful wrap.",
    delivery: "Delivery Tomorrow",
    specs: {
      "Contains": "3 Mini EDP Perfume Sprays",
      "Volume": "3 x 20ml",
      "Fragrance Notes": "Rose, Vanilla, Musk",
      "Packaging": "Decorative Cardboard Gift Box"
    },
    pros: ["Long-lasting designer fragrance", "Beautiful floral graphics wrap", "Perfect budget-friendly gifting"],
    cons: ["Fragrance is slightly strong at first"],
    alternatives: [
      {
        id: 51,
        category: "gift",
        name: "Aroma Scented Candle Set",
        image: "/giftbox.png",
        price: 180,
        originalPrice: 399,
        rating: 4.5,
        reviewsCount: 220,
        matchScore: 94,
        whyRecommended: "Aesthetic package, includes lavender and jasmine scents.",
        delivery: "Delivery Tomorrow",
        specs: { "Contains": "2 Soy Wax Candles", "Scents": "Lavender & Jasmine" },
        pros: ["Relaxing therapeutic aroma", "Eco-friendly wax"],
        cons: ["Glass jars get warm"]
      },
      {
        id: 52,
        category: "gift",
        name: "Premium Chocolate Gift Box",
        image: "/giftbox.png",
        price: 240,
        originalPrice: 500,
        rating: 4.8,
        reviewsCount: 420,
        matchScore: 91,
        whyRecommended: "Gourmet gold wrap packaging, highly popular rating.",
        delivery: "Delivery Tomorrow",
        specs: { "Contains": "12 Assorted Truffles", "Weight": "200g" },
        pros: ["Rich dark & milk chocolates", "Gourmet gold wrap packaging"],
        cons: ["Must be stored in refrigerator"]
      }
    ]
  }
];

function AppContent({ 
  products, 
  setProducts, 
  missionText, 
  setMissionText, 
  groupBuyJoined, 
  setGroupBuyJoined, 
  resetAll 
}) {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    navigate(`/product/${product.id}`);
  };

  const handleReplaceProduct = (oldId, newProduct) => {
    setProducts(prev => prev.map(p => {
      if (p.id === oldId) {
        // Prepare old product for options list
        const oldWithoutAlternatives = { ...p, alternatives: [] };
        return {
          ...newProduct,
          id: oldId, // keep category slot id
          alternatives: p.alternatives
            .filter(alt => alt.id !== newProduct.id)
            .concat(oldWithoutAlternatives)
        };
      }
      return p;
    }));

    // Update active detail page state
    const currentActive = products.find(p => p.id === oldId);
    const oldWithoutAlternatives = { ...currentActive, alternatives: [] };
    setSelectedProduct({
      ...newProduct,
      id: oldId,
      alternatives: currentActive.alternatives
        .filter(alt => alt.id !== newProduct.id)
        .concat(oldWithoutAlternatives)
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-meesho-bgLight text-meesho-textDark antialiased">
      <Header cartCount={products.length} />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<HomeScreen setMissionText={setMissionText} />} />
          <Route path="/processing" element={<ProcessingScreen />} />
          <Route 
            path="/recommendations" 
            element={
              <RecommendationsScreen 
                products={products} 
                missionText={missionText} 
                onSelectProduct={handleSelectProduct}
              />
            } 
          />
          <Route 
            path="/product/:id" 
            element={
              <ProductDetailsScreen 
                product={selectedProduct}
                onBack={() => navigate('/recommendations')}
                onReplaceProduct={handleReplaceProduct}
              />
            } 
          />
          <Route 
            path="/checkout" 
            element={
              <CheckoutScreen 
                products={products}
                groupBuyJoined={groupBuyJoined}
                setGroupBuyJoined={setGroupBuyJoined}
              />
            } 
          />
          <Route 
            path="/post-purchase" 
            element={
              <PostPurchaseScreen onReset={resetAll} />
            } 
          />
        </Routes>
      </main>
      
      {/* Footer bar */}
      <footer className="bg-white border-t border-meesho-borderLight py-6 mt-12 text-center text-xs text-meesho-textMuted">
        <div className="max-w-7xl mx-auto px-4">
          <p>© 2026 Meesho Shopping. All rights reserved. Built with AI Shopping Companion.</p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  const [missionText, setMissionText] = useState("");
  const [products, setProducts] = useState(initialProducts);
  const [groupBuyJoined, setGroupBuyJoined] = useState(false);

  const resetAll = () => {
    setMissionText("");
    setProducts(initialProducts);
    setGroupBuyJoined(false);
  };

  return (
    <Router>
      <AppContent 
        products={products} 
        setProducts={setProducts} 
        missionText={missionText} 
        setMissionText={setMissionText} 
        groupBuyJoined={groupBuyJoined} 
        setGroupBuyJoined={setGroupBuyJoined} 
        resetAll={resetAll} 
      />
    </Router>
  );
}
