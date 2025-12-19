import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-footer text-footer-foreground pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="mb-8 md:mb-0">
                        <div className="flex items-center gap-2 mb-4">
                            <img src="/logo.svg" alt="NoWait Logo" className="h-8 w-8" />
                            <h2 className="text-2xl font-bold">NoWait</h2>
                        </div>
                        <p className="text-gray-400">Streamlining your waiting experience with modern technology.</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white transition">Home</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition">About Us</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition">Services</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition">Terms of Service</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Connect</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition"><Facebook className="h-6 w-6" /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition"><Twitter className="h-6 w-6" /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition"><Instagram className="h-6 w-6" /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition"><Linkedin className="h-6 w-6" /></a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} NoWait. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
