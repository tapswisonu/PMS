import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white';
    };

    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <span className="text-white font-bold text-xl">PMS</span>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link to="/" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/')}`}>
                                    Dashboard
                                </Link>
                                <Link to="/projects" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/projects')}`}>
                                    Projects
                                </Link>
                                <Link to="/team" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/team')}`}>
                                    Team Members
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
