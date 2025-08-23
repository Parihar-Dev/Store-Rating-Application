import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { validateName, validateEmail, validatePassword, validateAddress } from "../../utils/formValidations";
import { useDispatch } from "react-redux";
import { createNewUser } from "../../slices/adminUsersSlice";

const AddUserPage = () => {
	const dispatch = useDispatch();
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		address: "",
		role: "user",
	});

	const [errors, setErrors] = useState({});
	const [apiError, setApiError] = useState('');

	const validate = () => {
		let tempErrors = {};

		const nameError = validateName(formData.name);
		if (nameError) tempErrors.name = nameError;

		const emailError = validateEmail(formData.email);
		if (emailError) tempErrors.email = emailError;

		const passwordError = validatePassword(formData.password);
		if (passwordError) tempErrors.password = passwordError;

		const addressError = validateAddress(formData.address);
		if (addressError) tempErrors.address = addressError;

		if (!["user", "admin"].includes(formData.role.toLowerCase())) {
			tempErrors.role = "Invalid role selected";
		}

		setErrors(tempErrors);
		return Object.keys(tempErrors).length === 0;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setApiError('');
		if (!validate()) return;

		try {
			const resultAction = await dispatch(createNewUser(formData));
			if (createNewUser.fulfilled.match(resultAction)) {
				setFormData({
					name: "",
					email: "",
					password: "",
					address: "",
					role: "user",
				});
				setErrors({});
			} else {
				setApiError(resultAction.payload || 'Failed to create user');
			}
		} catch (error) {
			setApiError('Failed to add user due to an unexpected error.');
		}
	};

	return (
		<div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
			<div className="max-w-md w-full p-8">
				<h2 className="text-xl font-semibold mb-4 text-gray-800">Add New User / Admin</h2>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<input
							type="text"
							name="name"
							placeholder="Full Name (20-60 characters)"
							value={formData.name}
							onChange={handleChange}
							className="w-full border border-gray-300 px-4 py-2 text-sm rounded-md focus:ring-2 focus:ring-black focus:outline-none"
						/>
						{errors.name && (
							<p className="text-red-500 text-xs mt-1">{errors.name}</p>
						)}
					</div>

					<div>
						<input
							type="email"
							name="email"
							placeholder="Email"
							value={formData.email}
							onChange={handleChange}
							className="w-full border border-gray-300 px-4 text-sm py-2 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
						/>
						{errors.email && (
							<p className="text-red-500 text-xs mt-1">{errors.email}</p>
						)}
					</div>

					<div className="relative">
						<input
							name="password"
							type={showPassword ? "text" : "password"}
							placeholder="Password"
							value={formData.password}
							onChange={handleChange}
							className={`w-full border border-gray-300 px-4 py-2 text-sm rounded-md focus:ring-2 focus:ring-black focus:outline-none`}
						/>
						<span
							className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
							onClick={() => setShowPassword(!showPassword)}
						>
							{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
						</span>
						{errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
					</div>

					<div>
						<textarea
							type="text"
							name="address"
							placeholder="Address (up to 400 characters)"
							value={formData.address}
							onChange={handleChange}
							className="w-full border border-gray-300 px-4 py-2 text-sm rounded-md focus:ring-2 focus:ring-black focus:outline-none resize-none"
							rows="3"
						></textarea>
						{errors.address && (
							<p className="text-red-500 text-xs mt-1">{errors.address}</p>
						)}
					</div>

					<div>
						<select
							name="role"
							value={formData.role}
							onChange={handleChange}
							className="w-full border border-gray-300 px-4 py-2 text-sm rounded-md focus:ring-2 focus:ring-black focus:outline-none"
						>
							<option value="user">User</option>
							<option value="admin">Admin</option>
						</select>
						{errors.role && (
							<p className="text-red-500 text-xs mt-1">{errors.role}</p>
						)}
					</div>
					{apiError && <p className="text-red-500 text-sm mt-1 text-center">{apiError}</p>}
					<button
						type="submit"
						className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition cursor-pointer"
					>
						Add User
					</button>
				</form>
			</div>
		</div>
	);
};

export default AddUserPage;