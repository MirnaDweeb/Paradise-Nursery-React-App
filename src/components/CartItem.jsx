import React from 'react';
import { useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '../store/CartSlice';

export default function CartItem({ item }) {
  const dispatch = useDispatch();

  const increase = () => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const decrease = () => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    }
  };

  const remove = () => {
    dispatch(removeItem(item.id));
  };

  return (
    <div className="cart-item">

      <img
        src={item.image}
        alt={item.name}
        className="cart-item-image"
      />

      <div className="cart-item-info">
        <h3 className="cart-item-name">{item.name}</h3>

        <p className="cart-item-price">
          Price: ${item.price}
        </p>

        {/* REQUIRED CONTROLS */}
        <div className="cart-item-controls">
          <button onClick={decrease} className="qty-btn">-</button>
          <span className="qty-value">{item.quantity}</span>
          <button onClick={increase} className="qty-btn">+</button>
        </div>
      </div>

      <div className="cart-item-right">
        {/* REQUIRED TOTAL */}
        <div className="cart-item-total">
          ${(item.price * item.quantity).toFixed(2)}
        </div>

        <button className="btn-remove" onClick={remove}>
          Remove
        </button>
      </div>

    </div>
  );
}
