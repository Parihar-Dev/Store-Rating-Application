import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/UserSlice';

const navLinks = {
    admin: [
        { name: 'Dashboard', path: '/admin-dashboard' },
        { name: 'Users', path: '/admin-dashboard/users' },
        { name: 'Stores', path: '/admin-dashboard/stores' }
    ],
    user: [
        { name: 'Stores', path: '/user-dashboard' },
    ],
    owner: [
        { name: 'Dashboard', path: '/owner-dashboard' }
    ]
};

export default function Navbar() {
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const isLoggedIn = user && user.isLoggedIn;
    const links = isLoggedIn ? navLinks[user.role] || [] : [];
    
    const passwordUpdatePath = '/update-password';

    return (
        <nav className="bg-black sticky top-0 z-50 shadow-md">
            <div className="max-w-7xl mx-auto flex items-center h-16 w-full px-4">
                <Link
                    to="/"
                    className="text-white flex items-center text-lg"
                >
                    StoreRating
                </Link>
                <button
                    className="ml-auto md:hidden text-white focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                    </svg>
                </button>

                <div className="ml-auto hidden md:flex items-center space-x-4">
                    {isLoggedIn ? (
                        <>
                            {links.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="text-white text-sm px-3 py-2 rounded hover:bg-gray-800 transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="relative">
                                <button
                                    onClick={() => setDropdownOpen((open) => !open)}
                                    className="flex items-center text-white text-sm px-3 py-2 rounded hover:bg-gray-800 transition-colors hover:cursor-pointer"
                                >
                                    <span className="mr-2">{user.name}</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg py-2 z-50">
                                        <Link
                                            to={passwordUpdatePath}
                                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            Update Password
                                        </Link>
                                        <button
                                            onClick={() => { setDropdownOpen(false); dispatch(logout()); }}
                                            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 hover:cursor-pointer"
                                        >
                                            Log out
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="text-white text-sm px-4 py-2 rounded-full hover:bg-gray-700 transition-colors"
                            >
                                Log in
                            </Link>
                            <Link
                                to="/signup"
                                className="text-sm text-black bg-white px-4 py-2 rounded-full font-semibold shadow hover:bg-gray-200 transition-colors"
                            >
                                Sign up
                            </Link>
                        </>
                    )}
                </div>
            </div>
            {menuOpen && (
                <div className="md:hidden bg-black px-4 pb-4">
                    {isLoggedIn ? (
                        <>
                            {links.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="block text-white text-sm px-3 py-2 rounded hover:bg-gray-800 transition-colors"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="border-t border-gray-700 my-2" />
                            <Link
                                to={passwordUpdatePath}
                                className="block text-white text-sm px-3 py-2 rounded hover:bg-gray-800 transition-colors"
                                onClick={() => setMenuOpen(false)}
                            >
                                Update Password
                            </Link>
                            <button
                                onClick={() => { setMenuOpen(false); dispatch(logout()); }}
                                className="block w-full text-left text-white text-sm px-3 py-2 rounded hover:bg-gray-800 transition-colors"
                            >
                                Log out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="block text-white text-sm px-4 py-2 rounded-full hover:bg-gray-700 transition-colors"
                                onClick={() => setMenuOpen(false)}
                            >
                                Log in
                            </Link>
                            <Link
                                to="/signup"
                                className="block text-white text-sm px-4 py-2 rounded-full hover:bg-gray-700 transition-colors"
                                onClick={() => setMenuOpen(false)}
                            >
                                Sign up
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}