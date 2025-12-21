import React from 'react';
import { useAuthStore } from '@/stores/auth.store';
import { MyTickets } from '@/components/Ticket/MyTickets';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Settings, LogOut, Mail, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
    const { user, clearAuth } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        clearAuth();
        navigate('/');
    };

    if (!user) {
        return <div className="p-20 text-center">Please login to view your profile.</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: User Info */}
                <div className="space-y-6">
                    <Card className="border-none shadow-sm rounded-2xl overflow-hidden bg-white">
                        <div className="h-32 bg-blue-600 w-full" />
                        <CardContent className="relative pt-0 flex flex-col items-center text-center">
                            <Avatar className="h-24 w-24 border-4 border-white shadow-xl -mt-12 mb-4">
                                <AvatarFallback className="bg-slate-100 text-blue-600 text-2xl font-black">
                                    {(user.full_name || user.username).charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <h2 className="text-2xl font-black text-slate-900">{user.full_name || user.username}</h2>
                            <p className="text-slate-500 font-medium mb-6">@{user.username}</p>

                            <div className="w-full space-y-3 pt-6 border-t border-slate-50">
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <Mail className="h-4 w-4 text-slate-400" />
                                    <span>{user.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-600 font-bold">
                                    <Shield className="h-4 w-4 text-emerald-500" />
                                    <span className="uppercase tracking-wider text-[10px]">{user.role}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex flex-col gap-2">
                        <Button variant="outline" className="h-12 justify-start gap-3 rounded-xl border-slate-100 font-bold text-slate-700 hover:bg-slate-50">
                            <Settings className="h-4 w-4" />
                            Paramètres du compte
                        </Button>
                        <Button variant="ghost" onClick={handleLogout} className="h-12 justify-start gap-3 rounded-xl text-red-600 font-bold hover:bg-red-50">
                            <LogOut className="h-4 w-4" />
                            Déconnexion
                        </Button>
                    </div>
                </div>

                {/* Right Column: Active Tickets & History */}
                <div className="lg:col-span-2 space-y-8">
                    <MyTickets />
                </div>
            </div>
        </div>
    );
};

export default Profile;
