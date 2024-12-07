import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from './slices/cartSlice'
import utilsSlice from './slices/utilssSlice'
import productReducer from './slices/productsSlice'
import userReducer from './slices/userSlice'
import { checkoutReducer } from './reducer'
import apiReducer from './slices/apiSlice'; // Import the API reducer

const persistConfig = {
  key: 'data',
  storage,
  whitelist: ['products','user','isLoggedIn'],
};

const persistedReducer = persistReducer(persistConfig, productReducer);
const persistedReducers = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    utils: utilsSlice,
    checkout: checkoutReducer,
    products: persistedReducer,
    user: persistedReducers, 
    api: apiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
})
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch