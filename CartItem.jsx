
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './App.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart
      .reduce((total, item) => {
        const itemPrice = parseFloat(item.cost.substring(1)) || 0;
        return total + itemPrice * item.quantity;
      }, 0)
      .toFixed(2);
  };

  // Calculate total cost based on quantity for an individual item
  const calculateTotalCost = (item) => {
    const unitPrice = parseFloat(item.cost.substring(1)) || 0;
    return (unitPrice * item.quantity).toFixed(2);
  };

  // Handle continue shopping action
  const handleContinueShopping = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    if (onContinueShopping) {
      onContinueShopping(e);
    }
  };

  // Handle checkout placeholder button
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference: Coming Soon!');
  };

  // Increment item quantity
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Decrement item quantity (if quantity drops to 0, remove item)
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // Remove item completely from cart
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>Your Shopping Cart</h2>
        <div className="cart-total-amount">
          Total Cart Amount: ${calculateTotalAmount()}
        </div>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart-message">
          <p>Your cart is currently empty.</p>
          <div className="cart-bottom-actions" style={{ justifyContent: 'center' }}>
            <button className="continue-shopping-btn" onClick={handleContinueShopping}>
              Continue Shopping
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="cart-items-list">
            {cart.map((item) => (
              <div className="cart-item-card" key={item.name}>
                <img className="cart-item-image" src={item.image} alt={item.name} />
                
                <div className="cart-item-info">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <div className="cart-item-unit-cost">Unit Price: {item.cost}</div>
                  <div className="cart-item-subtotal">
                    Subtotal: ${calculateTotalCost(item)}
                  </div>
                </div>

                <div className="cart-item-actions">
                  <button
                    className="quantity-btn"
                    onClick={() => handleDecrement(item)}
                  >
                    -
                  </button>
                  <span className="cart-item-quantity">{item.quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() => handleIncrement(item)}
                  >
                    +
                  </button>
                </div>

                <button
                  className="delete-btn"
                  onClick={() => handleRemove(item)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          <div className="cart-bottom-actions">
            <button className="continue-shopping-btn" onClick={handleContinueShopping}>
              Continue Shopping
            </button>
            <button className="checkout-btn" onClick={handleCheckoutShopping}>
              Checkout (Coming Soon)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItem;
