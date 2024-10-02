/*import {
createSlice,
PayloadAction
} from "@reduxjs/toolkit";
  
const initialState: Cart = {
  items: [],
  total: 0,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Product>) => {
      const existingitem = state.items.find((item) => item.product.name === action.payload.name);
      if (existingitem) {
        existingitem.quantity += 1;
      } else {
        state.items.push({product: action.payload, quantity: 1});
      }
      state.total = calculateTotal(state.items);
    },
    removeItem: (state, action: PayloadAction<Product>) => {
      const index = state.items.findIndex((item) => item.product.name === action.payload.name);
      if (index !== -1) {
        state.items[index].quantity -= 1;
        if (state.items[index].quantity === 0) {
          state.items.splice(index, 1);
        }
        state.total = calculateTotal(state.items);
      }
    }
  }
});

// Export the action creators
export const {
  addItem,
  removeItem
} = cartSlice.actions;

// Export the reducer
export default cartSlice.reducer;*/