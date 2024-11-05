// apiSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../types/User';

interface ApiCall {
  user: IUser
}

interface ApiState {
  calls: ApiCall[];
}

const initialState: ApiState = {
  calls: [],
};

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    addApiCall: (state, action: PayloadAction<ApiCall>) => {
      state.calls.push(action.payload);
    },
    clearApiCalls: (state) => {
      state.calls = [];
    },
  },
});

export const { addApiCall, clearApiCalls } = apiSlice.actions;
export default apiSlice.reducer;
