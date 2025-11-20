import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isAuthenticated: !!localStorage.getItem('user'),
  userType: localStorage.getItem('userType') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.userType = action.payload.type;
      localStorage.setItem('user', JSON.stringify(action.payload));
      localStorage.setItem('userType', action.payload.type);
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.userType = null;
      localStorage.removeItem('user');
      localStorage.removeItem('userType');
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;