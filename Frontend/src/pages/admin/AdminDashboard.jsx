import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminStats } from '../../slices/adminUsersSlice';

const AdminDashboard = () => {
    
    const dispatch = useDispatch();
    const stats = useSelector(state => state.admin.stats);

    useEffect(() => {
        dispatch(fetchAdminStats());
    }, [dispatch]);

    return (
        <div className="min-h-[calc(100vh-64px)] bg-gray-100 p-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl font-semibold text-gray-900 mb-4">Admin Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white rounded-md shadow-md p-6">
                        <h2 className="text-lg font-medium text-gray-500 mb-2">Total Users</h2>
                        <p className="text-4xl font-bold text-black">{stats.totalUsers}</p>
                    </div>
                    <div className="bg-white rounded-md shadow-md p-6">
                        <h2 className="text-lg font-medium text-gray-500 mb-2">Total Stores</h2>
                        <p className="text-4xl font-bold text-black">{stats.totalStores}</p>
                    </div>
                    <div className="bg-white rounded-md shadow-md p-6">
                        <h2 className="text-lg font-medium text-gray-500 mb-2">Total Ratings</h2>
                        <p className="text-4xl font-bold text-black">{stats.totalRatings}</p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Admin Actions</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Link
                            to="/admin-dashboard/users"
                            className="flex items-center justify-center p-4 bg-gray-100 rounded-md text-black font-semibold hover:bg-gray-200 transition-colors"
                        >
                            View All Users
                        </Link>
                        <Link
                            to="/admin-dashboard/stores"
                            className="flex items-center justify-center p-4 bg-gray-100 rounded-md text-black font-semibold hover:bg-gray-200 transition-colors"
                        >
                            View All Stores
                        </Link>
                        <Link
                            to="/admin-dashboard/add-user"
                            className="flex items-center justify-center p-4 bg-gray-100 rounded-md text-black font-semibold hover:bg-gray-200 transition-colors"
                        >
                            Add New User
                        </Link>
                        <Link
                            to="/admin-dashboard/add-store"
                            className="flex items-center justify-center p-4 bg-gray-100 rounded-md text-black font-semibold hover:bg-gray-200 transition-colors"
                        >
                            Add New Store
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;