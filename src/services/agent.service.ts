import api from './api';

export interface Agent {
    id: string;
    name: string;
    email: string;
    service: string;
    status: 'Disponible' | 'Occupé' | 'Hors ligne' | string;
}

export const agentService = {
    getAll: async (): Promise<Agent[]> => {
        const res = await api.get<Agent[]>('/agents');
        return res.data;
    },

    create: async (payload: Omit<Agent, 'id'>): Promise<Agent> => {
        const res = await api.post<Agent>('/agents', payload);
        return res.data;
    },

    update: async (id: string, updates: Partial<Agent>): Promise<Agent> => {
        const res = await api.patch<Agent>(`/agents/${id}`, updates);
        return res.data;
    },

    remove: async (id: string): Promise<void> => {
        await api.delete(`/agents/${id}`);
    },
};



