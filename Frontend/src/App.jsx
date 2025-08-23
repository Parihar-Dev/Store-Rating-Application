import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UsersPage from "./pages/admin/UsersPage";
import StoresPage from "./pages/admin/StoresPage";
import AddUserPage from "./pages/admin/AddUserPage";
import AddStorePage from "./pages/admin/AddStorePage";
import StoreOwnerDashboard from "./pages/owner/StoreOwnerDashboard";
import UserDashboard from "./pages/user/UserDashboard";
import UpdatePasswordPage from "./pages/owner/UpdatePasswordPage";

const App = () => {
	return (
		<Router>
			<Navbar />
			<Routes>
				{/* Public routes */}
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />

				{/* Protected routes */}
				<Route element={<ProtectedRoute />}>
					<Route path="/update-password" element={<UpdatePasswordPage />} />
				</Route>

				{/* Admin routes */}
				<Route element={<ProtectedRoute requiredRole="admin" />}>
					<Route path="/admin-dashboard" element={<AdminDashboard />} />
					<Route path="/admin-dashboard/users" element={<UsersPage />} />
					<Route path="/admin-dashboard/stores" element={<StoresPage />} />
					<Route path="/admin-dashboard/add-user" element={<AddUserPage />} />
					<Route path="/admin-dashboard/add-store" element={<AddStorePage />} />
				</Route>

				{/* Owner routes */}
				<Route element={<ProtectedRoute requiredRole="owner" />}>
					<Route path="/owner-dashboard" element={<StoreOwnerDashboard />} />
				</Route>

				{/* User routes */}
				<Route element={<ProtectedRoute requiredRole="user" />}>
					<Route path="/user-dashboard" element={<UserDashboard />} />
				</Route>
				
				{/* Fallback route */}
				<Route path="*" element={<div>Page Not Found</div>} />
			</Routes>
		</Router>
	);
};

export default App;