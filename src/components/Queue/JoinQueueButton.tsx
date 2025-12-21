import React from 'react';
import { Button } from '@/components/ui/button';
import { useApi } from '@/hooks/useApi';
import { ticketService } from '@/services/ticket.service';
import { Loader2 } from 'lucide-react';

interface JoinQueueButtonProps {
    queueId: string;
    queueName: string;
    onJoined?: () => void;
}

export const JoinQueueButton: React.FC<JoinQueueButtonProps> = ({
    queueId,
    queueName,
    onJoined,
}) => {
    const { loading, execute } = useApi(ticketService.joinQueue, {
        successMessage: `Successfully joined ${queueName}!`,
        onSuccess: onJoined,
    });

    return (
        <Button
            onClick={() => execute(queueId)}
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-lg shadow-lg transition-all duration-200"
        >
            {loading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Joining...
                </>
            ) : (
                'Join Queue'
            )}
        </Button>
    );
};
