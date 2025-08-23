import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAdminStores } from '../../slices/adminUsersSlice'

const StoresPage = () => {
  const dispatch = useDispatch();
  const stores = useSelector(state => state.admin.stores);

  useEffect(() => {
    dispatch(fetchAdminStores());
  }, [dispatch]);

  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState({ key: null, direction: 'asc' });

  const filteredStores = stores.filter((store) =>
    Object.values(store)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const sortedStores = [...filteredStores].sort((a, b) => {
    if (!sortField.key) return 0;
    const value1 = a[sortField.key].toString().toLowerCase();
    const value2 = b[sortField.key].toString().toLowerCase();
    if (value1 < value2) return sortField.direction === 'asc' ? -1 : 1;
    if (value1 > value2) return sortField.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (key) => {
    setSortField((prev) => {
      if (prev.key === key) return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      return { key, direction: 'asc' };
    });
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">All Stores</h1>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name, email, address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div className="bg-white shadow-sm rounded-md overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-300 text-left">
                <th
                  onClick={() => handleSort("name")}
                  className="p-3 cursor-pointer"
                >
                  Name {sortField.key === "name" ? (sortField.direction === "asc" ? "↑" : "↓") : ""}
                </th>
                <th
                  onClick={() => handleSort("email")}
                  className="p-3 cursor-pointer"
                >
                  Email {sortField.key === "email" ? (sortField.direction === "asc" ? "↑" : "↓") : ""}
                </th>
                <th className="p-3">Address</th>
                <th
                  onClick={() => handleSort("rating")}
                  className="p-3 cursor-pointer"
                >
                  Rating {sortField.key === "rating" ? (sortField.direction === "asc" ? "↑" : "↓") : ""}
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedStores.length > 0 ? (
                sortedStores.map((store, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="p-3">{store.name}</td>
                    <td className="p-3">{store.email}</td>
                    <td className="p-3">{store.address}</td>
                    <td className="p-3">{store.overallRating}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-3 text-center text-gray-500">
                    No stores found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StoresPage;