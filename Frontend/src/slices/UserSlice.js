import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../api/apiClient';

// async thunk to check for an existing token and fetch user data
export const checkAuth = createAsyncThunk(
    'user/checkAuth',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                return rejectWithValue('No token found');
            }

            const response = await apiClient.get('/users/profile');
            return response.data.user;
        } catch (error) {
            localStorage.removeItem('token');
            return rejectWithValue(error.response?.data?.error || 'Authentication check failed');
        }
    }
);

// async thunk to login user
export const loginUser = createAsyncThunk(
    'user/loginUser',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await apiClient.post('/auth/login', { email, password });
            const { user, token } = response.data;
            localStorage.setItem('token', token);
            return user;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || 'Login failed');
        }
    }
);

// async thunk to update password
export const updatePassword = createAsyncThunk(
    'user/updatePassword',
    async({ oldPassword, newPassword }, { rejectWithValue }) => {
        try {
            const response = await apiClient.put('/users/update-password', { oldPassword, newPassword });
            return response.data.message;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || 'Password update failed');
        }
    }
);

const initialState = {
    user: null,
    status: 'idle',
    error: null,
};

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('token');
            state.user = null;
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkAuth.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = { ...action.payload, isLoggedIn: true };
                state.error = null;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.status = 'failed';
                state.user = null;
                state.error = action.payload;
            })
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = { ...action.payload, isLoggedIn: true };
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(updatePassword.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updatePassword.fulfilled, (state) => {
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
    }
});

export const { logout } = UserSlice.actions;
export default UserSlice.reducer;