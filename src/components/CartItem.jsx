import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeItem, updateQuantity } from './CartSlice';

const CartItem = ({ onContinueShopping }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const [checkoutMsg, setCheckoutMsg] = useState('');

  // Grand total amount
  const totalCartAmount = cartItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  // Total number of plants
  const totalPlants = cartItems.reduce(
    (total, item) => total + item.quantity, 0
  );

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ id: item.id, delta: 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity === 1) {
      dispatch(removeItem(item.id));
    } else {
      dispatch(updateQuantity({ id: item.id, delta: -1 }));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.id));
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    if (onContinueShopping) {
      onContinueShopping(e);
    } else {
      navigate('/products');
    }
  };

  const handleCheckout = () => {
    setCheckoutMsg('Coming Soon! 🌿 Thank you for shopping with Paradise Nursery.');
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.pageTitle}>🛒 Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div style={styles.emptyCart}>
          <p style={styles.emptyText}>Your cart is empty.</p>
          <button
            style={styles.continueBtn}
            onClick={handleContinueShopping}
          >
            ← Continue Shopping
          </button>
        </div>
      ) : (
        <>
          {/* Cart Items List */}
          {cartItems.map((item) => (
            <div key={item.id} style={styles.cartItem}>
              {/* Thumbnail */}
              <img
                src={item.image}
                alt={item.name}
                style={styles.image}
              />

              {/* Plant Info */}
              <div style={styles.info}>
                <h2 style={styles.name}>{item.name}</h2>
                <p style={styles.unitPrice}>
                  Unit Price: <strong>${item.price.toFixed(2)}</strong>
                </p>
                <p style={styles.itemTotal}>
                  Total: <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                </p>
              </div>

              {/* Quantity Controls */}
              <div style={styles.qtySection}>
                <button
                  style={styles.qtyBtn}
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span style={styles.qtyValue}>{item.quantity}</span>
                <button
                  style={styles.qtyBtn}
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>

              {/* Delete Button */}
              <button
                style={styles.deleteBtn}
                onClick={() => handleRemove(item)}
              >
                🗑 Delete
              </button>
            </div>
          ))}

          {/* Cart Summary */}
          <div style={styles.summary}>
            <p style={styles.summaryRow}>
              Total Plants: <strong>{totalPlants}</strong>
            </p>
            <p style={styles.summaryRow}>
              Total Cart Amount:{' '}
              <strong style={styles.totalAmount}>${totalCartAmount}</strong>
            </p>
          </div>

          {/* Action Buttons */}
          <div style={styles.actions}>
            <button
              style={styles.continueBtn}
              onClick={handleContinueShopping}
            >
              ← Continue Shopping
            </button>
            <button
              style={styles.checkoutBtn}
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>

          {/* Checkout Message */}
          {checkoutMsg && (
            <div style={styles.checkoutMsg}>
              {checkoutMsg}
            </div>
          )}
        </>
      )}
    </div>
  );
};

const styles = {
  page: {
    maxWidth: '860px',
    margin: '0 auto',
    padding: '2rem 1.5rem',
    fontFamily: "'DM Sans', sans-serif",
  },
  pageTitle: {
    fontFamily: 'serif',
    fontSize: '2rem',
    color: '#1a3a2a',
    marginBottom: '1.5rem',
    borderBottom: '2px solid #b8dfc8',
    paddingBottom: '0.75rem',
  },
  emptyCart: {
    textAlign: 'center',
    padding: '3rem 0',
  },
  emptyText: {
    fontSize: '1.1rem',
    color: '#666',
    marginBottom: '1.5rem',
  },
  cartItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.2rem',
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '1rem 1.2rem',
    marginBottom: '1rem',
    boxShadow: '0 2px 8px rgba(26,58,42,0.10)',
    border: '1px solid #ede5d4',
    flexWrap: 'wrap',
  },
  image: {
    width: '90px',
    height: '70px',
    objectFit: 'cover',
    borderRadius: '8px',
    flexShrink: 0,
  },
  info: {
    flex: 1,
    minWidth: '160px',
  },
  name: {
    fontSize: '1rem',
    color: '#1a3a2a',
    marginBottom: '4px',
    fontFamily: 'serif',
  },
  unitPrice: {
    fontSize: '0.88rem',
    color: '#666',
    marginBottom: '4px',
  },
  itemTotal: {
    fontSize: '0.95rem',
    color: '#2d5a3d',
  },
  qtySection: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  qtyBtn: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    border: '2px solid #4a8c5c',
    backgroundColor: 'transparent',
    color: '#1a3a2a',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    lineHeight: 1,
  },
  qtyValue: {
    fontSize: '1rem',
    fontWeight: '600',
    minWidth: '28px',
    textAlign: 'center',
    color: '#1a3a2a',
  },
  deleteBtn: {
    backgroundColor: '#fff0ec',
    color: '#c0392b',
    border: '1.5px solid #e8b4aa',
    borderRadius: '7px',
    padding: '6px 14px',
    cursor: 'pointer',
    fontSize: '0.82rem',
    fontWeight: '600',
    whiteSpace: 'nowrap',
  },
  summary: {
    backgroundColor: '#f5f0e8',
    borderRadius: '10px',
    padding: '1.2rem 1.5rem',
    marginTop: '1.5rem',
    border: '1px solid #ede5d4',
  },
  summaryRow: {
    fontSize: '1rem',
    color: '#1a3a2a',
    marginBottom: '6px',
  },
  totalAmount: {
    fontSize: '1.15rem',
    color: '#2d5a3d',
  },
  actions: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1.5rem',
    flexWrap: 'wrap',
  },
  continueBtn: {
    backgroundColor: 'transparent',
    color: '#2d5a3d',
    border: '2px solid #4a8c5c',
    borderRadius: '8px',
    padding: '0.7rem 1.5rem',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  checkoutBtn: {
    backgroundColor: '#1a3a2a',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '0.7rem 2rem',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  checkoutMsg: {
    marginTop: '1rem',
    backgroundColor: '#b8dfc8',
    color: '#1a3a2a',
    borderRadius: '8px',
    padding: '1rem 1.5rem',
    fontSize: '0.95rem',
    fontWeight: '500',
    textAlign: 'center',
    border: '1px solid #7eb899',
  },
};

export default CartItem;
