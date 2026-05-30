import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { store } from './store/store';
import './App.css';

import AboutUs from './components/AboutUs';
import ProductList from './components/ProductList';
import CartItem from './components/CartItem';

/* ── Navbar ──────────────────────────────────────────────────────── */
function Navbar() {
  const totalItems = useSelector(s =>
    s.cart.items.reduce((sum, i) => sum + i.quantity, 0)
  );

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <span className="leaf-icon">🌿</span>
        Paradise Nursery
      </Link>
      <div className="navbar-links">
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/products" className="nav-link">Plants</Link>
        <Link to="/cart" className="cart-btn">
          🛒 Cart
          {totalItems > 0 && (
            <span className="cart-badge">{totalItems}</span>
          )}
        </Link>
      </div>
    </nav>
  );
}

/* ── Landing ─────────────────────────────────────────────────────── */
function Landing() {
  const navigate = useNavigate();
  return (
    <div className="landing">
      <div className="landing-bg" />
      <div className="landing-overlay">
        <span className="landing-eyebrow">🌱 Est. 2008 · Cairo & Beyond</span>
        <h1 className="landing-title">
          <em>Paradise</em><br />Nursery
        </h1>
        <p className="landing-subtitle">Bring the wild indoors.</p>
        <p className="landing-desc">
          Thoughtfully grown plants for curious people. Whether you want a 
          sun-soaked succulent or a dramatic tropical statement piece, 
          we have the perfect plant waiting for your space.
        </p>
        <button className="btn-primary" onClick={() => navigate('/products')}>
          Shop Plants &rarr;
        </button>
        <div className="landing-stats">
          <div className="stat">
            <span className="stat-number">200+</span>
            <span className="stat-label">Plant varieties</span>
          </div>
          <div className="stat">
            <span className="stat-number">15K</span>
            <span className="stat-label">Happy homes</span>
          </div>
          <div className="stat">
            <span className="stat-number">100%</span>
            <span className="stat-label">Organic grown</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Cart Page ───────────────────────────────────────────────────── */
function Cart() {
  const items = useSelector(s => s.cart.items);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const totalItems  = items.reduce((s, i) => s + i.quantity, 0);
  const grandTotal  = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping    = grandTotal > 50 ? 0 : 5.99;
  const orderTotal  = grandTotal + shipping;

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-empty">
          <div className="cart-empty-icon">🪴</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any plants yet.</p>
          <button className="btn-primary" onClick={() => navigate('/products')}>
            Browse Plants
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Your Cart</h1>
        <span className="cart-count-label">
          {totalItems} {totalItems === 1 ? 'plant' : 'plants'}
        </span>
      </div>

      <div className="cart-layout">
        <div className="cart-items-list">
          {items.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal ({totalItems} items)</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? '🎉 Free' : `$${shipping.toFixed(2)}`}</span>
          </div>
          {shipping > 0 && (
            <div className="summary-row" style={{ fontSize: '0.78rem', color: 'var(--fern)' }}>
              <span>Add ${(50 - grandTotal).toFixed(2)} more for free shipping</span>
            </div>
          )}
          <div className="summary-row total">
            <span>Total</span>
            <span>${orderTotal.toFixed(2)}</span>
          </div>
          <button className="btn-checkout" onClick={() => setShowModal(true)}>
            Checkout
          </button>
          <Link to="/products" className="btn-continue">
            ← Continue Shopping
          </Link>
        </div>
      </div>

      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-icon">🌿</div>
            <h2>Order Placed!</h2>
            <p>
              Thank you for shopping at Paradise Nursery.<br />
              Your {totalItems} {totalItems === 1 ? 'plant' : 'plants'} will be 
              lovingly packed and shipped to you soon.
            </p>
            <button
              className="btn-modal-close"
              onClick={() => { setShowModal(false); navigate('/'); }}
            >
              Back to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Footer ──────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="footer">
      © {new Date().getFullYear()} <span>Paradise Nursery</span>. 
      Grown with care. Shipped with love. 🌱
    </footer>
  );
}

/* ── App ─────────────────────────────────────────────────────────── */
function AppInner() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"         element={<Landing />} />
        <Route path="/about"    element={<AboutUs />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/cart"     element={<Cart />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppInner />
    </Provider>
  );
}
