import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jobs: [],
  loading: false,
  error: null,
};

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setJobs: (state, action) => {
      state.jobs = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    addJob: (state, action) => {
      state.jobs.unshift(action.payload);
    },
  },
});

export const { setJobs, setLoading, setError, addJob } = jobSlice.actions;
export default jobSlice.reducer;