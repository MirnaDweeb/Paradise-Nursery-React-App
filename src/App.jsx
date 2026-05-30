import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { store } from './store/store';
import './App.css';

import AboutUs from './components/AboutUs';
import ProductList from './components/ProductList';
import CartItem from './components/CartItem';

/* ── Navbar ───────────────────────────── */
function Navbar() {
  const totalItems = useSelector(s =>
    s.cart.items.reduce((sum, i) => sum + i.quantity, 0)
  );

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        🌿 Paradise Nursery
      </Link>

      <div className="navbar-links">
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/products" className="nav-link">Products</Link>
        <Link to="/cart" className="cart-btn">
          Cart {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </Link>
      </div>
    </nav>
  );
}

/* ── Landing Page (IMPORTANT) ───────────── */
function Landing() {
  const [showProducts, setShowProducts] = useState(false);

  if (showProducts) {
    return <ProductList />;
  }

  return (
    <div className="landing">
      <div className="background-image" />

      <div className="landing-overlay">
        {/* REQUIRED EXACT TEXT */}
        <h1>Welcome to Paradise Nursery</h1>

        <p>
          Your one-stop destination for indoor and outdoor plants.
        </p>

        {/* REQUIRED BUTTON TEXT */}
        <button
          className="btn-primary"
          onClick={() => setShowProducts(true)}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

/* ── Cart ───────────────────────────── */
function Cart() {
  const items = useSelector(s => s.cart.items);

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <div className="cart-page">
      <h1>Cart ({totalItems})</h1>

      {items.map(item => (
        <CartItem key={item.id} item={item} />
      ))}

      <h3>Total: ${total.toFixed(2)}</h3>
    </div>
  );
}

/* ── App ───────────────────────────── */
function AppInner() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
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
