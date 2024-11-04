import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, PersonalizationPayload } from '../types/Constants';

interface CartState {
    items: CartItem[]
}


  
const loadCartState = (): CartState => {
    try {
        const serializedState = localStorage.getItem('cartState');
        if (serializedState === null) {
            return { items: [] };
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return { items: [] };
    }
};

const saveCartState = (state: CartState) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('cartState', serializedState);
    } catch {
        // Ignore write errors
    }
};

const initialState: CartState = loadCartState();

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
            saveCartState(state);
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.id !== Number(action.payload));
            saveCartState(state);
        },
        clearCart: (state) => {
            state.items = [];
            saveCartState(state);
        },
        incrementQuantity: (state, action: PayloadAction<number>) => { // Expecting a number
            const item = state.items.find(item => item.id === action.payload);
            if (item) {
                item.quantity++;
            }
            saveCartState(state);
        },
        decrementQuantity: (state, action: PayloadAction<number>) => { // Expecting a number
            const item = state.items.find(item => item.id === action.payload);
            if (item && item.quantity === 1) {
                const index = state.items.findIndex((item) => item.id === action.payload);
                state.items.splice(index, 1);
            } else if (item) {
                item.quantity--;
            }
            saveCartState(state);
        },
        updatePersonalization: (state, action: PayloadAction<PersonalizationPayload>) => {
            const item = state.items.find(item => item.id === Number(action.payload.itemId));
            if (item && item.personalization) {
              item.personalization.videoFile = action.payload.videoFile || item.personalization.videoFile;
              item.personalization.customMessage = action.payload.customMessage || item.personalization.customMessage;
            }
          },
    },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, updatePersonalization, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
