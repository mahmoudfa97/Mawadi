// apiSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ApiCall {
  endpoint: string;
  method: string;
  data?: any; // Adjust this type based on the expected data structure
  error?: string; // Optional error message
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
