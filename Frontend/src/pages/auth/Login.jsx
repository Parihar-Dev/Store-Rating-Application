import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { validateEmail } from '../../utils/formValidations';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../slices/UserSlice';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    
    const apiError = useSelector(state => state.user.error);

    const handleLoginSubmit = async(e) => {
        e.preventDefault();

        const newErrors = {
            email: validateEmail(email),
            password: password ? null : "Password is required"
        };

        const hasErrors = Object.values(newErrors).some(error => error !== null);

        if (hasErrors) {
            setErrors(newErrors);
            return;
        }

        setErrors({});

        try {
          const resultAction = await dispatch(loginUser({ email, password }));

          if (loginUser.fulfilled.match(resultAction)) {
            const user = resultAction.payload;
            if (user.role === 'admin') {
              navigate('/admin-dashboard');
            } else if (user.role === 'owner') {
              navigate('/owner-dashboard');
            } else {
              navigate('/user-dashboard');
            }
          }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-64px)] bg-white p-4">
            <div className="p-8 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4 text-left">Login to Your Account</h2>
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black`}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                        )}
                    </div>
                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
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
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                        )}
                    </div>
                    {apiError && apiError != 'No token found' && (
                        <p className='text-red-500 text-sm text-center font-medium'>{apiError}</p>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-black text-white font-semibold py-2 px-4 rounded-md shadow-lg hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 cursor-pointer"
                    >
                        Log In
                    </button>
                </form>
                <div className="mt-6 text-center text-sm">
                    <span className="text-gray-500">Don't have an account? </span>
                    <Link to="/signup" className="text-blue-600 hover:text-blue-800 transition-colors">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;