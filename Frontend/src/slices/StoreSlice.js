import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '../api/apiClient';

// async thunk to fetch users
export const fetchStores = createAsyncThunk(
    'stores/fetchStores',
    async (searchQuery = '', {rejectWithValue}) => {
        try {
            const params = {};
            if (searchQuery) {
                params.name = searchQuery;
                params.address = searchQuery;
            }
            const response = await apiClient.get('/users/stores', { params });
            return response.data.stores;
        } catch (error) {
            return rejectWithValue(error.response.data.error || 'Failed to fetch stores');
        }
    }
);

// async thunk to submit rating
export const submitRating = createAsyncThunk(
    'stores/submitRating',
    async ({ storeId, rating}, {rejectWithValue}) => {
        try {
            const response = await apiClient.post('users/submit-rating', {storeId, rating});
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.error || 'Failed to submit rating');
        }
    }
);

// async thunk to update rating
export const updateRating = createAsyncThunk(
  'stores/updateRating',
  async ({ storeId, rating }, { rejectWithValue }) => {
    try {
      const response = await apiClient.put('/users/update-rating', { storeId, rating });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error || 'Failed to update rating');
    }
  }
);

const initialState = {
  allStores: [],
  status: 'idle',
  error: null,
};


const storesSlice = createSlice({
  name: 'stores',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStores.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStores.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allStores = action.payload;
      })
      .addCase(fetchStores.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(submitRating.fulfilled, (state, action) => {
        const { rating, averageRating } = action.payload;
        const storeId = action.meta.arg.storeId;
        const storeToUpdate = state.allStores.find(store => store.id === storeId);
        
        if (storeToUpdate) {
            storeToUpdate.userRating = rating.rating;
            storeToUpdate.averageRating = averageRating;
        }
      })
      .addCase(updateRating.fulfilled, (state, action) => {
        const { rating, averageRating } = action.payload;
        const storeId = action.meta.arg.storeId;
        const storeToUpdate = state.allStores.find(store => store.id === storeId);
        
        if (storeToUpdate) {
            storeToUpdate.userRating = rating.rating;
            storeToUpdate.averageRating = averageRating;
        }
      });
  },
});

export default storesSlice.reducer;