import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { PURGE } from 'redux-persist';
import { IProduct } from '../../types/Constants';

interface ProductsState {
    products: IProduct[];
    specialProducts: IProduct[];
    relatedProducts: IProduct[];
    whatsNewProducts: IProduct[];
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

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts', 
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('api/products/');
            return response.data;
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            } else {
                return rejectWithValue('An unknown error occurred');
            }
        }
    }
);

export const checkForUpdates = createAsyncThunk(
    'products/checkForUpdates', 
    async (_, { getState, dispatch }) => {
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
            throw error;
        }
    }
);

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
            state.relatedProducts = [...state.relatedProducts].sort((a, b) => b.salesCount - a.salesCount);
        },
        getSpecialProducts: (state) => {
            state.specialProducts = state.products?.filter(product => 
                Number(product.price) > 100 || 
                product.occasion.includes('Anniversary')
            );
        },
        getPopularItems: (state) => {
            state.popularItems = [...state.products]
                .sort((a, b) => b.salesCount - a.salesCount)
                .slice(0, 5);
        },
        getWhatsNewProducts: (state) => {
            const today = new Date();
            const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
        
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
            .addCase(fetchProducts.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })
            .addCase(checkForUpdates.rejected, (state, action) => {
                state.error = 'Failed to check for updates';
            })
            .addCase(PURGE, () => initialState);
    }
});

export const { 
    getRelatedProducts, 
    getMostSoldProducts, 
    getSpecialProducts, 
    getWhatsNewProducts, 
    getPopularItems 
} = productsSlice.actions;

export default productsSlice.reducer;