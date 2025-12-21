import React, { useEffect } from 'react';
import { useApi } from '@/hooks/useApi';
import { ticketService } from '@/services/ticket.service';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, XCircle, Clock } from 'lucide-react';

export const MyTickets: React.FC = () => {
    const { data: tickets, loading, execute: fetchHistory } = useApi(ticketService.getHistory);
    const { execute: cancelTicket, loading: cancelling } = useApi(ticketService.cancelTicket, {
        successMessage: 'Ticket cancelled successfully',
        onSuccess: () => fetchHistory(),
    });

    useEffect(() => {
        fetchHistory();
        // Poll every 30 seconds
        const interval = setInterval(fetchHistory, 30000);
        return () => clearInterval(interval);
    }, [fetchHistory]);

    if (loading && !tickets) {
        return (
            <div className="flex justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
                <Clock className="h-6 w-6" />
                My Active Tickets
            </h2>
            {!tickets || tickets.length === 0 ? (
                <p className="text-muted-foreground text-center p-8">You don't have any active tickets.</p>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {tickets.map((ticket) => (
                        <Card key={ticket.id} className="overflow-hidden border-l-4 border-l-primary">
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <Badge variant={ticket.status === 'waiting' ? 'secondary' : 'default'}>
                                        {ticket.status.toUpperCase()}
                                    </Badge>
                                    <span className="text-sm text-muted-foreground">
                                        #{ticket.ticket_number}
                                    </span>
                                </div>
                                <CardTitle className="text-lg">{ticket.queue_name || 'Generic Queue'}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col gap-4">
                                    <div className="text-sm text-muted-foreground">
                                        Joined at: {new Date(ticket.created_at).toLocaleTimeString()}
                                    </div>
                                    {ticket.status === 'waiting' && (
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => cancelTicket(ticket.id)}
                                            disabled={cancelling}
                                            className="w-full flex items-center gap-2"
                                        >
                                            <XCircle className="h-4 w-4" />
                                            {cancelling ? 'Cancelling...' : 'Cancel Spot'}
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};
