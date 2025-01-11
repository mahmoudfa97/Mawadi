// src/slices/userSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../types/User';
import { PURGE } from 'redux-persist';
interface UserState {
    user: IUser | null
    isLoggedIn: boolean;
}

const initialState: UserState = {
    isLoggedIn: false,
    user: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state, action: PayloadAction<any> ) {
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        logout(state) {
            state.user = null;
            state.isLoggedIn = false;
            localStorage.removeItem('token')
        },
        setUser(state, action: PayloadAction<IUser>) {
            state.user = action.payload;
            state.isLoggedIn = true;

        },
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => initialState);
    }
});

export const { login, logout, setUser } = userSlice.actions;
export default userSlice.reducer;
