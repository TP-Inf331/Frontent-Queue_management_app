import api from './api';

export interface Person {
    id: string;
    ticketNumber: string;
    name: string;
    arrivalTime: string;
    waitTime: string;
    status: 'waiting' | 'service' | 'completed';
}

export interface QueueItem {
    id: string;
    name: string;
    status: 'OUVERT' | 'FERMÉE' | 'PAUSE';
    waiting: number;
    avgTime: string | null;
    capacity: number | null;
    activeTicket?: Person | null;
    waitlist: Person[];
}

export const queueService = {
    getAll: async (): Promise<QueueItem[]> => {
        const response = await api.get<QueueItem[]>('/queues');
        return response.data;
    },

    getById: async (id: string): Promise<QueueItem> => {
        const response = await api.get<QueueItem>(`/queues/${id}`);
        return response.data;
    },

    create: async (queue: Omit<QueueItem, 'id' | 'waiting' | 'activeTicket' | 'waitlist'>): Promise<QueueItem> => {
        const response = await api.post<QueueItem>('/queues', queue);
        return response.data;
    },

    update: async (id: string, updates: Partial<QueueItem>): Promise<QueueItem> => {
        const response = await api.patch<QueueItem>(`/queues/${id}`, updates);
        return response.data;
    },

    callNext: async (queueId: string): Promise<QueueItem> => {
        const response = await api.post<QueueItem>(`/queues/${queueId}/next`);
        return response.data;
    }
};
