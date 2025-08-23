import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/UserSlice';
import storesReducer from '../slices/StoreSlice';
import adminReducer from '../slices/adminUsersSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        stores: storesReducer,
        admin: adminReducer,
    },
});