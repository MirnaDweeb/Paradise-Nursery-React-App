import React from 'react';
import { useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

export default function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <div className="cart-item">
      <img className="cart-item-image" src={item.image} alt={item.name} />

      <div className="cart-item-info">
        <div className="cart-item-name">{item.name}</div>
        <div className="cart-item-price">${item.price.toFixed(2)} each</div>
        <div className="cart-item-controls">
          <button
            className="qty-btn"
            onClick={() => dispatch(updateQuantity({ id: item.id, delta: -1 }))}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="qty-value">{item.quantity}</span>
          <button
            className="qty-btn"
            onClick={() => dispatch(updateQuantity({ id: item.id, delta: 1 }))}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      <div className="cart-item-right">
        <div className="cart-item-total">
          ${(item.price * item.quantity).toFixed(2)}
        </div>
        <button
          className="btn-remove"
          onClick={() => dispatch(removeItem(item.id))}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
