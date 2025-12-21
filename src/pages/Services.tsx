import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useApi } from '@/hooks/useApi';
import { queueService } from '@/services/queue.service';
import { ticketService } from '@/services/ticket.service';
import { notificationService } from '@/services/notification.service';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Search, MapPin, Users, Ticket as TicketIcon } from 'lucide-react';
import { useAuthStore } from '@/stores/auth.store';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Services: React.FC = () => {
    const [search, setSearch] = useState('');
    const { isAuthenticated } = useAuthStore();
    const navigate = useNavigate();

    const { data: queues, loading: loadingQueues } = useApi(queueService.getAll, {
        executeOnMount: true
    } as any);

    const { data: user } = useAuthStore();
    const { loading: joining, execute: joinQueue } = useApi(
        async (queueId: string) => {
            const ticket = await ticketService.joinQueue(queueId);
            // Send instant Gmail notification
            if (user?.email) {
                await notificationService.sendEmail(
                    user.email,
                    'Confirmation de votre ticket NoWait',
                    `Bonjour ${user.full_name || user.username},\n\nVotre ticket numéro A${ticket.ticket_number.toString().padStart(3, '0')} a été créé.\nVotre position actuelle est : ${ticket.position}ème.\n\nMerci d'utiliser NoWait !`
                ).catch(err => console.error('Failed to send email', err));
            }
            return ticket;
        },
        {
            onSuccess: (ticket) => navigate(`/tickets/${ticket.id}`),
            successMessage: 'Vous avez rejoint la file !'
        }
    );

    const filteredQueues = (queues || []).filter(q =>
        q.name.toLowerCase().includes(search.toLowerCase()) ||
        q.description?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
            <Helmet>
                <title>Files d'attente - NoWait</title>
                <meta name="description" content="Rejoignez une file d'attente à distance." />
            </Helmet>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-2">Files disponibles</h1>
                    <p className="text-slate-500 font-medium">Rejoignez une file d'attente en un clic</p>
                </div>

                <div className="relative max-w-md w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Rechercher une institution..."
                        className="w-full h-14 pl-12 pr-4 bg-white border border-slate-100 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {loadingQueues ? (
                <div className="flex justify-center p-20"><Loader2 className="animate-spin h-10 w-10 text-primary" /></div>
            ) : filteredQueues.length === 0 ? (
                <div className="text-center p-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                    <div className="bg-slate-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="h-8 w-8 text-slate-400" />
                    </div>
                    <p className="text-slate-500 font-bold">Aucune file trouvée</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredQueues.map((queue) => (
                        <Card key={queue.id} className="group border-none shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden bg-white">
                            <CardHeader className="pb-4">
                                <div className="flex justify-between items-start mb-2">
                                    <Badge variant={queue.is_active ? 'default' : 'secondary'} className={cn(
                                        "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                                        queue.is_active ? "bg-emerald-500" : "bg-slate-200"
                                    )}>
                                        {queue.is_active ? 'Ouvert' : 'Fermé'}
                                    </Badge>
                                    <div className="flex items-center gap-1 text-slate-400 text-xs font-bold">
                                        <Users className="h-3 w-3" />
                                        <span>{queue.waiting_count || 0}</span>
                                    </div>
                                </div>
                                <CardTitle className="text-xl font-black text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
                                    {queue.name}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-500 text-sm line-clamp-2 mb-6 font-medium leading-relaxed">
                                    {queue.description || "Aucune description fournie pour ce service."}
                                </p>

                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                                        <MapPin className="h-4 w-4" />
                                        <span>Université de Yaoundé I</span>
                                    </div>

                                    <Button
                                        className="w-full h-12 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold mt-2 shadow-lg shadow-blue-500/20"
                                        disabled={!queue.is_active || joining}
                                        onClick={() => {
                                            if (!isAuthenticated) {
                                                navigate('/auth/login');
                                            } else {
                                                joinQueue(queue.id);
                                            }
                                        }}
                                    >
                                        {joining ? <Loader2 className="animate-spin h-4 w-4" /> : (
                                            <div className="flex items-center gap-2 uppercase tracking-wide">
                                                <TicketIcon className="h-4 w-4" />
                                                PRENDRE UN TICKET
                                            </div>
                                        )}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Services;
