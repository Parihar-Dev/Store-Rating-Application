import { useEffect, useState } from 'react';
import StoreCard from '../../components/StoreCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStores } from '../../slices/StoreSlice';

const UserDashboard = () => {
    const dispatch = useDispatch();
    const stores = useSelector(state => state.stores.allStores);
    const storesStatus = useSelector(state => state.stores.status);
    const storesError = useSelector(state => state.stores.error);

    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        dispatch(fetchStores());
    }, [dispatch]);

    const filteredStores = stores.filter(store =>
        (store.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (store.address || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    let content;
    if (storesStatus === 'loading') {
        content = <p>Loading...</p>;
    } else if (storesStatus === 'succeeded') {
        content = filteredStores.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStores.map(store => (
                    <StoreCard key={store.id} store={store} />
                ))}
            </div>
        ) : (
            <p className="text-center text-gray-500 md:col-span-3">No stores found matching your search.</p>
        );
    } else if (storesStatus === 'failed') {
        content = <p className="text-red-500 text-center">Error: {storesError}</p>;
    }

    return (
        <div className="min-h-[calc(100vh-64px)] bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Explore Stores</h1>
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search stores by name or address..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </div>
                <p className="text-gray-600 mb-4">
                    Showing {filteredStores.length} {filteredStores.length === 1 ? 'store' : 'stores'}
                </p>
                {content}
            </div>
        </div>
    );
};

export default UserDashboard;