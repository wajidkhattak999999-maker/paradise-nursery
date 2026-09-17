
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './App.css';

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Calculate total number of items dynamically for the cart badge
  const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // 3 distinct categories with at least 6 unique houseplants each (18 plants total)
  const plantsArray = [
    {
      category: 'Air Purifying Plants',
      plants: [
        {
          name: 'Snake Plant',
          image: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?auto=format&fit=crop&w=600&q=80',
          description: 'Produces oxygen at night and removes indoor airborne toxins.',
          cost: '$15',
        },
        {
          name: 'Spider Plant',
          image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?auto=format&fit=crop&w=600&q=80',
          description: 'Filters formaldehyde and xylene from indoor air effortlessly.',
          cost: '$12',
        },
        {
          name: 'Peace Lily',
          image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e7355?auto=format&fit=crop&w=600&q=80',
          description: 'Graceful white blooms and exceptional air-purifying capability.',
          cost: '$18',
        },
        {
          name: 'Boston Fern',
          image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80',
          description: 'Acts as a natural humidifier with lush, arching green fronds.',
          cost: '$16',
        },
        {
          name: 'Rubber Plant',
          image: 'https://images.unsplash.com/photo-1597055181300-e3633a917c9c?auto=format&fit=crop&w=600&q=80',
          description: 'Broad glossy leaves that capture dust and cleanse room air.',
          cost: '$20',
        },
        {
          name: 'Aloe Vera',
          image: 'https://images.unsplash.com/photo-1567689265664-1c48de61db0b?auto=format&fit=crop&w=600&q=80',
          description: 'Healing succulent that also purifies air from benzene and formaldehyde.',
          cost: '$10',
        },
      ],
    },
    {
      category: 'Aromatic Fragrant Plants',
      plants: [
        {
          name: 'English Lavender',
          image: 'https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?auto=format&fit=crop&w=600&q=80',
          description: 'Soothing floral scent that reduces stress and encourages sleep.',
          cost: '$15',
        },
        {
          name: 'Rosemary',
          image: 'https://images.unsplash.com/photo-1515586000433-a5bc720b3603?auto=format&fit=crop&w=600&q=80',
          description: 'Crisp, invigorating pine scent that sharpens concentration.',
          cost: '$12',
        },
        {
          name: 'Jasmine',
          image: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=600&q=80',
          description: 'Exquisite sweet fragrance with delicate star-shaped blossoms.',
          cost: '$22',
        },
        {
          name: 'Peppermint',
          image: 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?auto=format&fit=crop&w=600&q=80',
          description: 'Refreshing herbal fragrance that enlivens spaces naturally.',
          cost: '$10',
        },
        {
          name: 'Lemon Balm',
          image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80',
          description: 'Bright citrus scent that uplifts mood and freshens stale air.',
          cost: '$14',
        },
        {
          name: 'Gardenia',
          image: 'https://images.unsplash.com/photo-1594904351111-a072f80b1a71?auto=format&fit=crop&w=600&q=80',
          description: 'Deep intoxicating aroma paired with velvety white flowers.',
          cost: '$25',
        },
      ],
    },
    {
      category: 'Low Maintenance / Easy Care',
      plants: [
        {
          name: 'ZZ Plant',
          image: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?auto=format&fit=crop&w=600&q=80',
          description: 'Hardy and tolerant of low-light conditions and infrequent watering.',
          cost: '$18',
        },
        {
          name: 'Cast Iron Plant',
          image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80',
          description: 'Extremely durable houseplant that handles neglect with ease.',
          cost: '$24',
        },
        {
          name: 'Golden Pothos',
          image: 'https://images.unsplash.com/photo-1596724817757-5b6585141097?auto=format&fit=crop&w=600&q=80',
          description: 'Fast-growing trailing vine that thrives in diverse environments.',
          cost: '$14',
        },
        {
          name: 'Jade Plant',
          image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=600&q=80',
          description: 'Classic succulent with fleshy leaves, symbolizing good fortune.',
          cost: '$15',
        },
        {
          name: 'Chinese Evergreen',
          image: 'https://images.unsplash.com/photo-1598880940371-c756e015fea1?auto=format&fit=crop&w=600&q=80',
          description: 'Striking patterned foliage that tolerates drought and low light.',
          cost: '$19',
        },
        {
          name: 'Haworthia Zebra',
          image: 'https://images.unsplash.com/photo-1509223197845-458d87318791?auto=format&fit=crop&w=600&q=80',
          description: 'Compact striped succulent requiring very little care and sunlight.',
          cost: '$11',
        },
      ],
    },
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prev) => ({ ...prev, [plant.name]: true }));
  };

  const handleContinueShopping = () => {
    setShowCart(false);
  };

  return (
    <div>
      {/* Navbar visible on both Product Listing and Cart pages */}
      <nav className="navbar">
        <div className="navbar-brand" onClick={onHomeClick}>
          <span className="brand-icon">🌿</span>
          <div>
            <div className="brand-title">Paradise Nursery</div>
            <div className="brand-subtitle">Where Green Meets Serenity</div>
          </div>
        </div>

        <div className="navbar-links">
          <span className="nav-link" onClick={onHomeClick}>
            Home
          </span>
          <span className="nav-link" onClick={() => setShowCart(false)}>
            Plants
          </span>
          <div className="cart-icon-container" onClick={() => setShowCart(true)}>
            <span>🛒</span>
            <span className="cart-count-badge">{totalCartCount}</span>
          </div>
        </div>
      </nav>

      {/* Conditional View: Cart or Product List */}
      {!showCart ? (
        <div className="product-list-container">
          {plantsArray.map((categoryObj, index) => (
            <div key={index} className="category-section">
              <h2 className="category-title">{categoryObj.category}</h2>
              <div className="category-divider"></div>
              
              <div className="plants-grid">
                {categoryObj.plants.map((plant, pIndex) => (
                  <div key={pIndex} className="plant-card">
                    <img src={plant.image} alt={plant.name} className="plant-image" />
                    <div className="plant-details">
                      <h3 className="plant-name">{plant.name}</h3>
                      <p className="plant-description">{plant.description}</p>
                      <div className="plant-price">{plant.cost}</div>
                      
                      <button
                        className="add-to-cart-btn"
                        disabled={addedToCart[plant.name]}
                        onClick={() => handleAddToCart(plant)}
                      >
                        {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;
