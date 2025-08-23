import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../api/apiClient';

// async thunk to fetch all stats
export const fetchAdminStats = createAsyncThunk(
  'admin/fetchAdminStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get('/admin/dashboard');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch admin stats');
    }
  }
);

// async thunk to fetch users
export const fetchAdminUsers = createAsyncThunk(
  'admin/fetchAdminUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get('/admin/users');
      return response.data.users;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch users');
    }
  }
);

// async thunk to fetch stores
export const fetchAdminStores = createAsyncThunk(
  'admin/fetchAdminStores',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get('/admin/stores');
      return response.data.stores;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch stores');
    }
  }
);

// async thunk to create new user
export const createNewUser = createAsyncThunk(
  'admin/createNewUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('/admin/create-user', userData);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.error || 'Failed to create user');
    }
  }
);

// async thunk to create new store
export const createNewStore = createAsyncThunk(
  'admin/createNewStore',
  async (storeData, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('/admin/create-store', storeData);
      return response.data.store;
    } catch (error) {
      return rejectWithValue(error.response.data.error || 'Failed to create store');
    }
  }
);

const initialState = {
  users: [],
  stores: [],
  stats: { totalUsers: 0, totalStores: 0, totalRatings: 0 },
  status: 'idle',
  error: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminStats.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAdminStats.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.stats = action.payload;
      })
      .addCase(fetchAdminStats.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchAdminUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAdminUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchAdminUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchAdminStores.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAdminStores.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.stores = action.payload;
      })
      .addCase(fetchAdminStores.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createNewUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createNewUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users.push(action.payload);
      })
      .addCase(createNewUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createNewStore.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createNewStore.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.stores.push(action.payload);
      })
      .addCase(createNewStore.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;