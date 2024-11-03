import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from './cartSlice'
import utilsSlice from './utilssSlice'
import productReducer from './productsSlice'
import userReducer from './userSlice'
import { checkoutReducer } from './reducer'
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['products, user'],
};

const persistedReducer = persistReducer(persistConfig, productReducer);

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    utils: utilsSlice,
    checkout: checkoutReducer,
    products: persistedReducer,
    user: userReducer, // Add the user reducer
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