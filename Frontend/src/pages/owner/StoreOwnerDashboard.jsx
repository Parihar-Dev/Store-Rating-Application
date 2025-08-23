import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient'

export const fetchOwnerDashboard = createAsyncThunk(
  'stores/fetchOwnerDashboard',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get('/stores/dashboard');
      return response.data.dashboard;
    } catch (error) {
      return rejectWithValue(error.response.data.error || 'Failed to fetch dashboard data');
    }
  }
);
 
const StoreOwnerDashboard = () => {
    const dispatch = useDispatch();
    const dashboardStatus = useSelector(state => state.stores.status);
    const dashboardError = useSelector(state => state.stores.error);

    const [dashboardData, setDashboardData] = useState(null);

    useEffect(() => {
        if (dashboardStatus === 'idle') {
            dispatch(fetchOwnerDashboard()).then(result => {
                if (fetchOwnerDashboard.fulfilled.match(result)) {
                    setDashboardData(result.payload[0]);
                }
            });
        }
    }, [dashboardStatus, dispatch]);

    if (dashboardStatus === 'loading') {
        return <p>Loading...</p>;
    }
    if (dashboardStatus === 'failed') {
        return <p className="text-red-500">Error: {dashboardError}</p>;
    }
    
    if (!dashboardData) {
        return <p>No dashboard data found.</p>;
    }

    return (
        <div className="min-h-[calc(100vh-64px)] bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl font-semibold text-gray-900 mb-4">Store Owner Dashboard</h1>

                <div className="bg-white rounded-md shadow-md p-6 mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-medium text-gray-900">{dashboardData.storeName}</h2>
                        <Link
                            to="/update-password"
                            className="bg-black text-white px-4 py-2 rounded-md font-medium hover:bg-gray-800 transition-colors"
                        >
                            Update Password
                        </Link>
                    </div>
                    <p className="text-gray-600">{dashboardData.address}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white rounded-md shadow-md p-6">
                        <h2 className="text-lg font-medium text-gray-500 mb-2">Total Ratings</h2>
                        <p className="text-4xl font-bold text-black">{dashboardData.totalRatings}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-lg font-medium text-gray-500 mb-2">Average Rating</h2>
                        <p className="text-4xl font-bold text-black">{dashboardData.averageRating} / 5</p>
                    </div>
                </div>

                <div className="bg-white rounded-md shadow-md p-6">
                    <h2 className="text-2xl font-medium text-gray-900 mb-4">Latest Ratings & Reviews</h2>
                    {dashboardData.ratedByUsers.length > 0 ? (
                        <ul className="space-y-4">
                            {dashboardData.ratedByUsers.map((user) => (
                                <li key={user.id} className="border-b border-gray-200 pb-4">
                                    <p className="font-semibold text-black">{user.name}</p>
                                    <p className="text-black">Rating: {user.rating} / 5</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 italic">No reviews yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StoreOwnerDashboard;