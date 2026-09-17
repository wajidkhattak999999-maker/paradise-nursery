
import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    // Reducer function to add an item to the cart
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find((item) => item.name === name);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },

    // Reducer function to remove an item from the cart
    removeItem: (state, action) => {
      const itemName = typeof action.payload === 'object' ? action.payload.name : action.payload;
      state.items = state.items.filter((item) => item.name !== itemName);
    },

    // Reducer function to update the quantity of an item
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find((item) => item.name === name);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
    },
  },
});

// Export action creators for the reducers
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Export the reducer as default
export default CartSlice.reducer;
