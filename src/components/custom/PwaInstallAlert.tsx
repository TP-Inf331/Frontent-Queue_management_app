import React, { useEffect, useState } from 'react';
import { X, Download } from 'lucide-react';

/* eslint-disable @typescript-eslint/no-explicit-any */

const PwaInstallAlert: React.FC = () => {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [showInstallPrompt, setShowInstallPrompt] = useState(false);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e: any) => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later.
            setDeferredPrompt(e);
            // Update UI notify the user they can install the PWA
            setShowInstallPrompt(true);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) {
            return;
        }
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        // Optionally, send analytics event with outcome of user choice
        console.log(`User response to the install prompt: ${outcome}`);
        // We've used the prompt, and can't use it again, discard it
        setDeferredPrompt(null);
        setShowInstallPrompt(false);
    };

    const handleDismiss = () => {
        setShowInstallPrompt(false);
    };

    if (!showInstallPrompt) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-96">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-4 border border-gray-200 dark:border-slate-700 flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-5">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-semibold text-lg text-slate-900 dark:text-white">Install App</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                            Install the app for a better experience, offline access, and faster loading.
                        </p>
                    </div>
                    <button
                        onClick={handleDismiss}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex gap-3 mt-2">
                    <button
                        onClick={handleDismiss}
                        className="flex-1 px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
                    >
                        Not now
                    </button>
                    <button
                        onClick={handleInstallClick}
                        className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors flex items-center justify-center gap-2"
                    >
                        <Download size={16} />
                        Install
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PwaInstallAlert;
