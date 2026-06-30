import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import ProcessingScreen from './screens/ProcessingScreen';
import RecommendationsScreen from './screens/RecommendationsScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import PostPurchaseScreen from './screens/PostPurchaseScreen';
import { getHomepageProducts, getRecommendationProducts } from './data/mockData';

const defaultRecommendationProducts = getRecommendationProducts();
const homepageProducts = getHomepageProducts();

const getInitialBundle = (allProducts) => {
  const categories = ["saree", "heels", "earrings", "clutch", "gift"];
  return categories.map(cat => allProducts.find(p => p.category === cat)).filter(Boolean);
};

function AppContent({ 
  products, 
  setProducts, 
  recommendationProducts,
  setRecommendationProducts,
  cart,
  setCart,
  checkoutSource,
  setCheckoutSource,
  missionText, 
  setMissionText, 
  groupBuyJoined, 
  setGroupBuyJoined, 
  resetAll 
}) {
  const navigate = useNavigate();

 const handleSelectProduct = (product, source = "homepage") => {
    navigate(`/product/${product.id}`, {
        state: {
            source
        }
    });
};

  const handleReplaceProduct = (category, newProduct) => {
    setProducts(prev => prev.map(p => {
      if (p.category === category) {
        return newProduct;
      }
      return p;
    }));
  };

  const handleAddToCart = (item) => {
    setCart(prev => {
      if (prev.some(i => i.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const handleBuyNow = (item) => {
    setCart(prev => {
      if (prev.some(i => i.id === item.id)) return prev;
      return [...prev, item];
    });
    setCheckoutSource('normal');
    navigate('/checkout');
  };

  return (
    <div className="flex flex-col min-h-screen bg-meesho-bgLight text-meesho-textDark antialiased">
      <Header 
        cartCount={cart.length} 
        setMissionText={setMissionText} 
        setCheckoutSource={setCheckoutSource}
      />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6">
        <Routes>
          <Route 
            path="/" 
            element={
              <HomeScreen 
                onSelectProduct={handleSelectProduct}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
              />
            } 
          />
          <Route path="/processing" element={<ProcessingScreen />} />
          <Route 
            path="/recommendations" 
            element={
              <RecommendationsScreen 
                allProducts={recommendationProducts}
                products={products} 
                missionText={missionText} 
                onSelectProduct={handleSelectProduct}
                setCheckoutSource={setCheckoutSource}
              />
            } 
          />
          <Route 
            path="/product/:id" 
            element={
              <ProductDetailsScreen 
                allProducts={recommendationProducts}
                homepageProducts={homepageProducts}
                products={products}
                onBack={() => navigate(-1)}
                onReplaceProduct={handleReplaceProduct}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
                setCheckoutSource={setCheckoutSource}
              />
            } 
          />
          <Route 
            path="/checkout" 
            element={
              <CheckoutScreen 
                products={checkoutSource === 'saheli' ? products : cart}
                isSaheli={checkoutSource === 'saheli'}
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
          <p>© 2026 Meesho Shopping. All rights reserved. Built with Saheli – Your AI Shopping Companion.</p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  const [missionText, setMissionText] = useState("");
  const [recommendationProducts, setRecommendationProducts] = useState(defaultRecommendationProducts);
  const [products, setProducts] = useState(() => getInitialBundle(defaultRecommendationProducts));
  const [cart, setCart] = useState([]);
  const [checkoutSource, setCheckoutSource] = useState('normal');
  const [groupBuyJoined, setGroupBuyJoined] = useState(false);

  const resetAll = () => {
    setMissionText("");
    setRecommendationProducts(defaultRecommendationProducts);
    setProducts(getInitialBundle(defaultRecommendationProducts));
    setCart([]);
    setCheckoutSource('normal');
    setGroupBuyJoined(false);
  };

  return (
    <Router>
      <AppContent 
        products={products} 
        setProducts={setProducts} 
        recommendationProducts={recommendationProducts}
        setRecommendationProducts={setRecommendationProducts}
        cart={cart}
        setCart={setCart}
        checkoutSource={checkoutSource}
        setCheckoutSource={setCheckoutSource}
        missionText={missionText} 
        setMissionText={setMissionText} 
        groupBuyJoined={groupBuyJoined} 
        setGroupBuyJoined={setGroupBuyJoined} 
        resetAll={resetAll} 
      />
    </Router>
  );
}
