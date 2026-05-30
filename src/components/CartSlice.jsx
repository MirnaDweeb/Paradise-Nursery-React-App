import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addItem(state, action) {
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
    updateQuantity(state, action) {
      const { id, delta } = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
          state.items = state.items.filter(i => i.id !== id);
        }
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
