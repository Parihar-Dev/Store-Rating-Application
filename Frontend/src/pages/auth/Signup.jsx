import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { validateName, validateAddress, validateEmail, validatePassword } from '../../utils/formValidations';
import apiClient from '../../api/apiClient'

const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [address, setAddress] = useState('');
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [apiError, setApiError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        setApiError('');

        const newErrors = {
            name: validateName(name),
            address: validateAddress(address),
            email: validateEmail(email),
            password: validatePassword(password)
        };

        if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
        } else {
            newErrors.confirmPassword = null;
        }

        const hasErrors = Object.values(newErrors).some(error => error !== null);
        if (hasErrors) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        
        try {
          const response = await apiClient.post('/auth/register', { name, email, password, address, role: 'user' });
          console.log(response.data);
          navigate('/login');
        } catch (error) {
          setApiError(error.response?.data?.error || 'Registration failed');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-64px)] bg-white p-4">
            <div className="p-8 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4 text-left">Create an Account</h2>
                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <input
                            id="name"
                            type="text"
                            placeholder="Full Name (20-60 characters)"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black`}
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                        <input
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black`}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full px-4 py-2 pr-10 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black`}
                        />
                        <span
                            className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </span>
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>
                    <div className="relative">
                        <input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={`w-full px-4 py-2 pr-10 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black`}
                        />
                        <span
                            className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </span>
                        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                    </div>
                    <div>
                        <textarea
                            id="address"
                            placeholder="Address (up to 400 characters)"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className={`w-full px-4 py-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none`}
                            rows="4"
                        ></textarea>
                        {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                    </div>
                    {apiError && <p className="text-red-500 text-sm mt-1 text-center font-medium">{apiError}</p>}
                    <button
                        type="submit"
                        className="w-full bg-black text-white font-semibold py-2 px-4 rounded-md shadow-lg hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-black cursor-pointer"
                    >
                        Sign up
                    </button>
                </form>
                <div className="mt-6 text-center text-sm">
                    <span className="text-gray-500">Already have an account? </span>
                    <Link to="/login" className="text-blue-600 hover:text-blue-800 transition-colors">
                        Log in
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;