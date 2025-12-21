import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Settings, LayoutDashboard } from 'lucide-react';
import { useAuthStore } from '@/stores/auth.store';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { user, isAuthenticated, clearAuth } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        clearAuth();
        navigate('/');
    };

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

                    <div className="hidden md:flex items-center gap-4">
                        {!isAuthenticated ? (
                            <>
                                <Link to="/auth/login" className="text-foreground hover:text-primary font-medium">Connexion</Link>
                                <Link to="/auth/register" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition-all">
                                    Essayer gratuitement
                                </Link>
                            </>
                        ) : (
                            <div className="flex items-center gap-4 relative">
                                {user?.role !== 'client' && (
                                    <Link to="/admin/dashboard" className="flex items-center gap-2 text-primary hover:bg-primary/5 px-4 py-2 rounded-lg font-bold">
                                        <LayoutDashboard className="h-4 w-4" />
                                        Dashboard
                                    </Link>
                                )}

                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="bg-secondary p-2 rounded-full text-secondary-foreground hover:text-primary transition-all"
                                >
                                    <User className="h-6 w-6" />
                                </button>

                                {isProfileOpen && (
                                    <div className="origin-top-right absolute right-0 top-full mt-2 w-48 rounded-xl shadow-2xl py-2 bg-white border border-slate-100 z-50">
                                        <div className="px-4 py-2 border-b border-slate-50 mb-1">
                                            <p className="text-sm font-bold text-slate-900 truncate">{user?.full_name || user?.username}</p>
                                            <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                                        </div>
                                        <Link to="/profile" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                                            <User className="h-4 w-4" /> Profil
                                        </Link>
                                        <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                                            <LogOut className="h-4 w-4" /> Déconnexion
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary hover:bg-secondary focus:outline-none"
                        >
                            {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden bg-background border-b border-border p-4 space-y-2">
                    <Link to="/" className="block px-4 py-2 rounded-lg text-base font-medium hover:bg-slate-50">Home</Link>
                    <Link to="/about" className="block px-4 py-2 rounded-lg text-base font-medium hover:bg-slate-50">About</Link>
                    <Link to="/services" className="block px-4 py-2 rounded-lg text-base font-medium hover:bg-slate-50">Services</Link>
                    {!isAuthenticated ? (
                        <div className="grid grid-cols-2 gap-2 pt-2">
                            <Link to="/auth/login" className="flex items-center justify-center h-12 rounded-xl text-foreground font-bold border border-slate-200">Connexion</Link>
                            <Link to="/auth/register" className="flex items-center justify-center h-12 rounded-xl bg-blue-600 text-white font-bold">S'inscrire</Link>
                        </div>
                    ) : (
                        <>
                            <Link to="/profile" className="block px-4 py-2 rounded-lg text-base font-medium hover:bg-slate-50">Profil</Link>
                            {user?.role !== 'client' && (
                                <Link to="/admin/dashboard" className="block px-4 py-2 rounded-lg text-base font-medium text-primary hover:bg-primary/5">Admin Dashboard</Link>
                            )}
                            <button onClick={handleLogout} className="w-full text-left px-4 py-2 rounded-lg text-base font-medium text-red-600 hover:bg-red-50">Déconnexion</button>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
