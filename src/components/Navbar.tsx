import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, LogOut, Settings } from 'lucide-react';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <nav className="bg-background border-b border-border shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-2 font-bold text-2xl text-primary">
                            <img src="/logo.svg" alt="NoWait Logo" className="h-8 w-8" />
                            <span>NoWait</span>
                        </Link>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link to="/" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</Link>
                                <Link to="/about" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">About</Link>
                                <Link to="/services" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">Services</Link>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-1">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full">
                            Essayer gratuitement
                        </button>

                        <div className="ml-4 flex items-center md:ml-6 relative">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="bg-secondary p-2 rounded-full text-secondary-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary"
                            >
                                <span className="sr-only">Open user menu</span>
                                <User className="h-6 w-6" />
                            </button>

                            {/* Profile Dropdown */}
                            {isProfileOpen && (
                                <div className="origin-top-right absolute right-0 top-full mt-2 w-48 rounded-md shadow-lg py-1 bg-card ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <Link to="/profile" className="block px-4 py-2 text-sm text-card-foreground hover:bg-secondary">Your Profile</Link>
                                    <Link to="/settings" className="block px-4 py-2 text-sm text-card-foreground hover:bg-secondary">Settings</Link>
                                    <Link to="/signout" className="block px-4 py-2 text-sm text-card-foreground hover:bg-secondary">Sign out</Link>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden bg-background border-b border-border">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/" className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium">Home</Link>
                        <Link to="/about" className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium">About</Link>
                        <Link to="/services" className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium">Services</Link>
                        <Link to="/profile" className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium">Profile</Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
