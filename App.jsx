
import React, { useState } from 'react';
import ProductList from './ProductList';
import AboutUs from './AboutUs';
import './App.css';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  const handleGetStarted = () => {
    setShowProductList(true);
  };

  return (
    <div className="app-container">
      {!showProductList ? (
        <div className="background-image">
          <div className="landing-overlay">
            <div className="landing-content">
              <h1 className="landing-title">Welcome to Paradise Nursery</h1>
              <div className="divider"></div>
              <p className="landing-tagline">Where Green Meets Serenity</p>

              {/* About Us Component */}
              <AboutUs />

              <button className="get-started-btn" onClick={handleGetStarted}>
                Get Started
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="product-list-view">
          <ProductList onHomeClick={() => setShowProductList(false)} />
        </div>
      )}
    </div>
  );
}

export default App;
