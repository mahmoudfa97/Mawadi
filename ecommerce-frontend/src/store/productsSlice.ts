import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../components/Constants/Constants';
import axios from 'axios';
import { PURGE } from 'redux-persist';

interface ProductsState {
    products: IProduct[];
    specialProducts: IProduct[];
    relatedProducts: IProduct[];
    whatsNewProducts: IProduct[],
    popularItems: IProduct[];
    loading: boolean;
    error: string | null;
    lastUpdated: number;
}

const initialState: ProductsState = {
    products: [],
    specialProducts: [],
    relatedProducts: [],
    whatsNewProducts: [],
    popularItems: [],
    loading: false,
    error: null,
    lastUpdated: 0
};

// Async thunk to fetch products from server
export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('api/products/');  // Replace with your actual API endpoint
        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            return rejectWithValue(error.message);  // Error message if it's an instance of Error
        } else {
            return rejectWithValue('An unknown error occurred');
        }
    }
});
export const checkForUpdates = createAsyncThunk('products/checkForUpdates', async (_, { getState, dispatch }) => {
    const state = getState() as { products: ProductsState };
    const lastUpdated = state.products.lastUpdated;

    try {
        const response = await axios.get(`api/products/updates?since=${lastUpdated}`);
        if (response.data.hasUpdates) {
            dispatch(fetchProducts());
        }
        return response.data;
    } catch (error) {
        console.error('Failed to check for updates:', error);
    }
});

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        getRelatedProducts: (state, action: PayloadAction<number>) => {
            const currentProduct = state.products?.find(product => product.id === action.payload);
            if (currentProduct) {
                state.relatedProducts = state.products.filter(product => 
                    product.id !== currentProduct.id &&
                    (product.category === currentProduct.category || 
                     product.tags.some(tag => currentProduct.tags.includes(tag)) || 
                     product.occasion.some(occ => currentProduct.occasion.includes(occ)))
                );
            }
        },
        getMostSoldProducts: (state) => {
            state.relatedProducts = state.relatedProducts.sort((a, b) => b.salesCount - a.salesCount);
        },
        getSpecialProducts: (state) => {
            state.specialProducts = state.products?.filter(product => 
                Number(product.price) > 100 || 
                product.occasion.includes('Anniversary')
            );
        },
        // New reducer for popular items
        getPopularItems: (state) => {
            state.popularItems = state.products.sort((a, b) => b.salesCount - a.salesCount).slice(0, 5); // Top 5 most sold items
        },
        getWhatsNewProducts: (state) => {
            const today = new Date();
            const thirtyDaysAgo = new Date(today);
            thirtyDaysAgo.setDate(today.getDate() - 30); 
        
         
            if (!state.products || !Array.isArray(state.products)) {
                console.warn('No products available in state.');
                state.whatsNewProducts = [];
                return;
            }
        
            state.whatsNewProducts = state.products.filter(product => {
                const productDate = new Date(product.dateAdded);
                return productDate >= thirtyDaysAgo; 
            });
        },
    },
    // Handle async actions
    extraReducers: (builder) => {
        builder
        .addCase(fetchProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
            state.products = action.payload;
            state.loading = false;
            state.lastUpdated = Date.now();
        })
        .addCase(fetchProducts.rejected, (state, action: PayloadAction<any>) => {
            state.error = action.payload;
            state.loading = false;
        })
        .addCase(PURGE, () => initialState);
}
});

// Export the action creators
export const { getRelatedProducts, getMostSoldProducts, getSpecialProducts, getWhatsNewProducts, getPopularItems } = productsSlice.actions;

// Export the reducer
export default productsSlice.reducer;
