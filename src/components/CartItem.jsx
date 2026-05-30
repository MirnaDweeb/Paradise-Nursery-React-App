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
        className="cart-item-image"
        src={item.image}
        alt={item.name}
      />

      <div className="cart-item-info">
        <div className="cart-item-name">{item.name}</div>

        <div className="cart-item-price">
          ${item.price.toFixed(2)} each
        </div>

        {/* quantity controls */}
        <div className="cart-item-controls">
          <button className="qty-btn" onClick={decrease}>−</button>
          <span className="qty-value">{item.quantity}</span>
          <button className="qty-btn" onClick={increase}>+</button>
        </div>
      </div>

      <div className="cart-item-right">
        {/* REQUIRED total per item */}
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
