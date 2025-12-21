import React, { useEffect } from 'react';
import { useApi } from '@/hooks/useApi';
import { operationsService } from '@/services/operations.service';
import { queueService } from '@/services/queue.service';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Users, Timer, UserPlus, PlayCircle } from 'lucide-react';

interface QueueDashboardProps {
    queueId: string;
}

export const QueueDashboard: React.FC<QueueDashboardProps> = ({ queueId }) => {
    const { data: stats, execute: fetchStats } = useApi(() => operationsService.getQueueStats(queueId));
    const { data: queue, execute: fetchQueue } = useApi(() => queueService.getById(queueId));

    const { execute: callNext, loading: callingNext } = useApi(
        () => operationsService.callNext(queueId),
        {
            successMessage: 'Next person called!',
            onSuccess: () => {
                fetchStats();
                fetchQueue();
            },
        }
    );

    useEffect(() => {
        fetchStats();
        fetchQueue();
        const interval = setInterval(() => {
            fetchStats();
            fetchQueue();
        }, 10000); // Poll Stats every 10 seconds
        return () => clearInterval(interval);
    }, [queueId, fetchStats, fetchQueue]);

    if (!queue || !stats) {
        return (
            <div className="flex justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold">{queue.name}</h2>
                    <p className="text-muted-foreground">{queue.description}</p>
                </div>
                <Badge variant={queue.is_active ? 'default' : 'secondary'} className="text-sm px-4 py-1">
                    {queue.is_active ? 'ACTIVE' : 'INACTIVE'}
                </Badge>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Waiting</CardTitle>
                        <Users className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.total_waiting}</div>
                        <p className="text-xs text-muted-foreground">People in line</p>
                    </CardContent>
                </Card>

                <Card className="bg-secondary/5 border-secondary/20">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Avg. Wait Time</CardTitle>
                        <Timer className="h-4 w-4 text-secondary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.average_waiting_time} min</div>
                        <p className="text-xs text-muted-foreground">Estimated</p>
                    </CardContent>
                </Card>

                <Card className="bg-accent/5 border-accent/20">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Current Ticket</CardTitle>
                        <UserPlus className="h-4 w-4 text-accent" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">#{stats.last_ticket_number || 'None'}</div>
                        <p className="text-xs text-muted-foreground">Most recently called</p>
                    </CardContent>
                </Card>
            </div>

            <div className="flex flex-col gap-4">
                <Button
                    size="lg"
                    className="w-full py-8 text-xl font-bold gap-3 shadow-xl hover:scale-[1.01] transition-transform"
                    onClick={() => callNext()}
                    disabled={callingNext || stats.total_waiting === 0}
                >
                    {callingNext ? (
                        <Loader2 className="h-6 w-6 animate-spin" />
                    ) : (
                        <PlayCircle className="h-6 w-6" />
                    )}
                    CALL NEXT PERSON
                </Button>
                {stats.total_waiting === 0 && (
                    <p className="text-center text-sm text-muted-foreground italic">Queue is currently empty</p>
                )}
            </div>
        </div>
    );
};
