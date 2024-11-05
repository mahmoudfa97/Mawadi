// src/slices/userSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    user: null | { id: string; name: string; email: string };
    isLoggedIn: boolean;
}

const initialState: UserState = {
    user: null,
    isLoggedIn: false,
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
        },
        setUser(state, action: PayloadAction<{ id: string; name: string; email: string }>) {
            state.user = action.payload;
        },
    },
});

export const { login, logout, setUser } = userSlice.actions;
export default userSlice.reducer;
