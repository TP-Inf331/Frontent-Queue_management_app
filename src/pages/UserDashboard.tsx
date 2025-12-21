import React, { useEffect } from 'react';
import { useAuthStore } from '@/stores/auth.store';
import { useNavigate } from 'react-router-dom';
import { useApi } from '@/hooks/useApi';
import { ticketService } from '@/services/ticket.service';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Clock, Users, MapPin, Eye } from 'lucide-react';
import { Ticket } from '@/interface/api.interface';
import { toast } from 'sonner';

const UserDashboard: React.FC = () => {
    const { user, isAuthenticated } = useAuthStore();
    const navigate = useNavigate();

    const { data: tickets, loading, execute: fetchTickets } = useApi(ticketService.getUserTickets);
    const prevTicketsRef = React.useRef<Ticket[]>([]);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/auth/login');
            return;
        }
        fetchTickets();

        // Show welcome notification if user just registered
        const justRegistered = sessionStorage.getItem('just_registered');
        if (justRegistered === 'true') {
            toast.success('🎉 Bienvenue! Vous avez rejoint la file avec succès.', {
                description: 'Vous pouvez maintenant suivre votre position ici.'
            });
            sessionStorage.removeItem('just_registered');
        }

        const interval = setInterval(fetchTickets, 10000); // Refresh every 10 seconds
        return () => clearInterval(interval);
    }, [isAuthenticated, fetchTickets, navigate]);

    // Notification Effect for status changes
    useEffect(() => {
        if (tickets && prevTicketsRef.current.length > 0) {
            tickets.forEach(ticket => {
                const prevTicket = prevTicketsRef.current.find(t => t.id === ticket.id);
                if (prevTicket && prevTicket.status !== ticket.status) {
                    if (ticket.status === 'called') {
                        toast.success(`📢 C'est votre tour !`, {
                            description: `La file "${ticket.queue_name || 'votre service'}" vous appelle.`,
                            duration: 10000,
                        });
                    } else if (ticket.status === 'completed') {
                        toast.info(`✅ Service terminé`, {
                            description: `Votre passage à la file "${ticket.queue_name}" est terminé.`
                        });
                    }
                }
            });
        }
        if (tickets) {
            prevTicketsRef.current = tickets;
        }
    }, [tickets]);

    const activeTickets = (tickets || []).filter(t => t.status === 'waiting' || t.status === 'called');
    const completedTickets = (tickets || []).filter(t => t.status === 'completed');

    const getStatusBadge = (status: string | undefined) => {
        const styles: Record<string, string> = {
            waiting: 'bg-blue-100 text-blue-800',
            called: 'bg-green-100 text-green-800 animate-pulse',
            completed: 'bg-gray-100 text-gray-800',
            cancelled: 'bg-red-100 text-red-800',
        };
        return (status && styles[status]) || 'bg-blue-100 text-blue-800';
    };

    const getStatusText = (status: string | undefined) => {
        const text: Record<string, string> = {
            waiting: 'En attente',
            called: 'APPELÉ !',
            completed: 'Terminé',
            cancelled: 'Annulé',
        };
        return (status && text[status]) || 'Inconnu';
    };

    if (loading && !tickets) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            {/* Welcome Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                    Bonjour, {user?.full_name || user?.nom || user?.email}
                </h1>
                <p className="text-muted-foreground">
                    Gérez vos files d'attente et suivez votre position en temps réel
                </p>
            </div>

            {/* Active Queues Section */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Files d'attente actives</h2>
                    <Button onClick={() => navigate('/services')} variant="outline">
                        Rejoindre une file
                    </Button>
                </div>

                {activeTickets.length === 0 ? (
                    <Card className="border-dashed">
                        <CardContent className="p-12 text-center">
                            <Users className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                            <h3 className="text-lg font-semibold mb-2">Aucune file d'attente active</h3>
                            <p className="text-muted-foreground mb-4">
                                Vous n'êtes actuellement dans aucune file d'attente
                            </p>
                            <Button onClick={() => navigate('/services')}>
                                Explorer les services
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {activeTickets.map((ticket) => (
                            <Card key={ticket.id} className="hover:shadow-lg transition-shadow">
                                <CardContent className="p-6">
                                    {/* Service Name */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className="font-bold text-lg mb-1">{ticket.queue_name}</h3>
                                            <Badge className={getStatusBadge(ticket.status)}>
                                                {getStatusText(ticket.status)}
                                            </Badge>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-black text-primary">
                                                A{ticket.ticket_number.toString().padStart(3, '0')}
                                            </div>
                                            <div className="text-xs text-muted-foreground">Votre numéro</div>
                                        </div>
                                    </div>

                                    {/* Position Info */}
                                    <div className="space-y-3 mb-4">
                                        <div className="flex items-center gap-2 text-sm">
                                            <Users className="h-4 w-4 text-muted-foreground" />
                                            <span className="font-semibold">Position:</span>
                                            <span className="text-primary font-bold">{ticket.position || '?'}ème</span>
                                            <span className="text-muted-foreground">sur {ticket.total_in_queue || '?'}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <Clock className="h-4 w-4 text-muted-foreground" />
                                            <span className="font-semibold">Temps estimé:</span>
                                            <span className="font-bold">{ticket.estimated_wait_time || '?'} min</span>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <Button
                                        className="w-full"
                                        onClick={() => navigate(`/tickets/${ticket.id}`)}
                                        variant={ticket.status === 'called' ? 'default' : 'outline'}
                                    >
                                        <Eye className="h-4 w-4 mr-2" />
                                        {ticket.status === 'called' ? 'VOIR MAINTENANT !' : 'Voir détails'}
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            {/* Recent History */}
            {completedTickets.length > 0 && (
                <div>
                    <h2 className="text-2xl font-bold mb-4">Historique récent</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {completedTickets.slice(0, 4).map((ticket) => (
                            <Card key={ticket.id} className="opacity-75">
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <MapPin className="h-4 w-4 text-muted-foreground" />
                                        <span className="font-semibold text-sm truncate">{ticket.queue_name}</span>
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        Ticket #{ticket.ticket_number} • {new Date(ticket.created_at).toLocaleDateString()}
                                    </div>
                                    <Badge className={`${getStatusBadge(ticket.status)} mt-2`} variant="outline">
                                        {getStatusText(ticket.status)}
                                    </Badge>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDashboard;
