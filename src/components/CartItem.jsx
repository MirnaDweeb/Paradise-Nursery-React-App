import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleIncrement = () => {
    dispatch(updateQuantity({ id: item.id, delta: 1 }));
  };

  const handleDecrement = () => {
    if (item.quantity === 1) {
      dispatch(removeItem(item.id));
    } else {
      dispatch(updateQuantity({ id: item.id, delta: -1 }));
    }
  };

  const handleRemove = () => {
    dispatch(removeItem(item.id));
  };

  // Total cost for this specific item
  const itemTotalCost = (item.price * item.quantity).toFixed(2);

  // Grand total for all items in cart
  const totalCartAmount = cartItems
    .reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0)
    .toFixed(2);

  // Total number of plants in cart
  const totalPlants = cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity, 0
  );

  return (
    <div className="cart-item" style={styles.cartItem}>
      <img src={item.image} alt={item.name} style={styles.image} />

      <div style={styles.details}>
        <h2 style={styles.name}>{item.name}</h2>
        <p style={styles.unitPrice}>Unit Price: ${item.price.toFixed(2)}</p>

        {/* Quantity Controls */}
        <div style={styles.quantityControls}>
          <button onClick={handleDecrement} style={styles.qtyBtn}>-</button>
          <span style={styles.quantity}>{item.quantity}</span>
          <button onClick={handleIncrement} style={styles.qtyBtn}>+</button>
        </div>

        {/* Total cost per item */}
        <p style={styles.itemTotal}>
          Total: <strong>${itemTotalCost}</strong>
        </p>

        <button onClick={handleRemove} style={styles.deleteBtn}>
          Delete
        </button>
      </div>

      {/* Cart Summary - shown once at bottom (render only for last item) */}
      {item.id === cartItems[cartItems.length - 1]?.id && (
        <div style={styles.cartSummary}>
          <h3>Total Plants: {totalPlants}</h3>
          <h3>Total Amount: ${totalCartAmount}</h3>
        </div>
      )}
    </div>
  );
};

const styles = {
  cartItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px',
    borderBottom: '1px solid #ccc',
    marginBottom: '12px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
    flexWrap: 'wrap',
    gap: '12px',
  },
  image: {
    width: '100px',
    height: '80px',
    objectFit: 'cover',
    borderRadius: '6px',
  },
  details: {
    flex: 1,
    paddingLeft: '16px',
  },
  name: {
    fontSize: '1.1rem',
    color: '#1a3a2a',
    marginBottom: '4px',
  },
  unitPrice: {
    color: '#666',
    fontSize: '0.9rem',
    marginBottom: '8px',
  },
  quantityControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '8px',
  },
  qtyBtn: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    border: '2px solid #4a8c5c',
    backgroundColor: 'transparent',
    color: '#1a3a2a',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    fontSize: '1rem',
    fontWeight: '600',
    minWidth: '24px',
    textAlign: 'center',
  },
  itemTotal: {
    fontSize: '1rem',
    color: '#1a3a2a',
    marginBottom: '10px',
  },
  deleteBtn: {
    backgroundColor: '#c0392b',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    padding: '6px 14px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: '600',
  },
  cartSummary: {
    width: '100%',
    borderTop: '2px solid #4a8c5c',
    paddingTop: '16px',
    marginTop: '12px',
    textAlign: 'right',
    color: '#1a3a2a',
  },
};

export default CartItem;
