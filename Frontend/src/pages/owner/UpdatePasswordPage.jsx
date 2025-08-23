import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { updatePassword } from '../../slices/UserSlice';
import { validatePassword } from '../../utils/formValidations';

const UpdatePasswordPage = () => {
    const dispatch = useDispatch();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setMessage('');
        setIsSuccess(false);

        const newErrors = {
            newPassword: validatePassword(newPassword),
        };

        if (newPassword !== confirmNewPassword) {
            newErrors.confirmNewPassword = "New passwords do not match.";
        }

        const hasErrors = Object.values(newErrors).some(error => error !== null);

        if (hasErrors) {
            setErrors(newErrors);
            return;
        }

        try {
            const resultAction = await dispatch(updatePassword({ oldPassword: currentPassword, newPassword }));
            
            if (updatePassword.fulfilled.match(resultAction)) {
                setMessage('Password updated successfully!');
                setIsSuccess(true);
                setCurrentPassword('');
                setNewPassword('');
                setConfirmNewPassword('');
            } else {
                setMessage(resultAction.payload || 'Failed to update password.');
                setIsSuccess(false);
            }
        } catch (error) {
            setMessage('Failed to update password.');
            setIsSuccess(false);
        }
    };
    
    return (
        <div className='flex justify-center items-center min-h-[calc(100vh-64px)]'>
            <div className="w-full max-w-md p-8">
                <h2 className="text-xl font-semibold mb-4 text-left">Update Password</h2>
                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <input
                            type="password"
                            placeholder="Current Password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className={`w-full px-4 py-2 pr-10 text-sm border ${errors.newPassword ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-black`}
                        />
                        <span className="absolute inset-y-0 right-3 flex items-center cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </span>
                        {errors.newPassword && <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>}
                    </div>

                    <div className="relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm New Password"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            className={`w-full px-4 py-2 pr-10 text-sm border ${errors.confirmNewPassword ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-black`}
                        />
                        <span className="absolute inset-y-0 right-3 flex items-center cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </span>
                        {errors.confirmNewPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmNewPassword}</p>}
                    </div>

                    {message && (
                        <p
                            className={`text-sm font-medium text-center ${isSuccess ? 'text-green-500' : 'text-red-500'}`}
                        >
                            {message}
                        </p>
                    )}

                    <button type="submit" className="w-full bg-black text-white font-semibold py-2 px-4 rounded-md cursor-pointer shadow-lg hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2">
                        Update Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdatePasswordPage;